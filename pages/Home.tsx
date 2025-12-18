import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Instagram } from 'lucide-react';
import { Reveal } from '../components/UI';
import { projects } from '../data';
import { Link } from 'react-router-dom';

const SimpleCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Create pairs of images from the same hotel
  // Each slide shows heroImage + first gallery image from the same project
  const hotelSlides = projects.map(project => ({
    name: project.name,
    location: project.location,
    image1: project.heroImage,
    image2: project.gallery[0], // First gallery image
  }));

  // Preload all images on mount
  useEffect(() => {
    const imageUrls = hotelSlides.flatMap(slide => [slide.image1, slide.image2]);
    let loadedCount = 0;

    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setIsLoaded(true);
        }
      };
      img.src = url;
    });
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hotelSlides.length);
    }, 4000); // Change slide every 4s
    return () => clearInterval(timer);
  }, [hotelSlides.length, isLoaded]);

  const currentSlide = hotelSlides[currentIndex];

  return (
    <div className="w-full h-full bg-charcoal overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 flex w-full h-full"
        >
          {/* Left Image */}
          <div className="w-1/2 h-full border-r border-white/5 relative group">
            <img
              src={currentSlide.image1}
              alt={currentSlide.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          {/* Right Image */}
          <div className="w-1/2 h-full relative group">
            <img
              src={currentSlide.image2}
              alt={currentSlide.name}
              className="w-full h-full object-cover"
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
  return (
    <main className="h-screen w-screen overflow-hidden bg-sand text-charcoal flex flex-col-reverse md:flex-row">
      
      {/* LEFT PANEL: Static Info (40% width) */}
      <aside className="w-full md:w-[40%] lg:w-[35%] h-[45%] md:h-full flex flex-col justify-between p-6 md:p-12 lg:p-16 border-r border-charcoal/5 relative z-10 bg-sand">
        
        {/* Header / Logo */}
        <div>
          <Reveal>
            <h1 className="text-5xl md:text-6xl font-serif font-medium tracking-tighter leading-none mb-2">
              Mehdi<span className="text-charcoal/40 italic">Alouani</span>
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
            <div className="flex flex-col items-start gap-4 mt-4">
              {/* Primary CTA */}
              <Link to="/contact" className="group flex items-center gap-3 px-6 py-3 bg-charcoal text-sand text-xs uppercase tracking-[0.2em] font-medium hover:bg-charcoal/90 transition-all">
                Request Availability
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </Link>
              {/* Secondary links */}
              <Link to="/work" className="group flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-medium text-charcoal/60 hover:text-charcoal transition-all">
                View Selected Work
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/services" className="group flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-medium text-charcoal/60 hover:text-charcoal transition-all">
                Services & Starting Rates
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Footer / Socials */}
        <div>
          <Reveal delay={0.4}>
            <a href="https://instagram.com/mehdixaln" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-charcoal/40 hover:text-charcoal transition-colors">
              <Instagram className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-widest">@mehdixaln</span>
            </a>
            <p className="text-[9px] uppercase tracking-widest text-charcoal/30 mt-6">
              © {new Date().getFullYear()} Mehdi Alouani
            </p>
          </Reveal>
        </div>
      </aside>

      {/* RIGHT PANEL: Side-by-Side Portrait Carousel (60% width) */}
      <section className="w-full md:w-[60%] lg:w-[65%] h-[55%] md:h-full relative bg-charcoal">
        <SimpleCarousel />
        
        {/* Optional: Simple Overlay Text on the Carousel side? 
            Usually kept clean for this style, but we can add a subtle gradient */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_10px_0_20px_-10px_rgba(0,0,0,0.1)]" />
      </section>

    </main>
  );
};

export default Home;