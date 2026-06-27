import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Shield, Award, Users, CheckCircle2 } from 'lucide-react';
import { translations } from '../data/translations';
import ThreeDHeroCanvas from './ThreeDHeroCanvas';

interface ThreeDHeroProps {
  currentLang: 'en' | 'ar';
}

export const ThreeDHero: React.FC<ThreeDHeroProps> = ({ currentLang: initialLang }) => {
  const [lang, setLang] = useState<'en' | 'ar'>(initialLang);

  // Sync language with navbar via custom window events
  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<'en' | 'ar'>;
      setLang(customEvent.detail);
    };

    window.addEventListener('lang-change', handleLangChange);
    return () => window.removeEventListener('lang-change', handleLangChange);
  }, []);

  const t = translations[lang].hero;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden mesh-gradient pt-16 select-none">
      {/* 3D Canvas Background Container */}
      <div className="absolute inset-0 z-0 opacity-80 dark:opacity-100">
        <ThreeDHeroCanvas />
      </div>

      {/* Atmospheric Top and Bottom radial shading covers */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-canvas-soft to-transparent pointer-events-none z-1" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-canvas-soft to-transparent pointer-events-none z-1" />

      {/* Main Content Overlay Grid */}
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 w-full pt-12 pb-20 items-center">
        {/* Left Side: Headlines and CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left rtl:items-start rtl:text-right"
        >
          {/* Vision 2030 Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/10 dark:bg-accent-blue/5 text-accent-blue dark:text-accent-cyan text-xs font-mono font-bold uppercase tracking-wider mb-6 cursor-pointer hover:border-accent-cyan/50 hover:bg-accent-blue/10 transition-colors shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
            </span>
            {t.badge}
          </motion.div>

          {/* Core Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink font-sans tracking-tight leading-none mb-6 relative"
          >
            {lang === 'ar' ? (
              <>
                نمدّ مستقبل <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan drop-shadow-[0_2px_15px_rgba(6,182,212,0.15)]">السعودية</span> بالطاقة
              </>
            ) : (
              <>
                Powering <br />
                Saudi Arabia's <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan drop-shadow-[0_2px_15px_rgba(6,182,212,0.15)]">Future.</span>
              </>
            )}
          </motion.h1>

          {/* Subheadline description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-body mb-8 max-w-xl font-medium leading-relaxed"
          >
            {t.subheadline}
          </motion.p>

          {/* Action Buttons cluster */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#products"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan text-white font-semibold text-sm hover:opacity-95 hover:shadow-lg hover:shadow-accent-cyan/20 active:scale-98 transition-all flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-cyan"
            >
              {t.exploreBtn}
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform duration-200 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </a>
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-canvas text-ink border border-glass-border font-semibold text-sm hover:bg-glass-border/40 hover:text-ink transition-colors active:scale-98 cursor-pointer focus:outline-none"
            >
              {t.projectsBtn}
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Quick Stats Column Grid (Glassmorphism containers) */}
        <div className="lg:col-span-5 w-full flex flex-col gap-4 self-center lg:pl-4">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
          >
            {/* Stat Item 1 */}
            <div className="p-5 glass-panel rounded-xl hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between h-32 select-none group border-l-2 border-l-accent-blue">
              <div className="flex justify-between items-start text-accent-blue">
                <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-2xl font-black font-mono">250+</span>
              </div>
              <span className="text-xs font-semibold text-body tracking-tight mt-4 uppercase">
                {lang === 'ar' ? 'المشاريع السكنية' : 'Residential Projects'}
              </span>
            </div>

            {/* Stat Item 2 */}
            <div className="p-5 glass-panel rounded-xl hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between h-32 select-none group border-l-2 border-l-accent-cyan">
              <div className="flex justify-between items-start text-accent-cyan">
                <Award className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-2xl font-black font-mono">150+</span>
              </div>
              <span className="text-xs font-semibold text-body tracking-tight mt-4 uppercase">
                {lang === 'ar' ? 'المشاريع التجارية' : 'Commercial Projects'}
              </span>
            </div>

            {/* Stat Item 3 */}
            <div className="p-5 glass-panel rounded-xl hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between h-32 select-none group border-l-2 border-l-purple-500">
              <div className="flex justify-between items-start text-purple-500">
                <Shield className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-2xl font-black font-mono">51+</span>
              </div>
              <span className="text-xs font-semibold text-body tracking-tight mt-4 uppercase">
                {lang === 'ar' ? 'العلامات المعتمدة' : 'Authorized Brands'}
              </span>
            </div>

            {/* Stat Item 4 */}
            <div className="p-5 glass-panel rounded-xl hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between h-32 select-none group border-l-2 border-l-green-500">
              <div className="flex justify-between items-start text-green-500">
                <CheckCircle2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-2xl font-black font-mono">100%</span>
              </div>
              <span className="text-xs font-semibold text-body tracking-tight mt-4 uppercase">
                {lang === 'ar' ? 'رضا العملاء المعتمد' : 'Customer Satisfaction'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default ThreeDHero;
