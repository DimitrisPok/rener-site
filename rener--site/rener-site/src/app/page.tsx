'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Image from 'next/image';
import '../i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ContactForm from '../components/ContactForm';

export default function Home() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [interestFormOpen, setInterestFormOpen] = useState(false);
  const [interestSubmitted, setInterestSubmitted] = useState(false);
  const [interestSubmitting, setInterestSubmitting] = useState(false);
  const [interestError, setInterestError] = useState('');
  const [interestFormData, setInterestFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    parkType: '',
    location: '',
    powerMw: '',
    capacityMwh: '',
    connectionTerms: '',
    comments: ''
  });

  const buttonStyle = {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s ease'
  };

  const interestInputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    fontSize: '0.95rem',
    color: '#111827',
    backgroundColor: '#ffffff'
  };

  const handleInterestChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInterestFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInterestSubmitting(true);
    setInterestSubmitted(false);
    setInterestError('');

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    try {
      let response = await fetch(`${apiBaseUrl}/api/solutions-interest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...interestFormData,
          language: i18n.language
        })
      });

      // Backward-compatible fallback: use existing contact endpoint if backend wasn't restarted yet.
      if (response.status === 404) {
        const contactMessage = [
          `Interest Form: EMS / SCADA CHPS`,
          '',
          `A. Company Information`,
          `Company name: ${interestFormData.companyName}`,
          `Contact person: ${interestFormData.contactPerson}`,
          `Email: ${interestFormData.email}`,
          `Phone: ${interestFormData.phone}`,
          '',
          `B. Park Information`,
          `Type: ${interestFormData.parkType}`,
          `Location: ${interestFormData.location}`,
          `Power (MW): ${interestFormData.powerMw}`,
          `Capacity (MWh): ${interestFormData.capacityMwh}`,
          `Connection Terms: ${interestFormData.connectionTerms}`,
          '',
          `Additional Information / Comments:`,
          interestFormData.comments || '-'
        ].join('\n');

        response = await fetch(`${apiBaseUrl}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from_name: interestFormData.contactPerson,
            from_email: interestFormData.email,
            subject: `EMS/SCADA Interest - ${interestFormData.companyName}`,
            message: contactMessage
          })
        });
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Interest form submission failed');
      }

      setInterestSubmitted(true);
      setInterestFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        parkType: '',
        location: '',
        powerMw: '',
        capacityMwh: '',
        connectionTerms: '',
        comments: ''
      });
    } catch (error) {
      console.error('Interest form submission error:', error);
      setInterestError(t('solutions.interestForm.errorMessage'));
    } finally {
      setInterestSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        zIndex: 50,
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              <Image 
                src="/Rener_Icon_Green.png" 
                alt="Rener Energy Logo" 
                width={48}
                height={48}
                style={{
                  objectFit: 'contain'
                }}
              />
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>RENER ENERGY</span>
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex" style={{ gap: '2rem', alignItems: 'center' }}>
              <a href="#about" style={{ color: '#374151', textDecoration: 'none', fontWeight: '500' }}>{t('nav.about')}</a>
              <a href="#solutions" style={{ color: '#374151', textDecoration: 'none', fontWeight: '500' }}>{t('nav.solutions')}</a>
              <a href="#contact" style={{ color: '#374151', textDecoration: 'none', fontWeight: '500' }}>{t('nav.contact')}</a>
              <a href="/careers" style={{ color: '#374151', textDecoration: 'none', fontWeight: '500' }}>{t('nav.careers')}</a>
              <LanguageSwitcher />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                color: '#9ca3af',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              className="md:hidden"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#2563eb';
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9ca3af';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <svg style={{ height: '1.5rem', width: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div style={{
              backgroundColor: 'white',
              borderTop: '1px solid #e5e7eb',
              paddingTop: '0.5rem',
              paddingBottom: '0.75rem'
            }} className="md:hidden">
              <div style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <a 
                  href="#about" 
                  style={{
                    display: 'block',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#374151',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#2563eb';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#374151';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {t('nav.about')}
                </a>
                <a 
                  href="#solutions" 
                  style={{
                    display: 'block',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#374151',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#2563eb';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#374151';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {t('nav.solutions')}
                </a>
                <a 
                  href="#contact" 
                  style={{
                    display: 'block',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#374151',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#2563eb';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#374151';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {t('nav.contact')}
                </a>
                <a 
                  href="/careers" 
                  style={{
                    display: 'block',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#374151',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#2563eb';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#374151';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {t('nav.careers')}
                </a>
                <div style={{ padding: '0.5rem 0.75rem' }}>
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.6) 0%, rgba(30, 64, 175, 0.5) 50%, rgba(30, 58, 138, 0.6) 100%)'
        }}></div>
        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          color: 'white',
          maxWidth: '64rem',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            {t('hero.title')}
          </h1>
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            marginBottom: '2rem',
            fontWeight: '300'
          }}>
            {t('hero.subtitle')}
          </p>
          <a 
            href="#about" 
            style={{
              ...buttonStyle,
              textDecoration: 'none',
              display: 'inline-block',
              scrollBehavior: 'smooth'
            }}
          >
            {t('hero.cta')}
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '5rem 1rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
              {t('about.title')}
            </h2>
            <div style={{ width: '6rem', height: '0.25rem', backgroundColor: '#2563eb', margin: '0 auto 2rem auto' }}></div>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '48rem', margin: '0 auto', lineHeight: '1.6' }}>
              {t('about.description')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 220px))',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '4rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: '#dbeafe',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <svg style={{ width: '1.5rem', height: '1.5rem', fill: '#2563eb' }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
              </div>
              <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '0.9rem' }}>{t('about.team')}</h3>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: '#dcfce7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <svg style={{ width: '1.5rem', height: '1.5rem', fill: '#059669' }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '0.9rem' }}>{t('about.certified')}</h3>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: '#dcfce7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <svg style={{ width: '1.5rem', height: '1.5rem', fill: '#059669' }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                </svg>
              </div>
              <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '0.9rem' }}>{t('about.support')}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" style={{ padding: '5rem 1rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
              {t('solutions.title')}
            </h2>
            <div style={{ width: '6rem', height: '0.25rem', backgroundColor: '#2563eb', margin: '0 auto 2rem auto' }}></div>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '48rem', margin: '0 auto', lineHeight: '1.6' }}>
              {t('solutions.subtitle')}
            </p>
          </div>

          <div className="solutions-grid">
            {/* SCADA for PV */}
            <div style={{ backgroundColor: '#f9fafb', borderRadius: '1rem', padding: '2rem', border: '1px solid #e5e7eb' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: '#dbeafe',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <svg style={{ width: '1.5rem', height: '1.5rem', fill: '#2563eb' }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14.5 6a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5V5a.5.5 0 01.5-.5h12a.5.5 0 01.5.5v6zM7 15h6l-1 2H8l-1-2z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                {t('solutions.scadaPv.title')}
              </h3>
              <p style={{ color: '#374151', lineHeight: '1.6' }}>
                {t('solutions.scadaPv.description')}
              </p>
            </div>

            {/* SCADA and EMS for BESS */}
            <div style={{ backgroundColor: '#f9fafb', borderRadius: '1rem', padding: '2rem', border: '1px solid #e5e7eb' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: '#dbeafe',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <svg style={{ width: '1.5rem', height: '1.5rem', fill: '#2563eb' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 4a1 1 0 011 1v1h4V5a1 1 0 112 0v1h1a2 2 0 012 2v1h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v1a2 2 0 01-2 2h-1v1a1 1 0 11-2 0v-1h-4v1a1 1 0 11-2 0v-1H8a2 2 0 01-2-2v-1H5a1 1 0 110-2h1v-2H5a1 1 0 110-2h1V8a2 2 0 012-2h1V5a1 1 0 011-1zm-1 4v8h8V8H8zm2 2h4v4h-4v-4z"></path>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                {t('solutions.scadaEmsBess.title')}
              </h3>
              <p style={{ color: '#374151', lineHeight: '1.6' }}>
                {t('solutions.scadaEmsBess.description')}
              </p>
            </div>

            {/* NEXUS Platform */}
            <div style={{ backgroundColor: '#f9fafb', borderRadius: '1rem', padding: '2rem', border: '1px solid #e5e7eb' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: '#dcfce7',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <svg style={{ width: '1.5rem', height: '1.5rem', fill: '#059669' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.94 5.06c-3.27 0-5.6 1.18-7.05 2.92C11.44 6.24 9.11 5.06 5.84 5.06c0 4.96 2.62 8.28 7.05 9.26V19a1 1 0 102 0v-4.68c4.43-.98 7.05-4.3 7.05-9.26z"></path>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                {t('solutions.nexus.title')}
              </h3>
              <p style={{ color: '#374151', lineHeight: '1.6' }}>
                {t('solutions.nexus.description')}
              </p>
            </div>

            {/* Remote Monitoring */}
            <div style={{ backgroundColor: '#f9fafb', borderRadius: '1rem', padding: '2rem', border: '1px solid #e5e7eb' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: '#fee2e2',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <svg style={{ width: '1.5rem', height: '1.5rem', fill: '#dc2626' }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                {t('solutions.monitoring.title')}
              </h3>
              <p style={{ color: '#374151', lineHeight: '1.6' }}>
                {t('solutions.monitoring.description')}
              </p>
            </div>

            {/* Interest Button Card */}
            <div style={{
              backgroundColor: 'transparent',
              borderRadius: 0,
              padding: '2rem 0',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              minHeight: 'unset'
            }}>
              <button
                type="button"
                onClick={() => {
                  setInterestSubmitted(false);
                  setInterestError('');
                  setInterestFormOpen(true);
                }}
                style={{
                  ...buttonStyle,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {t('solutions.interestForm.button')}
                <svg style={{ width: '1rem', height: '1rem', fill: 'white' }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L12.586 12H4a1 1 0 110-2h8.586l-2.293-2.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>

          </div>
        </div>
      </section>

      {interestFormOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(17, 24, 39, 0.6)',
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setInterestFormOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '980px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '1px solid #e5e7eb'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1e3a8a', margin: 0 }}>
                {t('solutions.interestForm.title')}
              </h3>
              <button
                type="button"
                onClick={() => setInterestFormOpen(false)}
                style={{
                  border: '1px solid #d1d5db',
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  cursor: 'pointer',
                  color: '#374151'
                }}
              >
                {t('solutions.interestForm.close')}
              </button>
            </div>

            <form onSubmit={handleInterestSubmit} style={{ display: 'grid', gap: '1rem' }}>
              <h4 style={{ fontSize: '1.25rem', color: '#1e3a8a', margin: '0.5rem 0' }}>
                {t('solutions.interestForm.sectionCompany')}
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
                    {t('solutions.interestForm.companyName')}
                  </label>
                  <input name="companyName" value={interestFormData.companyName} onChange={handleInterestChange} required style={interestInputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
                    {t('solutions.interestForm.contactPerson')}
                  </label>
                  <input name="contactPerson" value={interestFormData.contactPerson} onChange={handleInterestChange} required style={interestInputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
                    {t('solutions.interestForm.email')}
                  </label>
                  <input type="email" name="email" value={interestFormData.email} onChange={handleInterestChange} required style={interestInputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
                    {t('solutions.interestForm.phone')}
                  </label>
                  <input name="phone" value={interestFormData.phone} onChange={handleInterestChange} required style={interestInputStyle} />
                </div>
              </div>

              <h4 style={{ fontSize: '1.25rem', color: '#1e3a8a', margin: '0.5rem 0' }}>
                {t('solutions.interestForm.sectionPark')}
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
                    {t('solutions.interestForm.parkType')}
                  </label>
                  <select name="parkType" value={interestFormData.parkType} onChange={handleInterestChange} required style={interestInputStyle}>
                    <option value="" style={{ color: '#111827', backgroundColor: '#ffffff' }}>-</option>
                    <option value="standalone" style={{ color: '#111827', backgroundColor: '#ffffff' }}>{t('solutions.interestForm.typeOptions.standalone')}</option>
                    <option value="hybrid" style={{ color: '#111827', backgroundColor: '#ffffff' }}>{t('solutions.interestForm.typeOptions.hybrid')}</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
                    {t('solutions.interestForm.location')}
                  </label>
                  <input name="location" value={interestFormData.location} onChange={handleInterestChange} required style={interestInputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
                    {t('solutions.interestForm.powerMw')}
                  </label>
                  <input type="number" step="0.01" min="0" name="powerMw" value={interestFormData.powerMw} onChange={handleInterestChange} required style={interestInputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
                    {t('solutions.interestForm.capacityMwh')}
                  </label>
                  <input type="number" step="0.01" min="0" name="capacityMwh" value={interestFormData.capacityMwh} onChange={handleInterestChange} required style={interestInputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
                    {t('solutions.interestForm.connectionTerms')}
                  </label>
                  <select name="connectionTerms" value={interestFormData.connectionTerms} onChange={handleInterestChange} required style={interestInputStyle}>
                    <option value="" style={{ color: '#111827', backgroundColor: '#ffffff' }}>-</option>
                    <option value="yes" style={{ color: '#111827', backgroundColor: '#ffffff' }}>{t('solutions.interestForm.connectionOptions.yes')}</option>
                    <option value="no" style={{ color: '#111827', backgroundColor: '#ffffff' }}>{t('solutions.interestForm.connectionOptions.no')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
                  {t('solutions.interestForm.comments')}
                </label>
                <textarea
                  name="comments"
                  value={interestFormData.comments}
                  onChange={handleInterestChange}
                  rows={4}
                  style={{ ...interestInputStyle, resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginTop: '0.5rem' }}>
                <button type="submit" style={buttonStyle} disabled={interestSubmitting}>
                  {interestSubmitting ? t('solutions.interestForm.sending') : t('solutions.interestForm.submit')}
                </button>
                {interestSubmitted && (
                  <span style={{ color: '#065f46', fontWeight: '500' }}>
                    {t('solutions.interestForm.successMessage')}
                  </span>
                )}
                {interestError && (
                  <span style={{ color: '#b91c1c', fontWeight: '500' }}>
                    {interestError}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" style={{ padding: '5rem 1rem', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
              {t('contact.title')}
            </h2>
            <div style={{ width: '6rem', height: '0.25rem', backgroundColor: '#2563eb', margin: '0 auto' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: '#dbeafe',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '1.25rem', height: '1.25rem', fill: '#2563eb' }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                    {t('contact.address')}
                  </h3>
                  <p style={{ color: '#374151' }}>Αδριανείου 32, 11525, Νέο Ψυχικό Αθήνα</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: '#dbeafe',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '1.25rem', height: '1.25rem', fill: '#2563eb' }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                    {t('contact.phones')}
                  </h3>
                  <p style={{ color: '#374151', marginBottom: '0.25rem' }}>2106748239</p>
                  <p style={{ color: '#374151' }}>6970067029</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: '#dbeafe',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '1.25rem', height: '1.25rem', fill: '#2563eb' }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                    {t('contact.email')}
                  </h3>
                  <a href="mailto:info@renerenergy.gr" style={{ color: '#2563eb', textDecoration: 'none' }}>
                    info@renerenergy.gr
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#111827', color: 'white', padding: '3rem 1rem 2rem 1rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  backgroundColor: '#2563eb',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.125rem' }}>R</span>
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>RENER ENERGY</span>
              </div>
              <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>
                {t('footer.subtitle')}
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>{t('footer.links')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="#about" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('footer.about')}</a>
                <a href="#solutions" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('footer.solutions')}</a>
                <a href="#contact" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('footer.contact')}</a>
                <a href="/careers" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('footer.careers')}</a>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>{t('footer.contactInfo')}</h3>
              <div style={{ color: '#9ca3af', lineHeight: '1.6' }}>
                <p>{t('footer.address1')}</p>
                <p>{t('footer.address2')}</p>
                <p style={{ marginTop: '0.5rem' }}>{t('footer.phone')}</p>
                <p>{t('footer.mobile')}</p>
                <p style={{ marginTop: '0.5rem' }}>info@renerenergy.gr</p>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #374151', paddingTop: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#9ca3af' }}>
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}