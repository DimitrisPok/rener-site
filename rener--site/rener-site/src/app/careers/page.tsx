"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import '../../i18n';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import CareerForm from "@/components/CareerForm";

// Type definitions
interface JobTag {
  text: string;
  color: string;
}

interface Job {
  id: number;
  title: string;
  tags: JobTag[];
  shortDescription: string;
  fullDescription: string;
  skills: string[];
}

// Job data structure
interface Job {
  id: number;
  title: string;
  tags: JobTag[];
  shortDescription: string;
  fullDescription: string;
  skills: string[];
}

export default function Careers() {
  const { t } = useTranslation();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get job data from translations
  const getJobsData = (): Job[] => [
    {
      id: 1,
      title: t('careers.jobs.electricalEngineer.title'),
      tags: [
        { text: t('careers.tags.fullTime'), color: "blue" },
        { text: t('careers.tags.hybrid'), color: "yellow" },
        { text: t('careers.tags.midLevel'), color: "purple" }
      ],
      shortDescription: t('careers.jobs.electricalEngineer.shortDescription'),
      fullDescription: t('careers.jobs.electricalEngineer.fullDescription'),
      skills: t('careers.jobs.electricalEngineer.skills', { returnObjects: true }) as string[]
    },
    {
      id: 2,
      title: t('careers.jobs.softwareEngineer.title'),
      tags: [
        { text: t('careers.tags.fullTime'), color: "blue" },
        { text: t('careers.tags.remote'), color: "green" },
        { text: t('careers.tags.midLevel'), color: "purple" }
      ],
      shortDescription: t('careers.jobs.softwareEngineer.shortDescription'),
      fullDescription: t('careers.jobs.softwareEngineer.fullDescription'),
      skills: t('careers.jobs.softwareEngineer.skills', { returnObjects: true }) as string[]
    }
  ];

  // Smooth scroll function


  const getTagColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "bg-blue-100 text-blue-700", 
      green: "bg-green-100 text-green-700",
      purple: "bg-purple-100 text-purple-700",
      yellow: "bg-yellow-100 text-yellow-700",
      orange: "bg-orange-100 text-orange-700"
    };
    return colorMap[color] || "bg-gray-100 text-gray-700";
  };

  if (selectedJob) {
    return (
      <JobDetailPage 
        job={selectedJob} 
        onBack={() => setSelectedJob(null)}
        t={t}
      />
    );
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Image 
                src="/Rener_Icon_Green.png" 
                alt="Rener Energy Logo" 
                width={48}
                height={48}
                style={{
                  objectFit: 'contain'
                }}
              />
              <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                <span className="hidden sm:inline">RENER ENERGY</span>
                <span className="sm:hidden">RENER</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link href="/#about" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.about')}</Link>
              <Link href="/#solutions" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.solutions')}</Link>
              <Link href="/#contact" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.contact')}</Link>
              <a href="/careers" className="text-blue-600 font-medium">{t('nav.careers')}</a>
              <LanguageSwitcher />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                <Link 
                  href="/#about" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.about')}
                </Link>
                <Link 
                  href="/#solutions" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.solutions')}
                </Link>
                <Link 
                  href="/#contact" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.contact')}
                </Link>
                <a 
                  href="/careers" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-blue-50"
                >
                  {t('nav.careers')}
                </a>
                <div className="px-3 py-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-12 sm:pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t('careers.pageTitle')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            {t('careers.subtitle')}
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">{t('careers.whyWorkWithUs.title')}</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center p-4 sm:p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.75 2.524 9.026 9.026 0 01-1 .83z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{t('careers.whyWorkWithUs.continuousTraining.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t('careers.whyWorkWithUs.continuousTraining.description')}
              </p>
            </div>

            <div className="text-center p-4 sm:p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{t('careers.whyWorkWithUs.innovativeProjects.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t('careers.whyWorkWithUs.innovativeProjects.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">{t('careers.availablePositions')}</h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {getJobsData().map((job) => (
              <div key={job.id} className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-3 sm:space-y-0">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {job.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${getTagColorClasses(tag.color)}`}
                        >
                          {tag.text}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button 
                    className="btn-outline w-full sm:w-auto shrink-0 sm:ml-4"
                    onClick={() => setSelectedJob(job)}
                  >
                    {t('careers.viewDetails')}
                  </button>
                </div>
                <p className="text-gray-600 mb-4">
                  {job.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}


          </div>
        </div>
      </section>

      {/* Questions Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-heading mb-6">{t('careers.questions.title')}</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('careers.questions.description')}
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Link
              href="/#contact"
              className="btn-outline"
              style={{
                textAlign: 'center',
                width: '100%',
                maxWidth: '250px'
              }}
            >
              {t('careers.questions.contact')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Image
                src="/Rener_Icon_Green.png"
                alt="Rener Energy Logo"
                width={32}
                height={32}
                style={{
                  objectFit: 'contain'
                }}
              />
              <span className="text-xl font-bold">RENER ENERGY</span>
            </div>
            <p className="text-gray-400 mb-4">
              {t('careers.footer.copyright')}
            </p>
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
              {t('careers.footer.backToHome')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Job Detail Page Component
function JobDetailPage({ job, onBack, t }: { 
  job: Job, 
  onBack: () => void,
  t: (key: string) => string
}) {
  const getTagColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "bg-blue-100 text-blue-700", 
      green: "bg-green-100 text-green-700",
      purple: "bg-purple-100 text-purple-700",
      yellow: "bg-yellow-100 text-yellow-700",
      orange: "bg-orange-100 text-orange-700"
    };
    return colorMap[color] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="nav-fixed">
        <div className="container-responsive">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <Image
                  src="/Rener_Icon_Green.png"
                  alt="RENER ENERGY Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-xl font-bold text-gray-900">
                  RENER ENERGY
                </span>
              </Link>
            </div>
            <div className="flex space-x-8 items-center">
              <button 
                onClick={onBack}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                {t('careers.jobDetail.backToJobs')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Job Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-gray-50 to-gray-200">
        <div className="container-responsive">
          <div className="text-center mb-8">
            <h1 className="hero-title text-gray-900 mb-4">
              {job.title}
            </h1>
            <div className="flex justify-center flex-wrap gap-2 mb-4">
              {job.tags.map((tag: JobTag, index: number) => (
                <span 
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${getTagColorClasses(tag.color)}`}
                >
                  {tag.text}
                </span>
              ))}
            </div>
            <div className="flex justify-center flex-wrap gap-2">
              {job.skills.map((skill: string, index: number) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="section-padding bg-white">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Job Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('careers.jobDetail.jobDescription')}
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {job.fullDescription}
              </div>
            </div>

            {/* Contact Form */}
            <CareerForm jobTitle={job.title} />
          </div>
        </div>
      </section>
    </div>
  );
}