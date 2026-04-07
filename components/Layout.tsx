import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Mail } from 'lucide-react';
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
  const [logoHovered, setLogoHovered] = useState(false);
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
    { name: 'Contact', path: '/contact' },
  ];

  // Dynamic header styles - on mobile home, always use solid background
  const headerBg = isHome && !isScrolled ? 'bg-transparent md:bg-transparent border-transparent' : 'bg-sand/90 backdrop-blur-sm border-charcoal/5';
  const textColor = isHome && !isScrolled && !isOpen ? 'text-charcoal md:text-sand hover:text-charcoal/70 md:hover:text-white' : 'text-charcoal hover:text-charcoal/70';
  const logoColor = isHome && !isScrolled && !isOpen ? 'text-charcoal md:text-sand' : 'text-charcoal';

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${headerBg}`}>
      <div className="px-6 md:px-12 h-24 flex items-center justify-between">
        <NavLink
          to="/"
          className={`text-2xl font-serif font-medium tracking-tight transition-colors z-50 relative flex items-baseline overflow-hidden ${logoColor}`}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          {/* M */}
          <span>M</span>

          {/* "ehdi" slides in on hover */}
          <motion.span
            animate={{ width: logoHovered ? 'auto' : 0, opacity: logoHovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden inline-block whitespace-nowrap"
          >
            ehdi
          </motion.span>

          {/* A - always muted grey */}
          <span className={isHome && !isScrolled && !isOpen ? 'text-charcoal/40 md:text-sand/40' : 'text-charcoal/40'}>A</span>

          {/* "louani" slides in on hover, italic muted */}
          <motion.span
            animate={{ width: logoHovered ? 'auto' : 0, opacity: logoHovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`overflow-hidden inline-block whitespace-nowrap italic ${isHome && !isScrolled && !isOpen ? 'text-charcoal/40 md:text-sand/40' : 'text-charcoal/40'}`}
          >
            louani
          </motion.span>

          {/* "Visuals" slides out on hover — top half full color, bottom half muted */}
          <motion.span
            animate={{ width: logoHovered ? 0 : 'auto', opacity: logoHovered ? 0 : 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden inline-block whitespace-nowrap italic relative"
          >
            <span className="relative inline-block">
              {/* top half */}
              <span
                aria-hidden="true"
                className={`absolute inset-0 italic ${isHome && !isScrolled && !isOpen ? 'text-charcoal md:text-sand' : 'text-charcoal'}`}
                style={{ clipPath: 'inset(0 0 50% 0)' }}
              >
                &nbsp;Visuals
              </span>
              {/* bottom half */}
              <span
                className={`italic ${isHome && !isScrolled && !isOpen ? 'text-charcoal/40 md:text-sand/40' : 'text-charcoal/40'}`}
                style={{ clipPath: 'inset(50% 0 0 0)' }}
              >
                &nbsp;Visuals
              </span>
            </span>
          </motion.span>
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
  <footer className="bg-charcoal text-sand pt-16 md:pt-32 pb-8 md:pb-12 px-6 md:px-12 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />

    <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-24 mb-12 md:mb-32">
      <div className="col-span-2 lg:col-span-5">
         <h2 className="text-3xl md:text-7xl lg:text-8xl font-serif leading-[0.9] mb-6 md:mb-12">
           Let's plan your <span className="italic text-stone-400">next shoot</span>.
         </h2>
         <a
           href="mailto:hello@mavisuals.co"
           className="inline-block text-base md:text-2xl border-b border-sand/30 pb-1 hover:text-stone-300 hover:border-sand transition-all duration-300"
         >
           hello@mavisuals.co
         </a>
         <p className="text-xs md:text-sm text-sand/40 mt-2 md:mt-3">Typically replying within 24 hours</p>
      </div>

      <div className="col-span-1 lg:col-span-3 lg:col-start-7">
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-sand/40 mb-4 md:mb-6">Socials</h3>
          <ul className="space-y-3 md:space-y-4">
            <li><a href="https://instagram.com/mehdixaln" target="_blank" rel="noopener noreferrer" className="hover:text-stone-400 transition-colors text-sm md:text-base">@mehdixaln</a></li>
          </ul>
        </div>
      </div>

      <div className="col-span-1 lg:col-span-3">
         <div>
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-sand/40 mb-4 md:mb-6">Menu</h3>
          <ul className="space-y-3 md:space-y-4 text-sm md:text-base">
            <li><NavLink to="/work" className="hover:text-stone-400 transition-colors">Work</NavLink></li>
            <li><NavLink to="/services" className="hover:text-stone-400 transition-colors">Services</NavLink></li>
            <li><NavLink to="/about" className="hover:text-stone-400 transition-colors">About</NavLink></li>
          </ul>
        </div>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/10 pt-6 md:pt-8 text-[10px] uppercase tracking-widest text-sand/40">
      <div className="flex flex-col gap-2">
        <span>Contact</span>
        <a href="mailto:hello@mavisuals.co" className="hover:text-sand transition-colors">hello@mavisuals.co</a>
        <div className="flex gap-4 mt-1">
          <a href="https://instagram.com/mehdixaln" target="_blank" rel="noopener noreferrer" className="hover:text-sand transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="mailto:hello@mavisuals.co" className="hover:text-sand transition-colors">
            <Mail className="w-3 h-3" />
          </a>
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex flex-col gap-1 md:gap-2 md:items-end">
      <span>Copyright</span>
        <span>© {new Date().getFullYear()} Mehdi Alouani</span>
        <span>Paris, France</span>
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
