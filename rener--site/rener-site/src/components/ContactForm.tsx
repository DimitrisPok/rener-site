"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = "" }: ContactFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('🚀 ContactForm: handleSubmit called');
    e.preventDefault();
    console.log('🚀 ContactForm: preventDefault called');
    
    // Basic validation
    if (!formData.from_name || !formData.from_email || !formData.subject || !formData.message) {
      console.log('❌ ContactForm: Validation failed - missing fields');
      setSubmitStatus({
        type: 'error',
        message: t('contact.form.requiredFields')
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email)) {
      console.log('❌ ContactForm: Email validation failed');
      setSubmitStatus({
        type: 'error',
        message: t('contact.form.invalidEmail')
      });
      return;
    }

    console.log('✅ ContactForm: Validation passed, submitting...');
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      console.log('📞 ContactForm: Sending to backend API...');
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      console.log('📞 ContactForm: Backend response:', result);
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: t('contact.form.successMessage')
        });
        // Reset form
        setFormData({
          from_name: '',
          from_email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: t('contact.form.errorMessage')
        });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: t('contact.form.errorMessage')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-xl p-8 shadow-lg ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {t('contact.form.send').toUpperCase()}
      </h3>
      
      {submitStatus.type && (
        <div className={`p-4 rounded-lg mb-6 ${
          submitStatus.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-4">
          <input
            type="text"
            name="from_name"
            placeholder={t('contact.form.name')}
            className="form-input"
            value={formData.from_name}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
          <input
            type="email"
            name="from_email"
            placeholder={t('contact.form.email')}
            className="form-input"
            value={formData.from_email}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
        </div>
        <input
          type="text"
          name="subject"
          placeholder={t('contact.form.subject')}
          className="form-input"
          value={formData.subject}
          onChange={handleChange}
          disabled={isSubmitting}
          required
        />
        <textarea
          name="message"
          placeholder={t('contact.form.message')}
          rows={5}
          className="form-textarea"
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          required
        ></textarea>
        <button 
          type="submit" 
          className={`btn-responsive w-full mt-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? t('careers.form.sending') : t('contact.form.send').toUpperCase()}
        </button>
      </form>
    </div>
  );
}