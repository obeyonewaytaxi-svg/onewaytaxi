import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Phone } from 'lucide-react';
import { siteConfig, waLink } from '../../config/site';
import WhatsAppIcon from '../icons/WhatsAppIcon';

const FloatingActions = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 420);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={waLink('Hello Obey One Way Taxi, I would like to book a taxi.')}
        target="_blank"
        rel="noreferrer"
        className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-lg shadow-[#25d366]/25 transition-all duration-200 hover:scale-110 hover:shadow-xl"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inline-flex h-12 w-12 animate-ping rounded-xl bg-[#25D366] opacity-20" />
        <WhatsAppIcon className="h-5 w-5" />
      </a>
      <a
        href={`tel:${siteConfig.phone}`}
        className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-secondary text-slate-900 shadow-lg shadow-brand-secondary/25 transition-all duration-200 hover:scale-110 hover:shadow-xl"
        aria-label="Call now"
      >
        <Phone className="h-5 w-5" />
      </a>
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-400/15 transition-all duration-200 hover:scale-110 hover:shadow-xl"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActions;
