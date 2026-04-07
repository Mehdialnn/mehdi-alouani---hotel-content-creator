import React, { useState } from 'react';
import { Reveal, Button } from '../components/UI';
import { motion } from 'framer-motion';

const services = ['Photography', 'Videography', 'Art Direction', 'Full Production'];

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (s: string) => {
    setSelectedServices(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    selectedServices.forEach(s => formData.append('services', s));
    try {
      const response = await fetch('https://formspree.io/f/mojaanyy', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
        setSelectedServices([]);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-sand">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

        {/* Left — image + info */}
        <div className="relative h-[50vh] md:h-screen md:sticky md:top-0">
          <img
            src="/theretreat/1.jpg"
            alt="Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/30" />
          <div className="absolute bottom-0 left-0 p-10 md:p-16 text-sand">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.3em] text-sand/60 mb-6">Please note</p>
              <p className="text-lg md:text-xl font-light leading-relaxed max-w-sm mb-12">
                I only take on a limited number of projects each year to ensure the highest level of creative focus and care.
              </p>
              <div className="space-y-4 text-[11px] uppercase tracking-[0.2em]">
                <div>
                  <span className="block text-sand/40 mb-1">Email</span>
                  <a href="mailto:hello@mavisuals.co" className="text-sand hover:text-sand/70 transition-colors">hello@mavisuals.co</a>
                </div>
                <div>
                  <span className="block text-sand/40 mb-1">Instagram</span>
                  <a href="https://instagram.com/mehdixaln" target="_blank" rel="noopener noreferrer" className="text-sand hover:text-sand/70 transition-colors">@mehdixaln</a>
                </div>
                <div>
                  <span className="block text-sand/40 mb-1">Based in</span>
                  <span className="text-sand">Paris, France</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right — form */}
        <div className="px-8 md:px-16 pt-32 pb-20">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-serif leading-[0.9] mb-4 text-charcoal">
              Start a <span className="italic text-charcoal/40">Project</span>
            </h1>
            <p className="text-sm text-charcoal/50 mb-16 max-w-sm">
              Fill out the form below and I'll get back to you within 24 hours.
            </p>
          </Reveal>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20"
            >
              <h3 className="text-3xl font-serif text-charcoal mb-4">Thank you.</h3>
              <p className="text-charcoal/60">Your message has been sent. I'll be in touch shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">

              <Reveal delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-charcoal/50">Name *</label>
                    <input type="text" id="name" name="name" required className="w-full border-b border-charcoal/20 py-3 focus:outline-none focus:border-charcoal transition-colors bg-transparent text-sm" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-charcoal/50">Email *</label>
                    <input type="email" id="email" name="email" required className="w-full border-b border-charcoal/20 py-3 focus:outline-none focus:border-charcoal transition-colors bg-transparent text-sm" placeholder="hello@hotel.com" />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="space-y-2">
                  <label htmlFor="hotel" className="text-[10px] uppercase tracking-widest text-charcoal/50">Hotel / Brand</label>
                  <input type="text" id="hotel" name="hotel" className="w-full border-b border-charcoal/20 py-3 focus:outline-none focus:border-charcoal transition-colors bg-transparent text-sm" placeholder="The Grand Hotel" />
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-widest text-charcoal/50">Services *</p>
                  <div className="flex flex-wrap gap-3">
                    {services.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleService(s)}
                        className={`px-4 py-2 text-[11px] uppercase tracking-widest border transition-all duration-200 ${
                          selectedServices.includes(s)
                            ? 'bg-charcoal text-sand border-charcoal'
                            : 'bg-transparent text-charcoal border-charcoal/20 hover:border-charcoal'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="dates" className="text-[10px] uppercase tracking-widest text-charcoal/50">Desired Dates</label>
                    <input type="text" id="dates" name="dates" className="w-full border-b border-charcoal/20 py-3 focus:outline-none focus:border-charcoal transition-colors bg-transparent text-sm" placeholder="October 2025" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="budget" className="text-[10px] uppercase tracking-widest text-charcoal/50">Budget Range *</label>
                    <select id="budget" name="budget" required className="w-full border-b border-charcoal/20 py-3 focus:outline-none focus:border-charcoal transition-colors bg-transparent text-sm appearance-none cursor-pointer">
                      <option value="" disabled>Select a range</option>
                      <option>Up to €3,000</option>
                      <option>€3,000 – €6,000</option>
                      <option>€6,000 – €9,000</option>
                      <option>€9,000 – €12,000</option>
                      <option>€12,000+</option>
                    </select>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-charcoal/50">Tell me about your project *</label>
                  <textarea id="message" name="message" required rows={5} className="w-full border-b border-charcoal/20 py-3 focus:outline-none focus:border-charcoal transition-colors bg-transparent text-sm resize-none" placeholder="Scope, goals, timeline, anything relevant..."></textarea>
                </div>
              </Reveal>

              <Reveal delay={0.35}>
                <div className="pt-4">
                  <Button className="w-full justify-center" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Submit your project'}
                  </Button>
                </div>
              </Reveal>

            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default Contact;
