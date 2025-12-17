export interface Project {
  id: string;
  name: string;
  category: 'City' | 'Beach' | 'Resort' | 'Heritage' | 'Chain' | 'Boutique';
  location: string;
  year: string;
  deliverables: string[];
  heroImage: string;
  gallery: string[];
  description: string;
  challenge: string;
  approach: string;
  result: string;
  beforeAfter?: {
    before: string;
    after: string;
  };
  testimonial?: {
    author: string;
    role: string;
    quote: string;
  };
}

export interface Testimonial {
  id: string;
  hotel: string;
  author: string;
  role: string;
  location: string;
  quote: string;
  avatar?: string;
}

export interface ServicePackage {
  title: string;
  description: string;
  price: string;
  deliverables: string[];
  timeline: string;
  rights: string;
}
