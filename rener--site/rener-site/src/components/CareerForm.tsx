"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n';
import FileUpload from './FileUpload';

interface CareerFormProps {
  jobTitle: string;
  className?: string;
}

export default function CareerForm({ jobTitle, className = "" }: CareerFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    phone: '',
    message: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
    e.preventDefault();
    
    // Basic validation
    if (!formData.from_name || !formData.from_email || !formData.phone) {
      setSubmitStatus({
        type: 'error',
        message: t('careers.form.requiredFields')
      });
      return;
    }

    // File validation
    if (!selectedFile) {
      setSubmitStatus({
        type: 'error',
        message: 'Παρακαλώ επισυνάψτε το βιογραφικό σας σε μορφή PDF.'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email.'
      });
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(formData.phone)) {
      setSubmitStatus({
        type: 'error',
        message: 'Παρακαλώ εισάγετε έναν έγκυρο αριθμό τηλεφώνου.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('from_name', formData.from_name);
      formDataToSend.append('from_email', formData.from_email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('position', jobTitle);
      if (selectedFile) {
        formDataToSend.append('cv', selectedFile);
      }

      const response = await fetch('http://localhost:3001/api/career-application', {
        method: 'POST',
        body: formDataToSend
      });
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: t('careers.form.successMessage')
        });
        // Reset form
        setFormData({
          from_name: '',
          from_email: '',
          phone: '',
          message: ''
        });
        setSelectedFile(null);
      } else {
        setSubmitStatus({
          type: 'error',
          message: t('careers.form.errorMessage')
        });
      }
    } catch (error) {
      console.error('Career form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: t('careers.form.errorMessage')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-gray-50 rounded-xl p-8 border border-gray-200 ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {t('careers.form.title')}
      </h3>
      <p className="text-gray-600 mb-6 text-sm">
        {t('careers.form.subtitle')}
      </p>
      
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <input
            type="text"
            name="from_name"
            placeholder={t('careers.form.name')}
            className="form-input"
            value={formData.from_name}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
          <input
            type="email"
            name="from_email"
            placeholder={t('careers.form.email')}
            className="form-input"
            value={formData.from_email}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder={t('careers.form.phone')}
          className="form-input"
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
          required
        />
        <textarea
          name="message"
          placeholder={t('careers.form.message')}
          rows={4}
          className="form-textarea"
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
        ></textarea>
        <FileUpload
          onFileSelect={setSelectedFile}
          selectedFile={selectedFile}
          disabled={isSubmitting}
        />
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-sm text-blue-800">
          💼 {t('careers.form.cvWillBeSaved')}
        </div>
        <button 
          type="submit" 
          className={`btn-responsive w-full mt-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? `${t('careers.form.send')}...` : t('careers.form.send')}
        </button>
      </form>
    </div>
  );
}