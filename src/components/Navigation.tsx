import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const next = i18n.language === 'fa' ? 'en' : 'fa';
    void i18n.changeLanguage(next);
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/workshops', label: t('nav.workshops') },
    { to: '/catering', label: t('nav.catering') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-red-500">鮨</span>
            <span className="text-xl font-semibold">Ms. Maaedeh</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-red-500 transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="hidden md:inline-flex items-center justify-center px-3 py-1.5 rounded-md border border-gray-700 text-sm font-medium hover:border-red-500 hover:text-red-500 transition-colors duration-200"
            aria-label={t('language.toggleLabel')}
          >
            {i18n.language === 'fa' ? t('language.en') : t('language.fa')}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <button
              type="button"
              onClick={toggleLanguage}
              className="w-full text-left py-2 hover:text-red-500 transition-colors duration-200"
              aria-label={t('language.toggleLabel')}
            >
              {i18n.language === 'fa' ? t('language.en') : t('language.fa')}
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block py-2 hover:text-red-500 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
