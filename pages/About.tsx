import React from 'react';
import { Reveal, Button } from '../components/UI';

const About: React.FC = () => {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Intro Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
          <div className="md:col-span-5">
             <Reveal>
               <div className="aspect-[3/4] bg-stone-200 overflow-hidden">
                 <img src='/public/DSC03121.jpg' alt="Mehdi Alouani" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
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
                   hello@mehdi-alouani.com
                 </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="border-t border-charcoal/10 my-20"></div>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          <div className="space-y-12">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-charcoal">Start a Project</h2>
              <p className="text-charcoal/60 max-w-md mb-8">
                Ready to elevate your property's visual presence? Fill out the form or reach out directly via email or WhatsApp.
              </p>
              
              <div className="space-y-6">
                <a href="mailto:hello@mehdi-alouani.com" className="block text-xl hover:text-gold transition-colors font-serif border-b border-charcoal/10 pb-4">
                  hello@mehdi-alouani.com
                </a>
                <a href="https://wa.me/66812345678" className="block text-xl hover:text-gold transition-colors font-serif border-b border-charcoal/10 pb-4">
                  +66 81 234 5678 (WhatsApp)
                </a>
                <a href="#" className="block text-xl hover:text-gold transition-colors font-serif border-b border-charcoal/10 pb-4">
                  @mehdixaln
                </a>
              </div>
            </Reveal>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-sm border border-charcoal/5">
            <Reveal delay={0.3}>
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold">Name</label>
                    <input type="text" id="name" className="w-full border-b border-charcoal/20 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent text-sm" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold">Email</label>
                    <input type="email" id="email" className="w-full border-b border-charcoal/20 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent text-sm" placeholder="john@hotel.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="hotel" className="text-[10px] uppercase tracking-widest font-bold">Hotel / Brand</label>
                  <input type="text" id="hotel" className="w-full border-b border-charcoal/20 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent text-sm" placeholder="The Grand Hotel" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                    <label htmlFor="dates" className="text-[10px] uppercase tracking-widest font-bold">Desired Dates</label>
                    <input type="text" id="dates" className="w-full border-b border-charcoal/20 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent text-sm" placeholder="October 2024" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="budget" className="text-[10px] uppercase tracking-widest font-bold">Budget Range</label>
                    <select id="budget" className="w-full border-b border-charcoal/20 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent text-sm">
                      <option>$1.5k - $3k</option>
                      <option>$3k - $5k</option>
                      <option>$5k - $10k</option>
                      <option>$10k+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold">Project Goals</label>
                  <textarea id="message" rows={4} className="w-full border-b border-charcoal/20 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent text-sm" placeholder="Tell me about what you need..."></textarea>
                </div>

                <div className="pt-4">
                   <Button className="w-full justify-center">Send Request</Button>
                </div>
                
                <p className="text-[10px] text-charcoal/40 text-center">
                  Typically respond within 24 hours.
                </p>
              </form>
            </Reveal>
          </div>

        </div>
      </div>
    </main>
  );
};

export default About;
