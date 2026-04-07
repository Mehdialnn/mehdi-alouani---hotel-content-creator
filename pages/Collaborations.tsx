import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioGrid, testimonials, projects } from '../data';
import { Reveal, Button } from '../components/UI';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

// --- TYPES ---
interface ImageSliderProps {
  hotelId: string;
  defaultImage: string;
  title: string;
  location: string;
  isTall?: boolean;
}

// --- COMPONENT: Image Slider with arrows ---
const ImageSlider: React.FC<ImageSliderProps> = ({ hotelId, defaultImage, title, location, isTall = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Find the project that matches this hotel to get all its images
  const project = projects.find(p => {
    const projectName = p.name.toLowerCase();
    const cardTitle = title.toLowerCase();
    return projectName === cardTitle;
  });

  // Build array of all images - start with the defaultImage from the grid, then add project gallery
  // This ensures each card shows its unique default image first
  const allImages = project
    ? [defaultImage, ...project.gallery.filter(img => img !== defaultImage)]
    : [defaultImage];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  return (
    <div className={`relative group overflow-hidden ${isTall ? 'h-full min-h-[300px] md:min-h-full' : 'aspect-[4/5] md:aspect-[3/4]'}`}>
      <img
        src={allImages[currentIndex]}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Single arrow on right - loops through images */}
      {allImages.length > 1 && (
        <button
          onClick={nextImage}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hover:opacity-100 text-white drop-shadow-lg"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      )}

      {/* Hotel info overlay - always visible on mobile (smaller), hover on desktop */}
      <div className={`absolute bottom-2 md:bottom-6 left-2 md:left-6 right-10 md:right-6 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 flex justify-between items-end text-white`}>
        <div>
          <h3 className={`font-serif ${isTall ? 'text-sm md:text-3xl' : 'text-xs md:text-2xl'} italic`}>{title}</h3>
          <p className="text-[7px] md:text-[10px] uppercase tracking-widest opacity-70 md:opacity-80 mt-0.5 md:mt-1">{location}</p>
        </div>
        <ArrowUpRight className={`hidden md:block ${isTall ? 'w-5 h-5' : 'w-4 h-4'}`} />
      </div>
    </div>
  );
};

// --- TYPES ---
interface StaggeredBlockProps {
  images: { id: string; image: string; title: string; location: string }[];
  quote: { text: string; author: string } | null;
  reversed?: boolean;
}

// --- COMPONENT: Single Staggered Block ---
const StaggeredBlock: React.FC<StaggeredBlockProps> = ({ images, quote, reversed = false }) => {
  const [img1, img2, img3] = images;

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-24"
    >
      {/* --- COLUMN A: The Split Column (2 Images + Quote) --- */}
      <div className={`col-span-1 md:col-span-2 grid grid-cols-2 gap-6 ${reversed ? 'order-2' : 'order-1'}`}>

        {/* Small Image 1 */}
        {img1 && (
          <motion.div variants={itemVars} className="col-span-1">
            <ImageSlider
              hotelId={img1.id}
              defaultImage={img1.image}
              title={img1.title}
              location={img1.location}
            />
          </motion.div>
        )}

        {/* Small Image 2 */}
        {img2 && (
          <motion.div variants={itemVars} className="col-span-1">
            <ImageSlider
              hotelId={img2.id}
              defaultImage={img2.image}
              title={img2.title}
              location={img2.location}
            />
          </motion.div>
        )}

        {/* Testimonial (Spans 2 columns) - reduced height */}
        <motion.div variants={itemVars} className="col-span-2 bg-white border border-charcoal/5 p-6 md:p-8 flex flex-col justify-center text-center relative">
          {quote ? (
            <>
              <span className="text-3xl text-charcoal/10 font-serif absolute top-3 left-4">"</span>
              <p className="text-base md:text-lg font-serif text-charcoal italic mb-4 leading-relaxed">
                {quote.text}
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-charcoal/40">
                — {quote.author}
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h3 className="text-xl font-serif text-charcoal/20">Atmosphere & Detail</h3>
            </div>
          )}
        </motion.div>
      </div>

      {/* --- COLUMN B: The Tall Image Column --- */}
      {img3 && (
        <motion.div
          variants={itemVars}
          className={`col-span-1 ${reversed ? 'order-1' : 'order-2'}`}
        >
          <ImageSlider
            hotelId={img3.id}
            defaultImage={img3.image}
            title={img3.title}
            location={img3.location}
            isTall
          />
        </motion.div>
      )}
    </motion.div>
  );
};

// --- MAIN PAGE COMPONENT ---
const Collaborations: React.FC = () => {

  const organizedBlocks = useMemo(() => {
    const allImages = portfolioGrid.filter(item => item.image);

    const blocks = [];
    let imgIdx = 0;

    while (imgIdx < allImages.length) {
      const blockImages = allImages.slice(imgIdx, imgIdx + 3);

      const testimonialIdx = Math.floor(imgIdx / 3);
      const testimonial = testimonials[testimonialIdx % testimonials.length];

      const blockQuote = {
        text: testimonial.quote,
        author: `${testimonial.author}, ${testimonial.hotel}`
      };

      if (blockImages.length > 0) {
        blocks.push({
          id: `block-${imgIdx}`,
          images: blockImages,
          quote: blockQuote
        });
      }

      imgIdx += 3;
    }
    return blocks;
  }, []);

  return (
    <main className="min-h-screen bg-sand pt-32 px-4 md:px-12 pb-20 text-charcoal">
      <div className="max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-charcoal/10 pb-8">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-serif leading-[0.9] tracking-tight">
              Visual <span className="italic text-charcoal/50">Diaries</span>
            </h1>
          </Reveal>
        </div>

        {/* Staggered Blocks Render Loop */}
        <div className="flex flex-col gap-12">
          {organizedBlocks.map((block, index) => (
            <StaggeredBlock
              key={block.id}
              images={block.images}
              quote={block.quote}
              reversed={index % 2 !== 0}
            />
          ))}
        </div>

        {/* Footer / Contact */}
        <div className="mt-16 md:mt-32 border-t border-charcoal/10 pt-12 md:pt-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-serif mb-8">Not sure what you need?</h2>
            <Button to="/contact" variant="primary">Discuss your project</Button>
          </Reveal>
        </div>

      </div>
    </main>
  );
};

export default Collaborations;
