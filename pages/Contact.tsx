import React from 'react';
import { Reveal, Button } from '../components/UI';

const Contact: React.FC = () => {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <div className="space-y-12">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-serif mb-6 text-charcoal">Let's Create Together</h1>
            <p className="text-xl font-light text-charcoal/60 max-w-md">
              Ready to elevate your property's visual presence? Fill out the form or reach out directly.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-8">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-charcoal/40 mb-2">Email</h3>
                <a href="mailto:hello@mehdi-alouani.com" className="text-2xl font-serif hover:text-gold transition-colors">hello@mehdi-alouani.com</a>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-charcoal/40 mb-2">WhatsApp</h3>
                <a href="#" className="text-2xl font-serif hover:text-gold transition-colors">+66 81 234 5678</a>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-charcoal/40 mb-2">Social</h3>
                <a href="#" className="text-2xl font-serif hover:text-gold transition-colors">@thehotelsdiary</a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <div className="bg-white p-8 md:p-12 shadow-sm border border-charcoal/5">
          <Reveal delay={0.3}>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest font-bold">Name</label>
                  <input type="text" id="name" className="w-full border-b border-charcoal/20 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest font-bold">Email</label>
                  <input type="email" id="email" className="w-full border-b border-charcoal/20 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent" placeholder="john@hotel.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="hotel" className="text-xs uppercase tracking-widest font-bold">Hotel / Brand</label>
                <input type="text" id="hotel" className="w-full border-b border-charcoal/20 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent" placeholder="The Grand Hotel" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                  <label htmlFor="dates" className="text-xs uppercase tracking-widest font-bold">Desired Dates</label>
                  <input type="text" id="dates" className="w-full border-b border-charcoal/20 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent" placeholder="October 2024" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-xs uppercase tracking-widest font-bold">Budget Range</label>
                  <select id="budget" className="w-full border-b border-charcoal/20 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent">
                    <option>$1.5k - $3k</option>
                    <option>$3k - $5k</option>
                    <option>$5k - $10k</option>
                    <option>$10k+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest font-bold">Project Goals</label>
                <textarea id="message" rows={4} className="w-full border-b border-charcoal/20 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent" placeholder="Tell me about what you need..."></textarea>
              </div>

              <div className="pt-4">
                 <Button className="w-full justify-center">Send Request</Button>
              </div>
              
              <p className="text-[10px] text-charcoal/40 text-center">
                Your data is secure. I respect your privacy and will only use this info to reply to your inquiry.
              </p>
            </form>
          </Reveal>
        </div>

      </div>
    </main>
  );
};

export default Contact;
