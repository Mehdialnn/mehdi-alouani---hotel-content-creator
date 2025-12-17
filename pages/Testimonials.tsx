import React from 'react';
import { testimonials } from '../data';
import { Reveal } from '../components/UI';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 text-charcoal">Client Words</h1>
          <p className="text-xl font-light text-charcoal/60 max-w-2xl mb-20">
            Relationships built on trust, discretion, and results.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {testimonials.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.1}>
              <div className="bg-white p-8 md:p-12 border border-charcoal/5 relative group hover:shadow-lg transition-all duration-500">
                <Quote className="absolute top-8 left-8 w-8 h-8 text-gold/20 group-hover:text-gold transition-colors" />
                <p className="font-serif text-xl md:text-2xl leading-relaxed text-charcoal/80 mb-8 pt-6 relative z-10">
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-stone-200 rounded-full overflow-hidden">
                    <img src={`https://picsum.photos/seed/${item.id}/100/100`} alt={item.author} className="w-full h-full object-cover grayscale" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide">{item.author}</h4>
                    <p className="text-xs text-charcoal/50">{item.role}, {item.hotel}</p>
                    <p className="text-[10px] text-charcoal/30 uppercase tracking-widest mt-0.5">{item.location}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Testimonials;
