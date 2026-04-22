import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Instagram } from 'lucide-react';
import { Reveal } from '../components/UI';
import { projects } from '../data';
import { Link } from 'react-router-dom';

// Preload a single image and resolve when decoded (or errored).
// Decoupled so we can await individual slides instead of the whole set.
const preloadImage = (src: string): Promise<void> =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // don't block on 404s
    img.src = src;
  });

const SimpleCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstSlideReady, setFirstSlideReady] = useState(false);

  // Create pairs of images from the same hotel.
  // Memoized so we don't rebuild the array on every render and bust the preload effect.
  const hotelSlides = useMemo(
    () =>
      projects.map((project) => ({
        name: project.name,
        location: project.location,
        image1: project.heroImage,
        image2: project.gallery[0],
      })),
    []
  );

  // CHANGED: only preload the first slide before revealing the carousel,
  // then lazy-preload each next slide one tick ahead of rotation.
  // Previously this waited for ALL 24 images before anything rendered.
  useEffect(() => {
    let cancelled = false;
    const first = hotelSlides[0];
    Promise.all([preloadImage(first.image1), preloadImage(first.image2)]).then(() => {
      if (!cancelled) setFirstSlideReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [hotelSlides]);

  // Preload the NEXT slide whenever currentIndex changes — keeps ahead of the timer,
  // without the 24-image upfront cost.
  useEffect(() => {
    const nextIdx = (currentIndex + 1) % hotelSlides.length;
    const next = hotelSlides[nextIdx];
    preloadImage(next.image1);
    preloadImage(next.image2);
  }, [currentIndex, hotelSlides]);

  useEffect(() => {
    if (!firstSlideReady) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hotelSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [hotelSlides.length, firstSlideReady]);

  const currentSlide = hotelSlides[currentIndex];

  return (
    <div className="w-full h-full bg-charcoal overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 flex w-full h-full"
        >
          {/* Left image — eager on first slide for LCP, async decode */}
          <div className="w-1/2 h-full border-r border-white/5 relative group">
            <img
              src={currentSlide.image1}
              alt={currentSlide.name}
              className="w-full h-full object-cover"
              loading={currentIndex === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          {/* Right image */}
          <div className="w-1/2 h-full relative group">
            <img
              src={currentSlide.image2}
              alt={currentSlide.name}
              className="w-full h-full object-cover"
              loading={currentIndex === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Hotel name overlay */}
      <div className="absolute bottom-8 left-8 z-20">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-sand text-lg md:text-xl font-serif">{currentSlide.name}</h3>
          <p className="text-sand/50 text-xs uppercase tracking-widest">{currentSlide.location}</p>
        </motion.div>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 bg-black/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-mono tracking-widest z-20 border border-white/10">
        {String(currentIndex + 1).padStart(2, '0')} / {String(hotelSlides.length).padStart(2, '0')}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [logoHovered, setLogoHovered] = useState(false);
  return (
    <main className="h-screen w-screen overflow-hidden bg-sand text-charcoal flex flex-col-reverse md:flex-row">

      {/* LEFT PANEL: Static Info */}
      <aside className="w-full md:w-[40%] lg:w-[35%] h-[45%] md:h-full flex flex-col justify-between p-6 md:p-12 lg:p-16 border-r border-charcoal/5 relative z-10 bg-sand">

        {/* Header / Logo */}
        <div>
          <Reveal>
            <h1
              className="text-5xl md:text-6xl font-serif font-medium tracking-tighter leading-none mb-2 flex items-baseline overflow-hidden cursor-default"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <span>M</span>
              <motion.span
                animate={{ width: logoHovered ? 'auto' : 0, opacity: logoHovered ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden inline-block whitespace-nowrap"
              >
                ehdi
              </motion.span>
              <span className="text-charcoal/40">A</span>
              <motion.span
                animate={{ width: logoHovered ? 'auto' : 0, opacity: logoHovered ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden inline-block whitespace-nowrap italic text-charcoal/40"
              >
                louani
              </motion.span>
              <motion.span
                animate={{ width: logoHovered ? 0 : 'auto', opacity: logoHovered ? 0 : 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden inline-block whitespace-nowrap italic relative"
              >
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 italic text-charcoal"
                    style={{ clipPath: 'inset(0 0 50% 0)' }}
                  >
                    &nbsp;Visuals
                  </span>
                  <span
                    className="italic text-charcoal/40"
                    style={{ clipPath: 'inset(50% 0 0 0)' }}
                  >
                    &nbsp;Visuals
                  </span>
                </span>
              </motion.span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/60 mt-4">
              Paris Based — Working Worldwide
            </p>
          </Reveal>
        </div>

        {/* Introduction */}
        <div className="flex flex-col gap-6 justify-center">
          <Reveal delay={0.2}>
            <p className="text-sm md:text-base font-light leading-7 text-charcoal/80 max-w-sm">
              Hotel photography & content, focused on atmosphere.
            </p>
            <p className="text-sm md:text-base font-light leading-7 text-charcoal/60 max-w-sm mt-3">
              Capturing the silence of heritage hotels, the texture of design, and the dignity of service — to drive direct bookings and elevate brand perception.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col items-start gap-4 mt-10">
              <Link to="/contact" className="group flex items-center gap-3 px-6 py-3 bg-charcoal text-sand text-xs uppercase tracking-[0.2em] font-medium hover:bg-charcoal/90 transition-all">
                Request Availability
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/work" className="group flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-medium text-charcoal/60 hover:text-charcoal transition-all">
                View Selected Work
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Footer / Socials */}
        <div>
          <Reveal delay={0.4}>
            <a
              href="https://instagram.com/mehdixaln"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-charcoal/40 hover:text-charcoal transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-widest">@mehdixaln</span>
            </a>
            <p className="text-[9px] uppercase tracking-widest text-charcoal/30 mt-6">
              © {new Date().getFullYear()} Mehdi Alouani
            </p>
          </Reveal>
        </div>
      </aside>

      {/* RIGHT PANEL: Carousel */}
      <section className="w-full md:w-[60%] lg:w-[65%] h-[55%] md:h-full relative bg-charcoal">
        <SimpleCarousel />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_10px_0_20px_-10px_rgba(0,0,0,0.1)]" />
      </section>

    </main>
  );
};

export default Home;
