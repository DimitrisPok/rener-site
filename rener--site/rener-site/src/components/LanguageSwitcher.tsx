'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setIsDropdownOpen(false);
  };

  const currentLanguage = i18n.language || 'el';

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          borderRadius: '0.375rem',
          color: '#374151',
          fontSize: '0.875rem',
          fontWeight: '500',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f3f4f6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <svg 
          style={{ width: '1.25rem', height: '1.25rem', fill: 'currentColor' }} 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-4 0 2 2 0 00-1.668-1.973z" clipRule="evenodd"></path>
        </svg>
        <span>{currentLanguage.toUpperCase()}</span>
        <svg 
          style={{ 
            width: '1rem', 
            height: '1rem', 
            fill: 'currentColor',
            transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }} 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '0.5rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
            minWidth: '120px',
            zIndex: 1000,
            overflow: 'hidden'
          }}
        >
          <button
            onClick={() => toggleLanguage('el')}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              textAlign: 'left',
              border: 'none',
              backgroundColor: currentLanguage === 'el' ? '#f3f4f6' : 'transparent',
              cursor: 'pointer',
              fontSize: '0.875rem',
              color: '#374151',
              transition: 'background-color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              if (currentLanguage !== 'el') {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              if (currentLanguage !== 'el') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            🇬🇷 Ελληνικά
          </button>
          <button
            onClick={() => toggleLanguage('en')}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              textAlign: 'left',
              border: 'none',
              backgroundColor: currentLanguage === 'en' ? '#f3f4f6' : 'transparent',
              cursor: 'pointer',
              fontSize: '0.875rem',
              color: '#374151',
              transition: 'background-color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              if (currentLanguage !== 'en') {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              if (currentLanguage !== 'en') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            🇺🇸 English
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;