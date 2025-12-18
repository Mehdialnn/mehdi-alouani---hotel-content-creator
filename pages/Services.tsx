import React from 'react';
import { motion } from 'framer-motion';
import { Reveal, Button } from '../components/UI';
import { ArrowRight, Check, Clock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- TYPES ---
interface PackageProps {
  id: number;
  title: string;
  price: string;
  description: string;
  features: string[];
  delivery: string;
  usage: string;
  isPopular?: boolean;
}

// --- DATA ---
const packages: PackageProps[] = [
  {
    id: 1,
    title: 'Content Refresh — Half Day',
    price: 'From €450',
    description: 'A precise update for key visuals. Perfect for refreshing OTA listings or key brand visuals without a full production',
    features: [
      '12–15 Retouched Images',
      '1 Location (Hotel Grounds)',
      'Key Rooms or F&B Focus',
      'Natural Light Only'
    ],
    delivery: '5 Business Days',
    usage: 'Website, OTAs & organic social channels',
  },
  {
    id: 2,
    title: 'Visual Identity — Full Day',
    price: 'From €750',
    description: 'A comprehensive visual refresh capturing the complete guest experience — atmosphere, design, and service.',
    features: [
      '20–25 Retouched Images',
      'Multiple Locations',
      'Dawn/Dusk "Hero" Shots',
      'Lifestyle & Detail Integration'
    ],
    delivery: '7 Business Days',
    usage: 'Website, OTAs & organic social channels',
    isPopular: true
  },
  {
    id: 3,
    title: 'Campaign & Editorial',
    price: 'Custom',
    description: 'Tailored storytelling for rebranding, seasonal campaigns, new openings or properties requiring elevated creative direction',
    features: [
      'Full Creative Direction',
      'Shot List Planning',
      'Video/Reels Add-ons',
      'Models & Styling'
    ],
    delivery: 'Project Dependent',
    usage: 'Full Commercial License',
  }
];

// --- COMPONENT: Service Row ---
const ServiceRow: React.FC<PackageProps> = ({ title, price, description, features, delivery, usage, isPopular }) => {
  return (
    <div className="group relative border-t border-charcoal/20 py-16 md:py-20">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        
        {/* LEFT COL: Header & Price (30%) */}
        <div className="w-full md:w-[30%] flex flex-col justify-between shrink-0">
          <div>
            {isPopular && (
              <span className="inline-block px-2 py-1 mb-4 text-[10px] uppercase tracking-widest bg-charcoal text-sand font-medium">
                Most Requested
              </span>
            )}
            <h3 className="text-3xl md:text-4xl font-serif text-charcoal mb-2">
              {title}
            </h3>
            <p className="text-xl font-light text-charcoal/60 mt-2">{price}</p>
          </div>
          
          <div className="hidden md:block mt-8">
            <Link to="/contact" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium opacity-40 group-hover:opacity-100 transition-opacity">
              Book This <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* RIGHT COL: Details (70%) */}
        <div className="w-full md:w-[70%]">
          <p className="text-lg font-light text-charcoal/80 leading-relaxed max-w-2xl mb-12">
            {description}
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 mb-12">
            {/* List of Features */}
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-charcoal/40 mb-4 font-mono">Includes</span>
              <ul className="space-y-3">
                {features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-charcoal/70">
                    <Check className="w-4 h-4 text-charcoal/30 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            <div className="space-y-8">
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-charcoal/40 mb-2 font-mono flex items-center gap-2">
                   <Clock className="w-3 h-3" /> Turnaround
                </span>
                <p className="text-sm text-charcoal/80">{delivery}</p>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-charcoal/40 mb-2 font-mono flex items-center gap-2">
                   <Globe className="w-3 h-3" /> Licensing
                </span>
                <p className="text-sm text-charcoal/80">{usage}</p>
              </div>
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="md:hidden">
             <Button variant="outline" to="/contact" className="w-full">Request Availability</Button>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- MAIN PAGE ---
const Services: React.FC = () => {
  return (
    <main className="min-h-screen bg-sand pt-32 pb-24 px-6 md:px-16 text-charcoal">
      <div className="max-w-[1600px] mx-auto">
        
        {/* HERO SECTION */}
        <div className="mb-24 md:mb-32 flex flex-col md:flex-row justify-between items-end border-b border-charcoal/10 pb-12">
          <Reveal>
            <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] tracking-tight">
              Services<br/>
              <span className="italic text-charcoal/50">& Starting Rates</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="mt-8 md:mt-0 max-w-md text-right">
              <p className="text-sm md:text-base font-light leading-relaxed text-charcoal/70">
                Built for boutique and luxury hotels that care how they look online. <br className="hidden md:block"/>
                Transparent deliverables. Simple usage rights. No hidden fees.
              </p>
            </div>
          </Reveal>
        </div>

        {/* SERVICES LIST */}
        <div className="flex flex-col">
          {packages.map((pkg, index) => (
            <Reveal key={pkg.id} delay={index * 0.1}>
              <ServiceRow {...pkg} />
            </Reveal>
          ))}
          {/* Closing Line */}
          <div className="border-t border-charcoal/20" />
        </div>

        {/* FAQ / PROCESS SECTION (Optional but adds value) */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
           <div className="md:col-span-1">
             <Reveal>
               <h3 className="text-3xl font-serif mb-4">The Process</h3>
               <p className="text-sm text-charcoal/60 leading-relaxed">
               From initial moodboard to final delivery, the workflow is designed to integrate smoothly into hotel operations while maximizing visual output.
               </p>
             </Reveal>
           </div>
           
           <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12">
              <Reveal delay={0.2}>
                <div>
                   <h4 className="font-serif text-xl mb-3">01. Scouting</h4>
                   <p className="text-xs text-charcoal/60 uppercase tracking-wider mb-2">Remote or On-site</p>
                   <p className="text-sm text-charcoal/80">We review current assets and walk through the property to identify light patterns and key architectural features before the camera comes out.</p>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div>
                   <h4 className="font-serif text-xl mb-3">02. Production</h4>
                   <p className="text-xs text-charcoal/60 uppercase tracking-wider mb-2">Low Footprint</p>
                   <p className="text-sm text-charcoal/80">Shooting with natural light and minimal equipment to ensure guests are undisturbed and the atmosphere remains authentic.</p>
                </div>
              </Reveal>
           </div>
        </div>

        {/* FINAL CTA */}
        <div className="mt-32 text-center">
          <Reveal>
             <h2 className="text-3xl md:text-5xl font-serif mb-8">Not sure what you need?</h2>
             <Button to="/contact" variant="primary">Discuss your project</Button>
          </Reveal>
        </div>

      </div>
    </main>
  );
};

export default Services;