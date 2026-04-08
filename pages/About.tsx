import React from 'react';
import { Reveal, Button } from '../components/UI';

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
          <div className="md:col-span-7 flex flex-col justify-start">
            <Reveal delay={0.2}>
              <h1 className="text-5xl md:text-8xl font-serif mb-8 text-charcoal leading-[0.9]">
                About <span className="italic text-charcoal/60">Me</span>
              </h1>
              <p className="text-sm uppercase tracking-widest text-charcoal/50 mb-8">
                Hotel photographer & content creator.
              </p>
              <div className="space-y-6 text-lg md:text-base font-light text-charcoal/80 max-w-2xl leading-relaxed">
                <p>
                  I'm Mehdi, a visual content creator working with boutique hotels, design-led stays, and travel brands. I help translate on-site atmosphere into visual stories that feel bookable online.
                </p>
                <p>
                  My work sits between editorial travel imagery and hotel marketing, with a focus on clean compositions, natural light, and the details guests actually remember.
                </p>
                <p>
                  I started by refining how I shoot and edit for social platforms, learning what makes people stop scrolling and picture themselves in a place. Today, I use that experience to build visual libraries for websites, OTAs, and social channels.
                </p>
                <p>
                  Based in Europe, I travel regularly for projects. If you're working on a new opening or looking to elevate your visuals, let's talk.
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

        <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-32 border-t border-charcoal/10 pt-12 md:pt-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-serif mb-8">Ready to work together?</h2>
            <Button to="/contact" variant="primary">Start a project</Button>
          </Reveal>
        </div>
      </div>
    </main>
  );
};

export default About;
