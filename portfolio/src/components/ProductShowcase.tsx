import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, Cable, Layers, Grid, ArrowDownToLine, Zap, Power, Cpu, 
  ToggleLeft, ShieldAlert, Unplug, Box, Wrench, Container, Inbox, 
  Droplet, Eye, X, PhoneCall, Send, ShoppingCart, Mail
} from 'lucide-react';
import { translations } from '../data/translations';

interface ProductShowcaseProps {
  currentLang: 'en' | 'ar';
}

interface ProductItem {
  id: string;
  category: 'electrical' | 'mechanical';
  name: string;
  desc: string;
  icon: React.ReactNode;
  specs: string[];
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ currentLang: initialLang }) => {
  const [lang, setLang] = useState<'en' | 'ar'>(initialLang);
  const [filter, setFilter] = useState<'all' | 'electrical' | 'mechanical'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Sync language selection
  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<'en' | 'ar'>;
      setLang(customEvent.detail);
    };
    window.addEventListener('lang-change', handleLangChange);
    return () => window.removeEventListener('lang-change', handleLangChange);
  }, []);

  // Listen to search events dispatched from the Navbar
  useEffect(() => {
    const handleSearch = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setSearchQuery(customEvent.detail);
    };
    window.addEventListener('search-submit', handleSearch);
    return () => window.removeEventListener('search-submit', handleSearch);
  }, []);

  const t = translations[lang].products;

  // Icons map matching translations key
  const iconsMap: Record<string, React.ReactNode> = {
    lighting: <Lightbulb className="w-6 h-6 text-accent-cyan" />,
    cables: <Cable className="w-6 h-6 text-accent-blue" />,
    cableAcc: <Layers className="w-6 h-6 text-purple-500" />,
    conduits: <Grid className="w-6 h-6 text-emerald-500" />,
    earthing: <ArrowDownToLine className="w-6 h-6 text-slate-400" />,
    lightning: <Zap className="w-6 h-6 text-amber-500" />,
    industrialPlugs: <Power className="w-6 h-6 text-red-500" />,
    industrialSockets: <Power className="w-6 h-6 text-orange-500" />,
    panelBoards: <Cpu className="w-6 h-6 text-accent-blue" />,
    circuitBreakers: <ToggleLeft className="w-6 h-6 text-emerald-400" />,
    safetySwitches: <ShieldAlert className="w-6 h-6 text-yellow-500" />,
    isolators: <Unplug className="w-6 h-6 text-accent-cyan" />,
    transformers: <Box className="w-6 h-6 text-indigo-400" />,
    electricalTools: <Wrench className="w-6 h-6 text-slate-400" />,
    enclosures: <Container className="w-6 h-6 text-blue-500" />,
    junctionBoxes: <Inbox className="w-6 h-6 text-purple-400" />,
    plumbing: <Droplet className="w-6 h-6 text-accent-blue" />,
    sanitary: <Droplet className="w-6 h-6 text-accent-cyan" />
  };

  // Static list of products mapped to translations keys
  const productsList: ProductItem[] = [
    {
      id: 'lighting',
      category: 'electrical',
      name: t.items.lighting.name,
      desc: t.items.lighting.desc,
      icon: iconsMap.lighting,
      specs: lang === 'ar' 
        ? ['إضاءة LED للمستودعات والمكاتب', 'أنظمة تحكم ذكية متوافقة مع DALI', 'تصنيف كفاءة طاقة مرتفع']
        : ['High-bay LED for industrial facilities', 'Smart DALI control compatibility', 'Exceptional lumen-per-watt rating']
    },
    {
      id: 'cables',
      category: 'electrical',
      name: t.items.cables.name,
      desc: t.items.cables.desc,
      icon: iconsMap.cables,
      specs: lang === 'ar' 
        ? ['كابلات نحاسية وألومنيوم مسلحة', 'عزل XLPE للجهد المنخفض والمتوسط', 'معتمدة من شركة الكهرباء السعودية SEC']
        : ['Copper and aluminum armored cables', 'XLPE insulation for LV and MV', 'SEC (Saudi Electricity Co.) approved']
    },
    {
      id: 'cableAcc',
      category: 'electrical',
      name: t.items.cableAcc.name,
      desc: t.items.cableAcc.desc,
      icon: iconsMap.cableAcc,
      specs: lang === 'ar' 
        ? ['حوامل كابلات GI مثقبة ومجلفنة', 'وصلات ونهايات كابلات حرارية متكاملة', 'مقاومة عالية للصدأ والتآكل']
        : ['GI perforated and ladder cable trays', 'Heat shrinkable joints and terminations', 'Extreme corrosion resistance']
    },
    {
      id: 'conduits',
      category: 'electrical',
      name: t.items.conduits.name,
      desc: t.items.conduits.desc,
      icon: iconsMap.conduits,
      specs: lang === 'ar' 
        ? ['أنابيب PVC صلبة وجلب تفريغ', 'أنابيب GI حديدية مجلفنة للأعمال الثقيلة', 'تتوافق مع معايير UL و SASO']
        : ['Rigid PVC conduits and utility boxes', 'Hot-dip galvanized GI conduits', 'Complies with UL and SASO criteria']
    },
    {
      id: 'earthing',
      category: 'electrical',
      name: t.items.earthing.name,
      desc: t.items.earthing.desc,
      icon: iconsMap.earthing,
      specs: lang === 'ar' 
        ? ['قضبان نحاسية نقية موصلة بالكامل', 'أشرطة نحاس تأريض مسطحة وموصلات بمشابك', 'مركبات تقليل مقاومة التربة الكيميائية']
        : ['Pure copper ground rods and couplings', 'Copper earthing tape and clamps', 'Soil resistance reduction compounds']
    },
    {
      id: 'lightning',
      category: 'electrical',
      name: t.items.lightning.name,
      desc: t.items.lightning.desc,
      icon: iconsMap.lightning,
      specs: lang === 'ar' 
        ? ['رؤوس مانعة صواعق نشطة مبكرة النبض ESE', 'أنظمة قفص فاراداي لحماية الأبراج', 'أجهزة تسجيل وعدادات الضربات الصاعقة']
        : ['Early Streamer Emission active rods', 'Traditional Faraday cage installations', 'Lightning strike counters and recorders']
    },
    {
      id: 'industrialPlugs',
      category: 'electrical',
      name: t.items.industrialPlugs.name,
      desc: t.items.industrialPlugs.desc,
      icon: iconsMap.industrialPlugs,
      specs: lang === 'ar' 
        ? ['تصنيفات طاقة تبدأ من 16A إلى 125A', 'تصنيفات حماية IP44 و IP67', 'وصلات قفل مانعة للاهتزاز']
        : ['Rating range from 16A up to 125A', 'IP44 and IP67 weather shielding', 'Vibration-proof locking joints']
    },
    {
      id: 'industrialSockets',
      category: 'electrical',
      name: t.items.industrialSockets.name,
      desc: t.items.industrialSockets.desc,
      icon: iconsMap.industrialSockets,
      specs: lang === 'ar' 
        ? ['مقابس مثبتة على الحائط أو لوحات مدمجة', 'هياكل مقاومة للصدمات والكيماويات', 'آليات حماية قفل أمان مدمجة']
        : ['Wall-mounted and panel-mounted types', 'Impact and chemical resistant body', 'Built-in safety interlock shutters']
    },
    {
      id: 'panelBoards',
      category: 'electrical',
      name: t.items.panelBoards.name,
      desc: t.items.panelBoards.desc,
      icon: iconsMap.panelBoards,
      specs: lang === 'ar' 
        ? ['لوحات توزيع فرعية ورئيسية مخصصة', 'متوافقة مع أنظمة الفولتية المحلية والشبكة', 'حافلات نحاسية مصنفة للأحمال']
        : ['Sub-main and main distribution panels', 'Factory-assembled custom structures', 'Fully rated copper busbar systems']
    },
    {
      id: 'circuitBreakers',
      category: 'electrical',
      name: t.items.circuitBreakers.name,
      desc: t.items.circuitBreakers.desc,
      icon: iconsMap.circuitBreakers,
      specs: lang === 'ar' 
        ? ['قواطع MCB صغيرة حماية للأحمال', 'قواطع MCCB مصبوبة للأعمال الكبرى', 'قواطع ACB هوائية رئيسية للغرف والمحطات']
        : ['Miniature Circuit Breakers (MCB)', 'Molded Case Circuit Breakers (MCCB)', 'Air Circuit Breakers (ACB) for mains']
    },
    {
      id: 'safetySwitches',
      category: 'electrical',
      name: t.items.safetySwitches.name,
      desc: t.items.safetySwitches.desc,
      icon: iconsMap.safetySwitches,
      specs: lang === 'ar' 
        ? ['مفاتيح فصل أمان مغلقة للأحمال عازلة', 'خيارات حماية قابلة للدمج بصمامات فيوز', 'تصنيف فولطية وتيار أحمال شديد التحمل']
        : ['Enclosed load break isolation switches', 'Fusible and non-fusible options', 'Heavy-duty horsepower ratings']
    },
    {
      id: 'isolators',
      category: 'electrical',
      name: t.items.isolators.name,
      desc: t.items.isolators.desc,
      icon: iconsMap.isolators,
      specs: lang === 'ar' 
        ? ['مفاتيح عازلة دوارة مقاومة للأمطار IP66', 'مقاومة للأشعة فوق البنفسجية والحرارة الخارجية', 'مقابض قفل أمان بثقوب متعددة للقفل']
        : ['IP66 weatherproof rotary isolators', 'UV-resistant and flame-retardant casing', 'Padlockable handles for safety tagout']
    },
    {
      id: 'transformers',
      category: 'electrical',
      name: t.items.transformers.name,
      desc: t.items.transformers.desc,
      icon: iconsMap.transformers,
      specs: lang === 'ar' 
        ? ['محولات جافة معزولة بالراتنج المسبوك', 'أنظمة تبريد طبيعية وجبرية مع مؤشرات حرارة', 'خسائر طاقة منخفضة للغاية وكفاءة عالية']
        : ['Cast resin dry-type transformers', 'Natural and forced-air cooling options', 'Low-loss core for optimal efficiency']
    },
    {
      id: 'electricalTools',
      category: 'electrical',
      name: t.items.electricalTools.name,
      desc: t.items.electricalTools.desc,
      icon: iconsMap.electricalTools,
      specs: lang === 'ar' 
        ? ['زراديات ومفكات معزولة معتمدة 1000V VDE', 'أجهزة اختبار جهد رقمية وأجهزة ملتيميتر', 'أدوات كبس نهايات الكابلات هيدروليكية']
        : ['1000V VDE-certified insulated hand tools', 'Digital voltage testers and multimeters', 'Hydraulic cable crimpers and cutters']
    },
    {
      id: 'enclosures',
      category: 'electrical',
      name: t.items.enclosures.name,
      desc: t.items.enclosures.desc,
      icon: iconsMap.enclosures,
      specs: lang === 'ar' 
        ? ['صناديق فولاذية مقاومة للصدأ SS316', 'خزائن بوليستر معززة بالألياف GRP', 'حشوات إحكام غلق رغوية مانعة لتسرب الأتربة والماء']
        : ['SS316 marine-grade stainless steel cabinets', 'Fiberglass-reinforced polyester (GRP)', 'Polyurethane foam gasket sealing']
    },
    {
      id: 'junctionBoxes',
      category: 'electrical',
      name: t.items.junctionBoxes.name,
      desc: t.items.junctionBoxes.desc,
      icon: iconsMap.junctionBoxes,
      specs: lang === 'ar' 
        ? ['علب تفريغ ووصلات طرفية سريعة الموصل', 'مقاومة عالية للحرائق والاشتعال الذاتي', 'سدادات وأطواق مطاطية مانعة لتسرب الرطوبة والماء']
        : ['Terminal enclosures with quick-connect blocks', 'Flame-retardant and self-extinguishing material', 'Threaded knockouts with rubber grommets']
    },
    {
      id: 'plumbing',
      category: 'mechanical',
      name: t.items.plumbing.name,
      desc: t.items.plumbing.desc,
      icon: iconsMap.plumbing,
      specs: lang === 'ar' 
        ? ['أنابيب PPR حرارية مقاومة للمواد الكيماوية والحرارة', 'أنابيب PEX مرنة لتمديدات المياه تحت البلاط والأسقف', 'مشابك وصمامات بوابات ومحابس نحاسية ثقيلة']
        : ['Chemical-resistant PPR pipe networks', 'Flexible PEX tubing for distribution manifolds', 'High-pressure brass ball and gate valves']
    },
    {
      id: 'sanitary',
      category: 'mechanical',
      name: t.items.sanitary.name,
      desc: t.items.sanitary.desc,
      icon: iconsMap.sanitary,
      specs: lang === 'ar' 
        ? ['صمامات تدفق مياه ذكية وموفرة للمياه الاستهلاكية', 'خلاطات وصنابير كروم نحاسية مطلية مقاومة للبقع', 'قطع حمامات خزفية عالية المتانة للمطارات والمدارس']
        : ['Water-saving sensor flush valves', 'Heavy chrome-plated commercial faucets', 'Vitreous china sanitary ware for public utility']
    }
  ];

  // Mouse move handler for card radial glow
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Filter products based on active tab and search query
  const filteredProducts = productsList.filter(p => {
    const matchesCategory = filter === 'all' || p.category === filter;
    const matchesSearch = searchQuery 
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.desc.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="py-24 bg-canvas-soft border-t border-glass-border select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="caption-mono text-accent-blue mb-3 block">
            {t.badge}
          </span>
          <h2 className="display-lg text-ink">
            {t.headline}
          </h2>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex justify-center mb-10">
          <div className="p-1 glass-panel rounded-full flex gap-1 bg-glass-border/10">
            {[
              { id: 'all', label: lang === 'ar' ? 'الكل' : 'All Solutions' },
              { id: 'electrical', label: t.electricalTitle },
              { id: 'mechanical', label: t.mechanicalTitle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all focus:outline-none ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-accent-blue to-accent-cyan text-white shadow-sm'
                    : 'text-body hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Clear Indicator */}
        {searchQuery && (
          <div className="mb-6 text-center text-xs font-mono text-body flex items-center justify-center gap-2">
            <span>
              {lang === 'ar' ? `نتائج البحث عن: "${searchQuery}"` : `Showing search results for: "${searchQuery}"`}
            </span>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-accent-blue underline hover:text-accent-cyan"
            >
              {lang === 'ar' ? 'مسح البحث' : 'Clear Search'}
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredProducts.map((prod, index) => (
              <motion.div
                layout
                key={prod.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
                onMouseMove={handleCardMouseMove}
                className="glow-card p-5 glass-panel rounded-xl flex flex-col justify-between h-[230px] group cursor-default"
                id={`products-${prod.id}`}
              >
                <div>
                  {/* Card header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-lg bg-glass-border/40 flex items-center justify-center border border-glass-border shadow-sm group-hover:scale-105 transition-transform">
                      {prod.icon}
                    </div>
                    <span className="text-[10px] font-mono text-mute uppercase tracking-widest">
                      {prod.category}
                    </span>
                  </div>
                  {/* Title & Description */}
                  <h3 className="text-xs font-bold text-ink mb-1 group-hover:text-accent-cyan transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-[11px] text-body leading-relaxed line-clamp-3">
                    {prod.desc}
                  </p>
                </div>

                {/* Card CTA Actions */}
                <div className="mt-4 flex justify-between items-center z-10">
                  <button 
                    onClick={() => setSelectedProduct(prod)}
                    className="text-[10px] font-extrabold uppercase tracking-widest text-accent-blue hover:text-accent-cyan transition-colors flex items-center gap-1 focus:outline-none"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {t.learnMore}
                  </button>
                  <a 
                    href="#contact"
                    className="px-3.5 py-1.5 rounded-full border border-glass-border bg-canvas/30 hover:bg-glass-border/50 text-[10px] font-bold text-ink transition-colors"
                  >
                    {t.contactSales}
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state for search failure */}
        {filteredProducts.length === 0 && (
          <div className="p-12 glass-panel rounded-2xl text-center max-w-md mx-auto">
            <p className="text-body font-mono text-xs">
              {lang === 'ar' ? 'عذرًا، لم يتم العثور على أي منتج يطابق معايير البحث.' : 'No products match your search query.'}
            </p>
          </div>
        )}

        {/* Detail Specifications Modal View */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Blur backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 bg-[#070a0e]/60 backdrop-blur-sm"
              />

              {/* Modal window */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-md w-full glass-panel p-6 rounded-2xl shadow-2xl z-10 text-ink border-t border-t-accent-cyan/35"
              >
                {/* Close modal */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-glass-border/30 text-body hover:text-ink transition-colors focus:outline-none"
                  aria-label="Close details modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal header details */}
                <div className="flex items-center gap-3 mb-5 mt-2">
                  <div className="w-12 h-12 rounded-xl bg-glass-border/40 flex items-center justify-center border border-glass-border shadow-sm flex-shrink-0">
                    {selectedProduct.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-mute uppercase tracking-widest block mb-0.5">
                      {selectedProduct.category} range
                    </span>
                    <h4 className="text-sm font-bold">{selectedProduct.name}</h4>
                  </div>
                </div>

                {/* Description details */}
                <p className="text-xs text-body leading-relaxed mb-6">
                  {selectedProduct.desc}
                </p>

                {/* Spec Points list */}
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-mute mb-2.5 font-mono">
                  {lang === 'ar' ? 'المواصفات الفنية المعتمدة' : 'Technical Specifications'}
                </h5>
                <ul className="space-y-2 mb-8">
                  {selectedProduct.specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-1.5 flex-shrink-0" />
                      <span className="text-body leading-tight">{spec}</span>
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <a
                    href={`https://wa.me/966138576662?text=${encodeURIComponent(
                      lang === 'ar' 
                        ? `مرحباً تكامل الحلول، أود الاستفسار عن شراء / تفاصيل المنتج: ${selectedProduct.name}`
                        : `Hello Takamul Solutions, I am interested in buying / getting more details about the product: ${selectedProduct.name}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-cyan text-white text-xs font-semibold text-center hover:opacity-95 flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    {lang === 'ar' ? 'طلب تسعيرة عبر الواتساب' : 'Inquire via WhatsApp'}
                  </a>
                  <a
                    href={`mailto:info@takamul.sa?subject=${encodeURIComponent(
                      lang === 'ar' ? `استفسار عن منتج: ${selectedProduct.name}` : `Product Inquiry: ${selectedProduct.name}`
                    )}&body=${encodeURIComponent(
                      lang === 'ar'
                        ? `مرحباً تكامل الحلول،\n\nأرغب في الحصول على تفاصيل إضافية / طلب عرض سعر لمنتج: ${selectedProduct.name}.`
                        : `Hello Takamul Solutions,\n\nI would like to request a quote / more details regarding the product: ${selectedProduct.name}.`
                    )}`}
                    className="px-4 py-2.5 rounded-xl border border-glass-border hover:bg-glass-border/30 text-ink text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-4 h-4 text-accent-cyan" />
                    {lang === 'ar' ? 'إرسال بريد' : 'Email Us'}
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
export default ProductShowcase;
