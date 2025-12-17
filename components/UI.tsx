import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Button: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline';
  to?: string;
  onClick?: () => void;
  className?: string;
}> = ({ children, variant = 'primary', to, onClick, className = '' }) => {
  
  // Sharper corners, slightly bolder border
  const baseStyle = "inline-flex items-center justify-center gap-3 px-8 py-4 text-[10px] uppercase tracking-[0.25em] transition-all duration-300 border border-charcoal font-medium relative overflow-hidden group";
  
  const variants = {
    primary: "bg-charcoal text-sand hover:text-charcoal hover:bg-transparent",
    secondary: "bg-sand text-charcoal hover:bg-charcoal hover:text-sand",
    outline: "bg-transparent text-charcoal hover:bg-charcoal hover:text-sand",
  };

  const content = (
    <span className="relative z-10 flex items-center gap-2">
      {children}
    </span>
  );

  // Hover fill effect background
  const fill = (
    <div className={`absolute inset-0 bg-current transition-transform duration-300 origin-bottom-left transform scale-x-0 group-hover:scale-x-100 ${variant === 'primary' ? 'text-sand' : (variant === 'secondary' ? 'text-charcoal' : 'text-charcoal')}`} style={{ zIndex: 0, opacity: 0.1 }} />
  );

  if (to) {
    return (
      <Link to={to} className={`${baseStyle} ${variants[variant]} ${className}`}>
        {fill}
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {fill}
      {content}
    </button>
  );
};

export const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export const ProjectCard: React.FC<{
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
}> = ({ id, title, category, location, image }) => {
  return (
    <Link to={`/collaborations/${id}`} className="block group relative">
      <div className="relative overflow-hidden aspect-[3/4] bg-stone-200">
        <motion.img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
      </div>
      <div className="mt-6 flex justify-between items-end border-b border-charcoal/10 pb-4 group-hover:border-charcoal/40 transition-colors">
        <div>
          <h3 className="text-2xl font-serif text-charcoal">{title}</h3>
          <p className="text-[10px] text-charcoal/60 uppercase tracking-widest mt-1">{location}</p>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-charcoal/40 group-hover:text-charcoal transition-colors">
          {category}
        </span>
      </div>
    </Link>
  );
};

export const BeforeAfter: React.FC<{ before: string; after: string }> = ({ before, after }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const position = ((x - rect.left) / rect.width) * 100;

    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/9] overflow-hidden cursor-ew-resize select-none touch-none grayscale hover:grayscale-0 transition-all duration-700"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleMove}
    >
      <img 
        src={after} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-cover" 
        draggable="false"
      />
      
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={before} 
          alt="Before" 
          className="absolute inset-0 w-full h-full max-w-none object-cover"
          style={{ width: containerRef.current?.offsetWidth }}
          draggable="false"
        />
      </div>

      <div 
        className="absolute top-0 bottom-0 w-[1px] bg-white/50 z-10 backdrop-blur-md"
        style={{ left: `${sliderPosition}%` }}
      />
      
      <div className="absolute top-4 left-4 text-white text-[10px] uppercase tracking-widest mix-blend-difference">Original</div>
      <div className="absolute top-4 right-4 text-white text-[10px] uppercase tracking-widest mix-blend-difference">Retouched</div>
    </div>
  );
};
