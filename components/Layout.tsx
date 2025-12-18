import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Instagram, Mail, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const GrainOverlay: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-multiply">
    <div 
      className="absolute inset-0 bg-repeat"
      style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  </div>
);

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Work', path: '/work' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
  ];

  // Dynamic header styles - on mobile home, always use solid background
  const headerBg = isHome && !isScrolled ? 'bg-transparent md:bg-transparent border-transparent' : 'bg-sand/90 backdrop-blur-sm border-charcoal/5';
  const textColor = isHome && !isScrolled && !isOpen ? 'text-charcoal md:text-sand hover:text-charcoal/70 md:hover:text-white' : 'text-charcoal hover:text-charcoal/70';
  const logoColor = isHome && !isScrolled && !isOpen ? 'text-charcoal md:text-sand' : 'text-charcoal';

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${headerBg}`}>
      <div className="px-6 md:px-12 h-24 flex items-center justify-between">
        <NavLink to="/" className={`text-2xl font-serif font-medium tracking-tight transition-colors z-50 relative ${logoColor}`}>
          Mehdi Alouani
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-12">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative group ${textColor} ${
                  isActive ? 'font-bold' : ''
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.name}</span>
                  <span className={`absolute -bottom-2 left-0 w-full h-[1px] transform origin-left transition-transform duration-300 ${isHome && !isScrolled ? 'bg-sand' : 'bg-charcoal'} ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button className={`md:hidden z-50 p-2 ${logoColor}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6 text-charcoal" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
              animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
              exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 right-0 bg-sand h-screen flex flex-col items-center justify-center space-y-8 md:hidden z-40"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="text-5xl font-serif text-charcoal hover:italic transition-all duration-300"
                >
                  {item.name}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => (
  <footer className="bg-charcoal text-sand pt-32 pb-12 px-6 md:px-12 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
    
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
      <div className="lg:col-span-5">
         <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.9] mb-12">
           Let's plan your <span className="italic text-stone-400">next shoot</span>.
         </h2>
         <a
           href="mailto:mehdialouanipro@gmail.com"
           className="inline-block text-xl md:text-2xl border-b border-sand/30 pb-1 hover:text-stone-300 hover:border-sand transition-all duration-300"
         >
           mehdialouanipro@gmail.com
         </a>
         <p className="text-sm text-sand/40 mt-3">Typically replying within 24 hours</p>
      </div>

      <div className="lg:col-span-3 lg:col-start-7 space-y-12">
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-sand/40 mb-6">Socials</h3>
          <ul className="space-y-4">
            <li><a href="https://instagram.com/mehdixaln" target="_blank" rel="noopener noreferrer" className="hover:text-stone-400 transition-colors">@mehdixaln</a></li>

          </ul>
        </div>
      </div>
      
      <div className="lg:col-span-3 space-y-12">
         <div>
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-sand/40 mb-6">Menu</h3>
          <ul className="space-y-4">
            <li><NavLink to="/work" className="hover:text-stone-400 transition-colors">Work</NavLink></li>
            <li><NavLink to="/services" className="hover:text-stone-400 transition-colors">Services</NavLink></li>
            <li><NavLink to="/about" className="hover:text-stone-400 transition-colors">About</NavLink></li>
          </ul>
        </div>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8 text-[10px] uppercase tracking-widest text-sand/40">
      <div className="flex flex-col gap-2">
        <span>© {new Date().getFullYear()} Mehdi Alouani</span>
        <span>Paris, France</span>
      </div>
      <div className="mt-8 md:mt-0 flex gap-8">
        <a href="#" className="hover:text-sand">Privacy</a>
        <a href="#" className="hover:text-sand">Legal</a>
        <a href="#" className="hover:text-sand">Credits</a>
      </div>
    </div>
  </footer>
);

export const FloatingCTA: React.FC = () => (
  <motion.div 
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 2 }}
    className="fixed bottom-8 right-8 z-30"
  >
    <a 
      href="/about" 
      className="group bg-charcoal text-sand h-16 w-16 md:h-20 md:w-20 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer border border-sand/10"
    >
      <span className="absolute text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity bg-sand text-charcoal px-2 py-1 -top-8 rounded">Book</span>
      <Mail className="w-5 h-5 md:w-6 md:h-6" />
    </a>
  </motion.div>
);
