const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ==============================================
// MIDDLEWARE CONFIGURATION
// ==============================================

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================================
// FILE UPLOAD CONFIGURATION
// ==============================================

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const fileName = `cv-${uniqueSuffix}${fileExtension}`;
    cb(null, fileName);
  }
});

const upload = multer({ 
  storage,
  limits: { 
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // 10MB default
  },
  fileFilter: (req, file, cb) => {
    console.log('📄 File upload attempt:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });

    // Only allow PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      const error = new Error('Only PDF files are allowed for CV uploads!');
      error.code = 'INVALID_FILE_TYPE';
      cb(error, false);
    }
  }
});

// ==============================================
// EMAIL CONFIGURATION
// ==============================================

// Configure email transporter based on service type
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true' || false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
};

// Use specific service if it's Gmail, otherwise use generic SMTP
const transporter = process.env.SMTP_HOST 
  ? nodemailer.createTransport(emailConfig)
  : nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error.message);
    if (process.env.SMTP_HOST) {
      console.log('💡 Office 365 troubleshooting:');
      console.log('   • Check SMTP_HOST and SMTP_PORT in .env');
      console.log('   • Verify "Send As" permissions for shared mailbox');
      console.log('   • Ensure SMTP AUTH is enabled for your account');
    } else {
      console.log('💡 Please check your EMAIL_USER and EMAIL_PASS in .env file');
    }
  } else {
    console.log('✅ Email server is ready to send messages');
    console.log(`📧 Configured email: ${process.env.EMAIL_USER}`);
    if (process.env.SMTP_HOST) {
      console.log(`🏢 SMTP Server: ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`);
      console.log(`📮 Sending as: ${process.env.FROM_EMAIL || process.env.EMAIL_USER}`);
    }
  }
});

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

const cleanupFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('🗑️ Cleaned up temporary file:', path.basename(filePath));
    }
  } catch (error) {
    console.error('⚠️ Error cleaning up file:', error.message);
  }
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// ==============================================
// API ENDPOINTS
// ==============================================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'RENER ENERGY Career Application API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    emailConfigured: !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS
  });
});

// Test email endpoint (for testing email configuration)
app.post('/api/test-email', async (req, res) => {
  try {
    const testMailOptions = {
      from: `"${process.env.COMPANY_NAME || 'RENER ENERGY'} Test" <${process.env.FROM_EMAIL || process.env.EMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      subject: 'RENER ENERGY - Office 365 Email Configuration Test',
      html: `
        <h2>✅ Office 365 Email Configuration Test Successful</h2>
        <p>This is a test email to verify that your RENER ENERGY career application system is properly configured with Office 365.</p>
        <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Configuration:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Office 365 SMTP</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">SMTP Server:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${process.env.SMTP_HOST || 'Gmail'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">From Email:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${process.env.FROM_EMAIL || process.env.EMAIL_USER}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Timestamp:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${new Date().toLocaleString()}</td>
          </tr>
        </table>
        <p><strong>Server:</strong> Career Application Backend</p>
        <hr>
        <p><small>If you received this email, your email configuration is working correctly.</small></p>
      `
    };

    await transporter.sendMail(testMailOptions);
    res.json({ success: true, message: 'Test email sent successfully!' });
  } catch (error) {
    console.error('❌ Test email failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { from_name, from_email, subject, message } = req.body;

    console.log('📞 New contact form submission received:', {
      name: from_name,
      email: from_email,
      subject: subject
    });

    // Validate required fields
    if (!from_name || !from_email || !message) {
      throw new Error('Missing required fields: name, email, and message are required');
    }

    // Email template for contact form
    const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Message - RENER ENERGY</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #007bff; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .field-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .field-table td { border: 1px solid #ddd; padding: 12px; }
        .field-table .label { background-color: #f8f9fa; font-weight: bold; width: 150px; }
        .message-box { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin: 15px 0; }
        .footer { background-color: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>📞 New Contact Form Message</h1>
        <p>RENER ENERGY Website Contact</p>
      </div>

      <div class="content">
        <table class="field-table">
          <tr>
            <td class="label">👤 Full Name:</td>
            <td>${from_name}</td>
          </tr>
          <tr>
            <td class="label">📧 Email:</td>
            <td><a href="mailto:${from_email}">${from_email}</a></td>
          </tr>
          <tr>
            <td class="label">📝 Subject:</td>
            <td>${subject || 'General Inquiry'}</td>
          </tr>
          <tr>
            <td class="label">📅 Date:</td>
            <td>${new Date().toLocaleDateString('el-GR')} ${new Date().toLocaleTimeString('el-GR')}</td>
          </tr>
        </table>

        <h3>💬 Message:</h3>
        <div class="message-box">
          ${message.replace(/\n/g, '<br>')}
        </div>

        <h3>📋 Next Steps</h3>
        <ol>
          <li>Review the contact message</li>
          <li>Reply to ${from_email} within 24 hours</li>
          <li>Provide helpful information or assistance</li>
        </ol>
      </div>

      <div class="footer">
        <p>This message was automatically generated by the RENER ENERGY Contact Form</p>
        <p>Generated at: ${new Date().toISOString()}</p>
      </div>
    </body>
    </html>
    `;

    // Email configuration for contact form
    const senderEmail = process.env.EMAIL_USER;
    const recipientEmail = process.env.TO_EMAIL;
    
    const mailOptions = {
      from: `"${from_name}" <${senderEmail}>`, // Use your Gmail but show contact's name
      to: recipientEmail, // Send to your shared mailbox
      replyTo: from_email, // Replies go back to the person who contacted you
      subject: `Contact Form: ${subject || 'General Inquiry'} - ${from_name}`,
      html: emailHTML,
      headers: {
        'X-Contact-Source': 'RENER-ENERGY-CONTACT-FORM',
        'X-Contact-Email': from_email,
        'X-Contact-Name': from_name,
        'X-Original-Sender': from_email,
        'X-Mailer': 'RENER Contact Form System',
        'Sender': senderEmail
      }
    };

    // Send email
    const emailResult = await transporter.sendMail(mailOptions);
    console.log('✅ Contact form email sent successfully:', emailResult.messageId);

    // Success response
    res.json({ 
      success: true, 
      message: 'Contact form submitted successfully!',
      messageId: emailResult.messageId
    });

  } catch (error) {
    console.error('❌ Contact form submission failed:', error);
    
    // Check if it's a validation error vs server error
    if (error.message.includes('Missing required fields')) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    } else {
      // Generic server error response
      res.status(500).json({
        success: false,
        error: 'Unable to process contact form. Please try again later.'
      });
    }
  }
});

