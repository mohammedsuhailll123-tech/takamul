import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Globe, Search, Menu, X, ChevronDown, Zap, Settings } from 'lucide-react';
import { translations } from '../data/translations';

interface NavbarProps {
  currentLang: 'en' | 'ar';
  currentTheme: 'dark' | 'light';
}

export const Navbar: React.FC<NavbarProps> = ({ currentLang: initialLang, currentTheme: initialTheme }) => {
  const [lang, setLang] = useState<'en' | 'ar'>(initialLang);
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const t = translations[lang].nav;

  // Listen to scrolls to adjust navbar blur/height
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update theme in DOM and dispatch custom event
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Dispatch custom event for other islands to sync
    window.dispatchEvent(new CustomEvent('theme-change', { detail: nextTheme }));
  };

  // Update language, document direction, and dispatch custom event
  const toggleLang = () => {
    const nextLang = lang === 'en' ? 'ar' : 'en';
    setLang(nextLang);
    localStorage.setItem('lang', nextLang);
    document.documentElement.setAttribute('lang', nextLang);
    document.documentElement.setAttribute('dir', nextLang === 'ar' ? 'rtl' : 'ltr');
    
    // Dispatch custom event for other islands to sync
    window.dispatchEvent(new CustomEvent('lang-change', { detail: nextLang }));
  };

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveMegaMenu(false);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Handle local searching dispatch
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.dispatchEvent(new CustomEvent('search-submit', { detail: searchQuery }));
      // Scroll to products section
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-glass-bg backdrop-blur-md border-b border-glass-border shadow-md' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="flex items-center gap-2 group focus:outline-none"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-tr from-accent-blue to-accent-cyan flex items-center justify-center shadow-md shadow-accent-cyan/15 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-sans font-extrabold text-lg tracking-tight select-none">
            {lang === 'ar' ? (
              <span className="text-ink">تكامل <span className="text-accent-cyan font-bold">الحلول</span></span>
            ) : (
              <span className="text-ink">TAKAMUL <span className="text-accent-blue font-bold">SOLUTIONS</span></span>
            )}
          </span>
        </a>

        {/* Desktop Nav Navigation links */}
        <nav className="hidden lg:flex items-center gap-1">
          <a href="#" className="px-4 py-2 text-sm font-medium text-body hover:text-ink rounded-full hover:bg-glass-border/30 transition-colors">
            {t.home}
          </a>
          <a href="#about" className="px-4 py-2 text-sm font-medium text-body hover:text-ink rounded-full hover:bg-glass-border/30 transition-colors">
            {t.about}
          </a>
          
          {/* Mega Menu Toggle Link */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setActiveMegaMenu(!activeMegaMenu)}
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors focus:outline-none ${
                activeMegaMenu 
                  ? 'text-ink bg-glass-border/40' 
                  : 'text-body hover:text-ink hover:bg-glass-border/30'
              }`}
            >
              {t.products}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMegaMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {activeMegaMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-12 w-[600px] p-6 glass-panel rounded-xl grid grid-cols-2 gap-6 z-50 text-ink"
                >
                  {/* Electrical Column */}
                  <div>
                    <a 
                      href="mailto:info@takamul.sa?subject=Inquiry%20about%20Electrical%20Products"
                      onClick={() => setActiveMegaMenu(false)}
                      className="block group/title focus:outline-none mb-3 border-b border-glass-border pb-1"
                    >
                      <h3 className="text-xs font-bold uppercase tracking-wider text-accent-blue group-hover/title:text-accent-cyan font-mono transition-colors flex items-center justify-between">
                        {t.electrical}
                        <span className="text-[9px] lowercase font-sans opacity-0 group-hover/title:opacity-100 transition-opacity font-normal text-mute">
                          {lang === 'ar' ? 'أرسل بريداً' : 'click to email'}
                        </span>
                      </h3>
                    </a>
                    <ul className="space-y-2">
                      {[
                        { key: 'lighting', name: lang === 'ar' ? 'الإضاءة' : 'Lighting' },
                        { key: 'cables', name: lang === 'ar' ? 'الكابلات' : 'Cables' },
                        { key: 'conduits', name: lang === 'ar' ? 'الأنابيب الكهربائية' : 'Conduits' },
                        { key: 'panelBoards', name: lang === 'ar' ? 'لوحات التوزيع' : 'Panel Boards' },
                        { key: 'transformers', name: lang === 'ar' ? 'المحولات' : 'Transformers' },
                        { key: 'lightning', name: lang === 'ar' ? 'مانعات الصواعق' : 'Lightning Protection' }
                      ].map((item) => (
                        <li key={item.key}>
                          <a 
                            href={`#products-${item.key}`} 
                            onClick={() => setActiveMegaMenu(false)}
                            className="text-sm text-body hover:text-ink hover:underline block py-1"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mechanical Column */}
                  <div>
                    <a 
                      href="mailto:info@takamul.sa?subject=Inquiry%20about%20Mechanical%20Products"
                      onClick={() => setActiveMegaMenu(false)}
                      className="block group/title focus:outline-none mb-3 border-b border-glass-border pb-1"
                    >
                      <h3 className="text-xs font-bold uppercase tracking-wider text-accent-cyan group-hover/title:text-accent-blue font-mono transition-colors flex items-center justify-between">
                        {t.mechanical}
                        <span className="text-[9px] lowercase font-sans opacity-0 group-hover/title:opacity-100 transition-opacity font-normal text-mute">
                          {lang === 'ar' ? 'أرسل بريداً' : 'click to email'}
                        </span>
                      </h3>
                    </a>
                    <ul className="space-y-2">
                      {[
                        { key: 'plumbing', name: lang === 'ar' ? 'السباكة والمواسير' : 'Plumbing & Pipes' },
                        { key: 'sanitary', name: lang === 'ar' ? 'الأدوات الصحية' : 'Sanitary Ware' }
                      ].map((item) => (
                        <li key={item.key}>
                          <a 
                            href={`#products-${item.key}`} 
                            onClick={() => setActiveMegaMenu(false)}
                            className="text-sm text-body hover:text-ink hover:underline block py-1"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#industries" className="px-4 py-2 text-sm font-medium text-body hover:text-ink rounded-full hover:bg-glass-border/30 transition-colors">
            {t.industries}
          </a>
          <a href="#projects" className="px-4 py-2 text-sm font-medium text-body hover:text-ink rounded-full hover:bg-glass-border/30 transition-colors">
            {t.projects}
          </a>
          <a href="#why-us" className="px-4 py-2 text-sm font-medium text-body hover:text-ink rounded-full hover:bg-glass-border/30 transition-colors">
            {t.whyUs}
          </a>
          <a href="#contact" className="px-4 py-2 text-sm font-medium text-body hover:text-ink rounded-full hover:bg-glass-border/30 transition-colors">
            {t.contact}
          </a>
        </nav>

        {/* Settings Cluster (Search, Lang, Theme, Hamburg) */}
        <div className="flex items-center gap-2">
          {/* Expandable Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 180, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-full border border-glass-border bg-glass-bg text-ink focus:outline-none focus:ring-1 focus:ring-accent-blue mr-2 text-left rtl:text-right"
                  autoFocus
                />
              )}
            </AnimatePresence>
            <button 
              type="button"
              onClick={() => {
                if (searchOpen && searchQuery) {
                  // submit search query
                  window.dispatchEvent(new CustomEvent('search-submit', { detail: searchQuery }));
                  const prod = document.getElementById('products');
                  if (prod) prod.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setSearchOpen(!searchOpen);
                }
              }}
              className="p-2 rounded-full hover:bg-glass-border/30 text-body hover:text-ink transition-colors focus:outline-none"
              aria-label="Search site"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
          </form>

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="p-2 rounded-full hover:bg-glass-border/30 text-body hover:text-ink transition-colors focus:outline-none flex items-center gap-1 text-xs font-mono font-bold"
            title="Switch Language / تغيير اللغة"
            aria-label="Switch Language"
          >
            <Globe className="w-4.5 h-4.5" />
            <span className="uppercase">{lang === 'en' ? 'AR' : 'EN'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-glass-border/30 text-body hover:text-ink transition-colors focus:outline-none"
            title={theme === 'dark' ? 'Activate Light Mode' : 'Activate Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full hover:bg-glass-border/30 text-body hover:text-ink transition-colors focus:outline-none lg:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-glass-border bg-glass-bg backdrop-blur-lg overflow-hidden text-ink"
          >
            <nav className="flex flex-col px-6 py-4 space-y-3 font-medium">
              {[
                { href: '#', label: t.home },
                { href: '#about', label: t.about },
                { href: '#products', label: t.products },
                { href: '#industries', label: t.industries },
                { href: '#projects', label: t.projects },
                { href: '#why-us', label: t.whyUs },
                { href: '#contact', label: t.contact }
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-1.5 text-sm hover:text-accent-cyan transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
