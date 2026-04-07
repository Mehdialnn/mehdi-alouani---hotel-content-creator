import React from 'react';
import { Reveal } from '../components/UI';

const About: React.FC = () => {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
          <div className="md:col-span-5">
            <Reveal>
              <div className="aspect-[3/4] bg-stone-200 overflow-hidden">
                <img src='/DSC03121.JPG' alt="Mehdi Alouani" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-7 flex flex-col justify-end">
            <Reveal delay={0.2}>
              <h1 className="text-5xl md:text-8xl font-serif mb-8 text-charcoal leading-[0.9]">
                Mehdi <br/><span className="italic text-charcoal/60">Alouani</span>
              </h1>
              <p className="text-sm uppercase tracking-widest text-charcoal/50 mb-8">
                Hotel photographer & content creator.
              </p>
              <div className="space-y-6 text-lg md:text-xl font-light text-charcoal/80 max-w-2xl leading-relaxed">
                <p>
                  I work with boutique and design-led hotels to translate their unique atmosphere into visual assets for websites, booking platforms, and brand communication.
                </p>
                <p>
                  My approach is rooted in the belief that hotels are not just buildings, but stages for human experience — where light, space, and service define how a place is remembered.
                </p>
                <p>
                  Available for commissions worldwide.
                </p>
              </div>
              <div className="mt-12 flex gap-12 text-xs uppercase tracking-[0.2em] opacity-60">
                <div>
                  <span className="block font-bold mb-2">Location</span>
                  Paris, France
                </div>
                <div>
                  <span className="block font-bold mb-2">Direct Contact</span>
                  hello@mavisuals.co
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