// Main career application endpoint
app.post('/api/career-application', upload.single('cv'), async (req, res) => {
  let uploadedFile = null;

  try {
    const { from_name, from_email, phone, message, position } = req.body;
    uploadedFile = req.file;

    console.log('📨 New career application received:', {
      name: from_name,
      email: from_email,
      position: position,
      hasFile: !!uploadedFile,
      fileName: uploadedFile?.originalname,
      fileSize: uploadedFile ? formatFileSize(uploadedFile.size) : 'No file'
    });

    // Validate required fields
    if (!from_name || !from_email || !position) {
      throw new Error('Missing required fields: name, email, and position are required');
    }

    // Email template
    const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Career Application - RENER ENERGY</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #007bff; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .field-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .field-table td { border: 1px solid #ddd; padding: 12px; }
        .field-table .label { background-color: #f8f9fa; font-weight: bold; width: 150px; }
        .message-box { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin: 15px 0; }
        .footer { background-color: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; color: #666; }
        .file-info { background-color: #e8f5e8; padding: 10px; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚀 New Career Application</h1>
        <h2>${position}</h2>
        <p style="margin: 5px 0; font-size: 14px;">📨 Delivered to: ${process.env.TO_EMAIL}</p>
      </div>
      
      <div class="content">
        <h3>Candidate Information</h3>
        <table class="field-table">
          <tr>
            <td class="label">👤 Full Name:</td>
            <td>${from_name}</td>
          </tr>
          <tr>
            <td class="label">📧 Email:</td>
            <td><a href="mailto:${from_email}">${from_email}</a></td>
          </tr>
          <tr>
            <td class="label">📱 Phone:</td>
            <td>${phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td class="label">💼 Position:</td>
            <td><strong>${position}</strong></td>
          </tr>
          <tr>
            <td class="label">📅 Application Date:</td>
            <td>${new Date().toLocaleString('el-GR', { timeZone: 'Europe/Athens' })}</td>
          </tr>
        </table>

        ${message ? `
        <h3>📝 Cover Letter</h3>
        <div class="message-box">
          ${message.replace(/\n/g, '<br>')}
        </div>
        ` : ''}

        ${uploadedFile ? `
        <div class="file-info">
          <h3>📎 CV Attachment</h3>
          <p><strong>✅ CV file is attached to this email</strong></p>
          <ul>
            <li><strong>Filename:</strong> ${uploadedFile.originalname}</li>
            <li><strong>File Size:</strong> ${formatFileSize(uploadedFile.size)}</li>
            <li><strong>Type:</strong> PDF Document</li>
          </ul>
        </div>
        ` : `
        <div style="background-color: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0;">
          <p><strong>⚠️ No CV file was uploaded with this application.</strong></p>
        </div>
        `}

        <h3>📋 Next Steps</h3>
        <ol>
          <li>Review the candidate's information and CV</li>
          <li>Reply to acknowledge receipt of application</li>
          <li>Schedule interview if candidate meets requirements</li>
          <li>Keep candidate informed of application status</li>
        </ol>
      </div>

      <div class="footer">
        <p>This email was automatically generated by the RENER ENERGY Career Application System</p>
        <p>Generated at: ${new Date().toISOString()}</p>
      </div>
    </body>
    </html>
    `;

    // Email configuration - FROM user's email with proper relay
    const senderEmail = process.env.EMAIL_USER; // Your Gmail for SMTP authentication  
    const recipientEmail = process.env.TO_EMAIL; // Shared mailbox receives the application
    
    const mailOptions = {
      from: `"${from_name}" <${senderEmail}>`, // Use your Gmail but show user's name
      to: recipientEmail, // Shared mailbox receives the application
      cc: process.env.CC_EMAIL || undefined,
      replyTo: from_email, // Most important: replies go to the applicant
      subject: `Career Application from ${from_email}: ${position}`,
      html: emailHTML,
      attachments: uploadedFile ? [{
        filename: uploadedFile.originalname,
        path: uploadedFile.path,
        contentType: 'application/pdf'
      }] : [],
      headers: {
        'X-Application-Source': 'RENER-ENERGY-CAREER-SYSTEM',
        'X-Applicant-Email': from_email,
        'X-Applicant-Name': from_name,
        'X-Position': position,
        'X-Original-Sender': from_email,
        'X-Mailer': 'RENER Career Application System',
        'Sender': senderEmail // Technical sender for SMTP
      }
    };

    // Send email
    const emailResult = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', emailResult.messageId);

    // Clean up uploaded file
    if (uploadedFile) {
      cleanupFile(uploadedFile.path);
    }

    // Success response
    res.json({ 
      success: true, 
      message: 'Career application submitted successfully!',
      data: {
        messageId: emailResult.messageId,
        applicantName: from_name,
        position: position,
        timestamp: new Date().toISOString(),
        attachmentIncluded: !!uploadedFile
      }
    });

  } catch (error) {
    console.error('❌ Error processing career application:', error);
    
    // Clean up file if there was an error
    if (uploadedFile) {
      cleanupFile(uploadedFile.path);
    }
    
    // Error response
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('💥 Unhandled error:', err);
  
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      error: 'File too large. Maximum size is 10MB.'
    });
  }
  
  if (err.code === 'INVALID_FILE_TYPE') {
    return res.status(400).json({
      success: false,
      error: 'Invalid file type. Only PDF files are allowed.'
    });
  }

  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /api/health',
      'POST /api/test-email',
      'POST /api/career-application'
    ]
  });
});

// ==============================================
// SERVER STARTUP
// ==============================================

app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 RENER ENERGY Career Application Server Started');
  console.log('='.repeat(50));
  console.log(`📍 Server running on: http://localhost:${PORT}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`📧 Emails sent FROM: ${process.env.EMAIL_USER || 'NOT CONFIGURED'}`);
  console.log(`📨 Emails sent TO: ${process.env.TO_EMAIL || 'NOT CONFIGURED'} (Shared Mailbox)`);
  console.log(`📁 Upload directory: ${uploadDir}`);
  console.log('='.repeat(50));
  console.log('📋 Available endpoints:');
  console.log('   • GET  /api/health - Health check');
  console.log('   • POST /api/contact - Contact form submissions');
  console.log('   • POST /api/test-email - Test email delivery to shared mailbox');
  console.log('   • POST /api/career-application - Submit application to shared mailbox');
  console.log('='.repeat(50));
  console.log('📧 Email Flow: User Email → SMTP Relay (Your Gmail) → Shared Mailbox');
  console.log('📧 Reply-To: User\'s actual email address');
  console.log('='.repeat(50));
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('⚠️  WARNING: Email not configured! Please update .env file');
  }
});