import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { projects } from '../data';
import { Button, Reveal, BeforeAfter, Avatar, SmartImage } from '../components/UI';
import { ArrowLeft, Check } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return <Navigate to="/collaborations" />;

  return (
    <main className="min-h-screen pb-20 bg-sand">
      {/* Editorial Hero */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* SmartImage w/ priority for LCP. Emits AVIF/WebP srcset via <picture>. */}
        <SmartImage
          src={project.heroImage}
          alt={project.name}
          priority
          sizes="100vw"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 pb-24">
          <Reveal>
             <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
               <h1 className="text-6xl md:text-[10vw] leading-[0.85] font-serif text-white mix-blend-difference">
                 {project.name}
               </h1>
               <div className="text-white mix-blend-difference mb-2 md:mb-6">
                 <p className="text-lg font-light italic">{project.location}</p>
                 <p className="text-xs uppercase tracking-widest mt-2 opacity-80">{project.year} — {project.category}</p>
               </div>
             </div>
          </Reveal>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Metadata Sidebar */}
          <div className="lg:col-span-3">
             <div className="sticky top-32 space-y-12">
               <Button variant="outline" to="/collaborations" className="mb-8 w-full">
                 <ArrowLeft className="w-3 h-3" /> Back
               </Button>

               <div>
                 <h3 className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-6 border-b border-charcoal/10 pb-2">Scope</h3>
                 <ul className="space-y-3">
                   {project.deliverables.map(item => (
                     <li key={item} className="text-sm text-charcoal/80 font-medium">
                       {item}
                     </li>
                   ))}
                 </ul>
               </div>

               <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-6 border-b border-charcoal/10 pb-2">Location</h3>
                  <p className="text-xl font-serif text-charcoal">{project.location}</p>
               </div>
             </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            
            {/* Intro Text */}
            <div className="mb-32 max-w-3xl">
               <Reveal>
                  <p className="text-2xl md:text-4xl font-serif leading-tight text-charcoal mb-12">
                    {project.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-12 text-sm leading-relaxed text-charcoal/70">
                    <div>
                      <strong className="block text-charcoal text-xs uppercase tracking-widest mb-2">Challenge</strong>
                      {project.challenge}
                    </div>
                    <div>
                      <strong className="block text-charcoal text-xs uppercase tracking-widest mb-2">Approach</strong>
                      {project.approach}
                    </div>
                  </div>
               </Reveal>
            </div>

            {/* Gallery Layout - Mixed Aspect Ratios */}
            <div className="space-y-24">
              {project.gallery.map((img, idx) => (
                <Reveal key={idx} delay={0.1}>
                  <div className={`relative ${idx % 2 === 0 ? 'w-full aspect-video' : 'w-[80%] aspect-[4/5] ml-auto'}`}>
                    <SmartImage
                      src={img}
                      alt={`Gallery ${idx}`}
                      sizes="(min-width: 1024px) 66vw, 100vw"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    <span className="absolute -bottom-8 left-0 text-[10px] uppercase tracking-widest text-charcoal/30">Figure 0{idx + 1}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Before / After Section */}
            {project.beforeAfter && (
              <div className="mt-32">
                <Reveal>
                  <div className="mb-8 flex justify-between items-end">
                    <h3 className="text-3xl font-serif">Retouching Process</h3>
                    <p className="text-xs uppercase tracking-widest text-charcoal/40">Interactive Comparison</p>
                  </div>
                  <BeforeAfter before={project.beforeAfter.before} after={project.beforeAfter.after} />
                </Reveal>
              </div>
            )}

            {/* Result / Testimonial */}
            <div className="mt-32 border-t border-charcoal py-24">
               <Reveal>
                 <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-4 text-gold">Outcome</h4>
                      <p className="text-3xl font-serif text-charcoal mb-8">{project.result}</p>
                      <Button to="/contact">Inquire Similar</Button>
                    </div>
                    
                    {project.testimonial && (
                       <div className="bg-white p-12 relative shadow-sm">
                         <span className="text-6xl text-charcoal/10 font-serif absolute top-4 left-4">“</span>
                         <p className="italic text-lg text-charcoal/80 mb-6 relative z-10">"{project.testimonial.quote}"</p>
                         <div className="flex items-center gap-4">
                           {/* CHANGED: typeset initials instead of random picsum stock avatar.
                               Avoids shipping a stock face next to a real client quote — the
                               single biggest credibility leak in the previous version. Pass
                               a real headshot src to <Avatar> when/if one exists. */}
                           <Avatar name={project.testimonial.author} size={40} />
                           <div>
                             <p className="text-xs font-bold uppercase tracking-wider">{project.testimonial.author}</p>
                             <p className="text-[10px] text-charcoal/50">{project.testimonial.role}</p>
                           </div>
                         </div>
                       </div>
                    )}
                 </div>
               </Reveal>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetail;
