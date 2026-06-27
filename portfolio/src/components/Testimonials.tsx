import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { translations } from '../data/translations';

interface TestimonialsProps {
  currentLang: 'en' | 'ar';
}

export const Testimonials: React.FC<TestimonialsProps> = ({ currentLang: initialLang }) => {
  const [lang, setLang] = useState<'en' | 'ar'>(initialLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync language selection
  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<'en' | 'ar'>;
      setLang(customEvent.detail);
    };
    window.addEventListener('lang-change', handleLangChange);
    return () => window.removeEventListener('lang-change', handleLangChange);
  }, []);

  const t = translations[lang].testimonials;
  const testimonialsList = t.list;

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsList.length);
    }, 5000); // Swap every 5 seconds
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [lang]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsList.length - 1 : prev - 1));
    startTimer();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsList.length);
    startTimer();
  };

  const handleDotClick = (idx: number) => {
    setCurrentIndex(idx);
    startTimer();
  };

  // Initials generator
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  // Profile icon colors
  const profileColors = [
    'bg-gradient-to-tr from-blue-500 to-cyan-400',
    'bg-gradient-to-tr from-purple-500 to-pink-500',
    'bg-gradient-to-tr from-emerald-500 to-teal-400'
  ];

  return (
    <section className="py-24 bg-canvas border-t border-glass-border select-none overflow-hidden">
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

        {/* Testimonial slider body */}
        <div className="relative max-w-3xl mx-auto px-4 sm:px-12 flex items-center justify-center min-h-[300px]">
          
          {/* Navigation Controls: Desktop Chevron buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 p-2.5 rounded-full glass-panel border border-glass-border hover:bg-glass-border/30 text-body hover:text-ink transition-colors focus:outline-none z-10 hidden sm:block rtl:left-auto rtl:right-0"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 p-2.5 rounded-full glass-panel border border-glass-border hover:bg-glass-border/30 text-body hover:text-ink transition-colors focus:outline-none z-10 hidden sm:block rtl:right-auto rtl:left-0"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Testimonial Container */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="glass-panel p-8 sm:p-12 rounded-3xl relative text-center flex flex-col items-center justify-between border-t border-t-accent-blue/30 shadow-lg min-h-[260px]"
              >
                {/* Floating quote badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent-blue to-accent-cyan flex items-center justify-center text-white shadow-md shadow-accent-cyan/15">
                  <Quote className="w-5 h-5" />
                </div>

                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-6 mt-2">
                  {[...Array(testimonialsList[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote description */}
                <p className="text-sm sm:text-base text-ink italic font-medium leading-relaxed mb-6 max-w-xl">
                  "{testimonialsList[currentIndex].quote}"
                </p>

                {/* Profile author footer */}
                <div className="flex flex-col items-center">
                  <div className={`w-11 h-11 rounded-full ${profileColors[currentIndex % profileColors.length]} flex items-center justify-center text-white text-xs font-black mb-2 shadow-sm font-sans`}>
                    {getInitials(testimonialsList[currentIndex].author)}
                  </div>
                  <h4 className="text-xs font-extrabold text-ink">
                    {testimonialsList[currentIndex].author}
                  </h4>
                  <span className="text-[10px] text-mute uppercase tracking-wider font-mono">
                    {testimonialsList[currentIndex].position}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {testimonialsList.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`h-2 rounded-full transition-all focus:outline-none ${
                idx === currentIndex
                  ? 'w-6 bg-accent-blue'
                  : 'w-2 bg-glass-border hover:bg-mute'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
export default Testimonials;
