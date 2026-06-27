import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare, PhoneCall, Send, ArrowRight } from 'lucide-react';
import { translations } from '../data/translations';

interface ContactFormProps {
  currentLang: 'en' | 'ar';
}

export const ContactForm: React.FC<ContactFormProps> = ({ currentLang: initialLang }) => {
  const [lang, setLang] = useState<'en' | 'ar'>(initialLang);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Sync language selection
  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<'en' | 'ar'>;
      setLang(customEvent.detail);
    };
    window.addEventListener('lang-change', handleLangChange);
    return () => window.removeEventListener('lang-change', handleLangChange);
  }, []);

  const t = translations[lang].contact;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    const emailTo = 'info@takamul.sa';
    let emailSubject = '';
    let emailBody = '';

    if (lang === 'ar') {
      emailSubject = formData.subject ? `استفسار: ${formData.subject}` : 'نموذج التواصل بموقع تكامل الحلول';
      emailBody = `مرحباً فريق تكامل الحلول،\n\n` +
                  `تم إرسال رسالة تواصل جديدة عبر النموذج الإلكتروني بالموقع:\n\n` +
                  `الاسم: ${formData.name}\n` +
                  `البريد الإلكتروني: ${formData.email}\n` +
                  `الهاتف: ${formData.phone || 'غير محدد'}\n` +
                  `الشركة: ${formData.company || 'غير محدد'}\n` +
                  `الموضوع: ${formData.subject || 'غير محدد'}\n\n` +
                  `الرسالة:\n${formData.message}\n`;
    } else {
      emailSubject = formData.subject ? `Inquiry: ${formData.subject}` : 'New Contact Submission - Takamul Solutions';
      emailBody = `Hello Takamul Solutions Team,\n\n` +
                  `You have received a new contact form submission:\n\n` +
                  `Name: ${formData.name}\n` +
                  `Email: ${formData.email}\n` +
                  `Phone: ${formData.phone || 'Not provided'}\n` +
                  `Company: ${formData.company || 'Not provided'}\n` +
                  `Subject: ${formData.subject || 'Not provided'}\n\n` +
                  `Message:\n${formData.message}\n`;
    }

    const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Redirect to native mail application
    window.location.href = mailtoUrl;

    setStatus('success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setStatus('idle'), 6000);
  };

  return (
    <section id="contact" className="py-24 bg-canvas-soft border-t border-glass-border select-none">
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

        {/* Dual column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto mb-12">
          
          {/* Left Column: Details & Direct triggers */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Address */}
            <div className="p-5 glass-panel rounded-2xl flex gap-4 border-l-2 border-l-accent-blue">
              <div className="w-10 h-10 rounded-lg bg-glass-border/40 flex items-center justify-center border border-glass-border text-accent-blue flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-ink mb-1">{t.addressTitle}</h4>
                <p className="text-[11px] text-body leading-relaxed">{t.addressText}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="p-5 glass-panel rounded-2xl flex gap-4 border-l-2 border-l-accent-cyan">
              <div className="w-10 h-10 rounded-lg bg-glass-border/40 flex items-center justify-center border border-glass-border text-accent-cyan flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-ink mb-1">{t.phoneTitle}</h4>
                <p className="text-[11px] text-body leading-relaxed">{t.phoneText}</p>
              </div>
            </div>

            {/* Email */}
            <div className="p-5 glass-panel rounded-2xl flex gap-4 border-l-2 border-l-purple-500">
              <div className="w-10 h-10 rounded-lg bg-glass-border/40 flex items-center justify-center border border-glass-border text-purple-500 flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-ink mb-1">{t.emailTitle}</h4>
                <p className="text-[11px] text-body leading-relaxed">{t.emailText}</p>
              </div>
            </div>

            {/* Hours */}
            <div className="p-5 glass-panel rounded-2xl flex gap-4 border-l-2 border-l-amber-500">
              <div className="w-10 h-10 rounded-lg bg-glass-border/40 flex items-center justify-center border border-glass-border text-amber-500 flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-ink mb-1">{t.hoursTitle}</h4>
                <p className="text-[11px] text-body leading-relaxed">{t.hoursText}</p>
              </div>
            </div>

            {/* Communications Triggers Row */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              <a
                href="https://wa.me/966138576662"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-glass-border hover:bg-glass-border/30 text-[10px] font-bold text-ink text-center gap-1.5 focus:outline-none"
              >
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <span>{t.whatsappBtn}</span>
              </a>
              <a
                href="mailto:info@takamul.sa"
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-glass-border hover:bg-glass-border/30 text-[10px] font-bold text-ink text-center gap-1.5 focus:outline-none"
              >
                <Mail className="w-4 h-4 text-accent-blue" />
                <span>{t.emailBtn}</span>
              </a>
              <a
                href="tel:+966138576662"
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-glass-border hover:bg-glass-border/30 text-[10px] font-bold text-ink text-center gap-1.5 focus:outline-none"
              >
                <PhoneCall className="w-4 h-4 text-accent-cyan" />
                <span>{t.callBtn}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Secure Form Panel */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 rounded-2xl border-t border-t-accent-blue/30 h-full">
              <h3 className="text-sm font-bold text-ink mb-5 font-sans border-b border-glass-border pb-2">
                {t.formTitle}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-mono text-mute uppercase mb-1">{t.formName}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="px-3.5 py-2 text-xs rounded-lg border border-glass-border bg-glass-bg text-ink focus:outline-none focus:ring-1 focus:ring-accent-blue"
                    />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-mono text-mute uppercase mb-1">{t.formEmail}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="px-3.5 py-2 text-xs rounded-lg border border-glass-border bg-glass-bg text-ink focus:outline-none focus:ring-1 focus:ring-accent-blue text-left"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-mono text-mute uppercase mb-1">{t.formPhone}</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="px-3.5 py-2 text-xs rounded-lg border border-glass-border bg-glass-bg text-ink focus:outline-none focus:ring-1 focus:ring-accent-blue text-left"
                    />
                  </div>
                  {/* Company */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-mono text-mute uppercase mb-1">{t.formCompany}</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="px-3.5 py-2 text-xs rounded-lg border border-glass-border bg-glass-bg text-ink focus:outline-none focus:ring-1 focus:ring-accent-blue"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-mute uppercase mb-1">{t.formSubject}</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="px-3.5 py-2 text-xs rounded-lg border border-glass-border bg-glass-bg text-ink focus:outline-none focus:ring-1 focus:ring-accent-blue"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-mute uppercase mb-1">{t.formMessage}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="px-3.5 py-2 text-xs rounded-lg border border-glass-border bg-glass-bg text-ink focus:outline-none focus:ring-1 focus:ring-accent-blue resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className="w-full px-5 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-cyan text-white text-xs font-bold hover:opacity-95 disabled:opacity-50 transition-opacity flex items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
                >
                  {status === 'sending' ? (
                    <span>{t.formSending}</span>
                  ) : (
                    <>
                      <span>{t.formSubmit}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </>
                  )}
                </button>

                {/* Feedback response notifications */}
                {status === 'success' && (
                  <p className="text-xs text-emerald-500 font-semibold text-center mt-3 font-mono">
                    {t.formSuccess}
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-xs text-rose-500 font-semibold text-center mt-3 font-mono">
                    {t.formError}
                  </p>
                )}
              </form>
            </div>
          </div>

        </div>

        {/* Embedded Map Section */}
        <div className="max-w-6xl mx-auto glass-panel p-2 rounded-2xl overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.435423851722!2d50.1422113!3d26.4075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49fc3584ad5b5f%3A0xa19f72db7265bfcf!2sYazid%20Ibn%20Malek%20St%2C%20Al%20Khalidiyah%20Ash%20Shamaliyah%2C%20Dammam%2032232%2C%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1703600000000!5m2!1sen!2ssa"
            className="w-full h-80 rounded-xl border-0 filter grayscale dark:invert-[90%] dark:hue-rotate-[180deg] select-none"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Takamul Solutions HQ Map"
          />
        </div>

      </div>
    </section>
  );
};
export default ContactForm;
