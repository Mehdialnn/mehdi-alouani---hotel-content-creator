import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// ---------------------------------------------------------------------------
// SmartImage — responsive <picture> with AVIF/WebP and srcset.
//
// Expects a CDN that accepts URL params for format + width. The default
// `buildVariant` below targets Cloudinary's URL API (`/image/upload/f_avif,w_800/...`)
// and falls back to the original `src` if it can't pattern-match. Swap
// `buildVariant` to match whichever CDN you end up on (imgix, Cloudflare
// Images, Vercel image optimizer, etc.).
//
// If you haven't set up a CDN yet, pass `raw` to opt-out of variants — the
// component still emits `loading`, `decoding`, and `sizes` which are the
// cheapest perf wins.
// ---------------------------------------------------------------------------

type Variant = { src: string; width: number };

const DEFAULT_WIDTHS = [400, 800, 1200, 1920, 2560];

// Default builder — rewrites `/theretreat/1.jpg` into the sibling variants
// produced by scripts/generate-image-variants.mjs (AVIF + WebP at 5 widths).
// If no match, returns the original so nothing 404s.
//
// Example outputs for format='avif', width=1200:
//   /theretreat/1.jpg  ->  /theretreat/1-1200w.avif
//   /botanica/DSC04626.JPG -> /botanica/DSC04626-1200w.avif
function defaultBuildVariant(src: string, width: number, format: 'avif' | 'webp' | 'jpg'): string {
  // Cloudinary (kept for future-proofing — triggers only on matching paths).
  if (src.includes('/image/upload/')) {
    return src.replace('/image/upload/', `/image/upload/f_auto,q_auto,w_${width}/`);
  }
  // Local JPEG/PNG — swap extension for the pre-generated sibling.
  // `jpg` fallback keeps the original untouched so the <img src> still resolves.
  if (format === 'jpg') return src;
  const m = src.match(/^(.*)\.(jpe?g|png)$/i);
  if (m) return `${m[1]}-${width}w.${format}`;
  return src;
}

export const SmartImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  sizes?: string;            // e.g. "(min-width: 1024px) 50vw, 100vw"
  widths?: number[];
  priority?: boolean;        // true for above-the-fold hero; skips lazy-load
  raw?: boolean;             // opt out of CDN variants (local file, already optimized, etc.)
  buildVariant?: (src: string, width: number, format: 'avif' | 'webp' | 'jpg') => string;
  draggable?: boolean;
  style?: React.CSSProperties;
}> = ({
  src,
  alt,
  className = '',
  sizes = '100vw',
  widths = DEFAULT_WIDTHS,
  priority = false,
  raw = false,
  buildVariant = defaultBuildVariant,
  draggable,
  style,
}) => {
  const makeSet = (format: 'avif' | 'webp' | 'jpg'): string | undefined => {
    if (raw) return undefined;
    const variants: Variant[] = widths.map((w) => ({
      src: buildVariant(src, w, format),
      width: w,
    }));
    // If the builder returned the same string for every width, we have no CDN —
    // skip the srcset entirely rather than shipping a useless list.
    const allSame = variants.every((v) => v.src === src);
    if (allSame) return undefined;
    return variants.map((v) => `${v.src} ${v.width}w`).join(', ');
  };

  // Pre-generated siblings: emit both AVIF and WebP sources; the <img> src
  // stays as the original JPEG as a final fallback.
  const avifSet = makeSet('avif');
  const webpSet = makeSet('webp');
  const jpgSet = makeSet('jpg');

  return (
    <picture>
      {avifSet && <source type="image/avif" srcSet={avifSet} sizes={sizes} />}
      {webpSet && <source type="image/webp" srcSet={webpSet} sizes={sizes} />}
      <img
        src={src}
        srcSet={jpgSet}
        sizes={sizes}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        draggable={draggable}
        style={style}
      />
    </picture>
  );
};

// ---------------------------------------------------------------------------
// Avatar — typeset initials in a disc. Replaces picsum.photos placeholders.
// If/when you add real client headshots, pass `src`; otherwise it renders
// initials on a muted stone background. No more random stock faces next to
// real testimonials.
// ---------------------------------------------------------------------------

export const Avatar: React.FC<{
  name: string;
  src?: string;
  size?: number;
  className?: string;
}> = ({ name, src, size = 40, className = '' }) => {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  const dimension = `${size}px`;
  if (src) {
    return (
      <div
        className={`rounded-full overflow-hidden bg-stone-200 ${className}`}
        style={{ width: dimension, height: dimension }}
      >
        <img src={src} alt={name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`rounded-full flex items-center justify-center bg-charcoal/5 border border-charcoal/10 text-charcoal/70 font-serif ${className}`}
      style={{ width: dimension, height: dimension, fontSize: size * 0.38 }}
      title={name}
    >
      {initials || '·'}
    </div>
  );
};

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
        {/* SmartImage: AVIF/WebP via <picture>, responsive srcset, lazy by default */}
        <SmartImage
          src={image}
          alt={title}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
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
