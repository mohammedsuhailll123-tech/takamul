import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, Factory, ArrowUpRight } from 'lucide-react';
import { translations } from '../data/translations';

interface IndustriesProps {
  currentLang: 'en' | 'ar';
}

export const Industries: React.FC<IndustriesProps> = ({ currentLang: initialLang }) => {
  const [lang, setLang] = useState<'en' | 'ar'>(initialLang);

  // Sync language selection
  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<'en' | 'ar'>;
      setLang(customEvent.detail);
    };
    window.addEventListener('lang-change', handleLangChange);
    return () => window.removeEventListener('lang-change', handleLangChange);
  }, []);

  const t = translations[lang].industries;

  // Custom mouse coordinates for glow cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="industries" className="py-24 bg-canvas border-t border-glass-border select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="caption-mono text-accent-blue mb-3 block">
            {t.badge}
          </span>
          <h2 className="display-lg text-ink">
            {t.headline}
          </h2>
        </div>

        {/* 3 columns grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Residential Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0 }}
            onMouseMove={handleMouseMove}
            className="glow-card p-6 glass-panel rounded-2xl flex flex-col justify-between h-[360px] group cursor-default"
          >
            <div>
              {/* Card top */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-lg bg-glass-border/40 flex items-center justify-center border border-glass-border shadow-sm text-accent-blue group-hover:scale-105 transition-transform">
                  <Home className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-mute uppercase tracking-widest">SEC-01</span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-sm font-bold text-ink mb-2 group-hover:text-accent-blue transition-colors">
                {t.residentialTitle}
              </h3>
              <p className="text-xs text-body leading-relaxed mb-6">
                {t.residentialDesc}
              </p>
            </div>

            {/* Custom Interactive SVG Animation: Residential Smart Villa Grid */}
            <div className="relative h-24 w-full bg-glass-border/10 rounded-xl overflow-hidden border border-glass-border flex items-center justify-center">
              <svg className="w-full h-full p-2" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Villa shape outline */}
                <path d="M10 32 L35 32 L35 18 L22.5 8 L10 18 Z" stroke="var(--accent-blue)" strokeWidth="1.2" opacity="0.3" />
                <path d="M20 32 L20 24 L25 24 L25 32" stroke="var(--accent-blue)" strokeWidth="1.2" opacity="0.3" />
                {/* Flowing electric lines */}
                <path d="M10 32 H90" stroke="currentColor" className="text-slate-700 dark:text-slate-800" strokeWidth="0.8" />
                <path d="M22.5 8 V32" stroke="var(--accent-cyan)" strokeWidth="1" strokeDasharray="3,3" />
                
                {/* Flowing electrons */}
                <circle r="1" fill="var(--accent-cyan)">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M10 32 H22.5 V8" />
                </circle>
                <circle r="1.2" fill="var(--accent-blue)">
                  <animateMotion dur="4s" repeatCount="indefinite" path="M90 32 H22.5" />
                </circle>
              </svg>
            </div>
          </motion.div>

          {/* Commercial Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onMouseMove={handleMouseMove}
            className="glow-card p-6 glass-panel rounded-2xl flex flex-col justify-between h-[360px] group cursor-default"
          >
            <div>
              {/* Card top */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-lg bg-glass-border/40 flex items-center justify-center border border-glass-border shadow-sm text-accent-cyan group-hover:scale-105 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-mute uppercase tracking-widest">SEC-02</span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-sm font-bold text-ink mb-2 group-hover:text-accent-cyan transition-colors">
                {t.commercialTitle}
              </h3>
              <p className="text-xs text-body leading-relaxed mb-6">
                {t.commercialDesc}
              </p>
            </div>

            {/* Custom Interactive SVG Animation: Commercial Tower Grid */}
            <div className="relative h-24 w-full bg-glass-border/10 rounded-xl overflow-hidden border border-glass-border flex items-center justify-center">
              <svg className="w-full h-full p-2" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Towers outlines */}
                <rect x="15" y="8" width="16" height="24" rx="1" stroke="var(--accent-cyan)" strokeWidth="1.2" opacity="0.3" />
                <rect x="36" y="14" width="14" height="18" rx="1" stroke="var(--accent-cyan)" strokeWidth="1.2" opacity="0.2" />
                {/* Power Grid loops */}
                <path d="M5 32 H95" stroke="currentColor" className="text-slate-700 dark:text-slate-800" strokeWidth="0.8" />
                <path d="M23 8 V32 M43 14 V32" stroke="var(--accent-blue)" strokeWidth="0.8" opacity="0.4" />
                
                {/* Flowing electrons */}
                <circle r="1" fill="var(--accent-blue)">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M23 32 V8" />
                </circle>
                <circle r="1" fill="var(--accent-cyan)">
                  <animateMotion dur="3.5s" repeatCount="indefinite" path="M5 32 H43 V14" />
                </circle>
              </svg>
            </div>
          </motion.div>

          {/* Industrial Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onMouseMove={handleMouseMove}
            className="glow-card p-6 glass-panel rounded-2xl flex flex-col justify-between h-[360px] group cursor-default"
          >
            <div>
              {/* Card top */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-lg bg-glass-border/40 flex items-center justify-center border border-glass-border shadow-sm text-purple-500 group-hover:scale-105 transition-transform">
                  <Factory className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-mute uppercase tracking-widest">SEC-03</span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-sm font-bold text-ink mb-2 group-hover:text-purple-500 transition-colors">
                {t.industrialTitle}
              </h3>
              <p className="text-xs text-body leading-relaxed mb-6">
                {t.industrialDesc}
              </p>
            </div>

            {/* Custom Interactive SVG Animation: Industrial Factory Lines */}
            <div className="relative h-24 w-full bg-glass-border/10 rounded-xl overflow-hidden border border-glass-border flex items-center justify-center">
              <svg className="w-full h-full p-2" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Factory silhouette */}
                <path d="M10 32 V20 L22 25 V20 L34 25 V14 L46 20 V32 Z" stroke="var(--accent-blue)" strokeWidth="1.2" opacity="0.3" />
                <line x1="41" y1="14" x2="41" y2="8" stroke="var(--accent-blue)" strokeWidth="1.2" opacity="0.3" />
                {/* Energy pulses */}
                <path d="M10 32 H90" stroke="currentColor" className="text-slate-700 dark:text-slate-800" strokeWidth="0.8" />
                <path d="M46 20 H90" stroke="var(--accent-cyan)" strokeWidth="0.8" strokeDasharray="4,2" opacity="0.5" />
                
                {/* Electrons flowing */}
                <circle r="1" fill="var(--accent-cyan)">
                  <animateMotion dur="2s" repeatCount="indefinite" path="M10 32 V20 L46 20 H90" />
                </circle>
              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
export default Industries;
