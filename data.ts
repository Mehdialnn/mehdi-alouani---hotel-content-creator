import { Project, Testimonial } from './types';

export interface PortfolioItem {
  id: string;
  image: string;
  title: string;
  location: string;
  size: 'normal' | 'tall' | 'wide';
  quote?: {
    text: string;
    author: string;
  };
}

// Portfolio grid - 9 images (3 rows of 3)
// Position 3 in each block (index 2, 5, 8) is the BIG image
export const portfolioGrid: PortfolioItem[] = [
  // Block 1: Small, Small, BIG (Telegraphenamt DSC04339)
  {
    id: 'the-retreat-1',
    image: '/theretreat/1.jpg',
    title: 'The Retreat',
    location: 'Koh Chang',
    size: 'tall',
  },
  {
    id: 'baan-tuk-din-1',
    image: '/baantukdin/8.jpg',
    title: 'Baan Tuk Din',
    location: 'Bangkok',
    size: 'tall',
  },
  {
    id: 'botanica-1',
    image: '/botanica/DSC04626.jpg',
    title: 'Riad Botanica',
    location: 'Marrakech',
    size: 'tall',
  },
  {
    id: 'telegraphenamt-1',
    image: '/telegraphenamt/DSC04339.jpg',
    title: 'Hotel Telegraphenamt',
    location: 'Berlin',
    size: 'tall',
  },
  // Block 2: Small, Small, BIG (Malkata DSC04995)
  {
    id: 'sea-containers-1',
    image: '/seacontainer/DSC03952.jpg',
    title: 'Sea Containers',
    location: 'London',
    size: 'tall',
  },
  {
    id: 'casa-amarilla-1',
    image: '/casaamarilla/DSC01432.jpg',
    title: 'La Casa Amarilla',
    location: 'Tenerife',
    size: 'tall',
  },
  {
    id: 'malkata-1',
    image: '/malkata/DSC04995.jpg',
    title: 'Malkata House',
    location: 'Luxor',
    size: 'tall',
  },
  // Block 3: Small, Small, BIG (Riad Botanica DSC04626)
  {
    id: 'prince-park-1',
    image: '/princepark/DSC02798.jpg',
    title: 'Prince Park Tower',
    location: 'Tokyo',
    size: 'tall',
  },
  {
    id: 'kheirredine-1',
    image: '/kherredine/DSC01676.jpg',
    title: 'Riad Kheirredine',
    location: 'Marrakech',
    size: 'tall',
  },
];

export const projects: Project[] = [
  {
    id: 'the-retreat',
    name: 'The Retreat',
    category: 'Resort',
    location: 'Koh Chang',
    year: '2026',
    deliverables: ['Interior Photography', 'Lifestyle'],
    heroImage: '/theretreat/1.jpg',
    gallery: [
      '/theretreat/4.jpg',
      '/theretreat/5.jpg',
      '/theretreat/8.jpg',
    ],
    description: 'A serene escape nestled in the tropical paradise of Koh Samui.',
    challenge: 'Capturing the tranquil atmosphere and seamless indoor-outdoor living.',
    approach: 'Emphasizing natural light and the lush surroundings to convey a sense of peaceful retreat.',
    result: 'A visual story that embodies relaxation and tropical luxury.',
  },
  {
    id: 'baan-tuk-din',
    name: 'Baan Tuk Din',
    category: 'Boutique',
    location: 'Bangkok',
    year: '2024',
    deliverables: ['Interior Photography', 'Detail Studies'],
    heroImage: '/baantukdin/8.jpg',
    gallery: [
      '/baantukdin/4.jpg',
      '/baantukdin/6.jpg',
      '/baantukdin/3.jpg',
    ],
    description: 'A masterclass in antique curation and moody lighting in the heart of Bangkok\'s old town.',
    challenge: 'Preserving the deep shadows and rich textures of the antique wood without losing detail.',
    approach: 'We leaned into the darkness, using natural light to carve out the vintage furniture pieces.',
    result: 'A visual diary that emphasizes the hotel\'s timeless, lived-in atmosphere.',
    testimonial: {
      author: 'Owner',
      role: 'Director',
      quote: 'Mehdi captures the silence of the space.',
    },
  },
  {
    id: 'telegraphenamt',
    name: 'Hotel Telegraphenamt',
    category: 'Heritage',
    location: 'Berlin',
    year: '2023',
    deliverables: ['Interior Stills', 'Social Reels'],
    heroImage: '/telegraphenamt/DSC04118.jpg',
    gallery: [
      '/telegraphenamt/DSC04186.jpg',
      '/telegraphenamt/DSC04320.jpg',
      '/telegraphenamt/DSC04339.jpg',
    ],
    description: 'Historical grandeur meets modern Berlin cool in this restored telegraph office.',
    challenge: 'Capturing the immense scale of the lobby while keeping the images intimate.',
    approach: 'Vertical compositions that highlight the ceiling height and architectural details.',
    result: 'Used for their 2023 global brand campaign.',
  },
  {
    id: 'malkata-house',
    name: 'Malkata House',
    category: 'Resort',
    location: 'Luxor',
    year: '2023',
    deliverables: ['Exterior Photography', 'Atmosphere'],
    heroImage: '/malkata/DSC04995.jpg',
    gallery: [
      '/malkata/DSC05065.jpg',
      '/malkata/DSC05072.jpg',
      '/malkata/DSC05114.jpg',
    ],
    description: 'A sanctuary on the banks of the Nile, built from earth and tradition.',
    challenge: 'The harsh desert sun required careful timing to find softness.',
    approach: 'Shooting at dawn and dusk to capture the warm hues of the mud-brick architecture.',
    result: 'Featured on The Hotels Diary.',
  },
  {
    id: 'riad-botanica',
    name: 'Riad Botanica',
    category: 'Boutique',
    location: 'Marrakech',
    year: '2022',
    deliverables: ['Social Media Refresh'],
    heroImage: '/botanica/DSC04626.jpg',
    gallery: [
      '/botanica/DSC04576.jpg',
      '/botanica/DSC04531.jpg',
      '/botanica/DSC04697.jpg',
    ],
    description: 'A verdant oasis hidden within the chaotic medina.',
    challenge: 'Balancing the intricate tile patterns with the organic forms of the plants.',
    approach: 'Focusing on the interplay of green and geometry.',
    result: 'Defined their Instagram aesthetic for the year.',
  },
  {
    id: 'sea-containers',
    name: 'Sea Containers',
    category: 'Chain',
    location: 'London',
    year: '2022',
    deliverables: ['F&B Photography', 'Lifestyle'],
    heroImage: '/seacontainer/DSC03952.jpg',
    gallery: [
      '/seacontainer/DSC03937.jpg',
      '/seacontainer/DSC03963.jpg',
      '/seacontainer/DSC04014.jpg',
    ],
    description: 'Modern luxury on the Thames.',
    challenge: 'Working within a busy, operating hotel without disturbing guests.',
    approach: 'Quick, precise shooting using available light to maintain authenticity.',
    result: 'Updated F&B imagery for their new menu launch.',
  },
  {
    id: 'casa-amarilla',
    name: 'La Casa Amarilla',
    category: 'Boutique',
    location: 'Tenerife',
    year: '2024',
    deliverables: ['Interior Photography', 'Lifestyle'],
    heroImage: '/casaamarilla/DSC01432.jpg',
    gallery: [
      '/casaamarilla/DSC01436.jpg',
      '/casaamarilla/DSC01443.jpg',
      '/casaamarilla/DSC01584.jpg',
    ],
    description: 'A vibrant boutique escape bathed in Canarian sunlight.',
    challenge: 'Capturing the warmth and character of the yellow façade in varying light conditions.',
    approach: 'Working with the natural golden hour light to enhance the property\'s signature color.',
    result: 'A fresh visual identity for their rebranding campaign.',
  },
  {
    id: 'prince-park',
    name: 'Prince Park Tower',
    category: 'Chain',
    location: 'Tokyo',
    year: '2024',
    deliverables: ['Interior Stills', 'Architecture'],
    heroImage: '/princepark/DSC02798.jpg',
    gallery: [
      '/princepark/DSC03153.jpg',
      '/princepark/DSC03143.jpg',
      '/princepark/DSC03132.jpg',
    ],
    description: 'Elegant sophistication overlooking Tokyo Tower.',
    challenge: 'Balancing the iconic city views with the refined interior spaces.',
    approach: 'Capturing the interplay between the hotel\'s modern luxury and Tokyo\'s urban landscape.',
    result: 'Updated imagery for their premium suite collection.',
  },
  {
    id: 'riad-kheirredine',
    name: 'Riad Kheirredine',
    category: 'Boutique',
    location: 'Marrakech',
    year: '2023',
    deliverables: ['Interior Photography', 'Detail Studies'],
    heroImage: '/kherredine/DSC01676.jpg',
    gallery: [
      '/kherredine/DSC01969.jpg',
      '/kherredine/DSC02128.jpg',
      '/kherredine/DSC02138.jpg',
    ],
    description: 'Traditional Moroccan craftsmanship meets contemporary comfort.',
    challenge: 'Highlighting the intricate zellige tilework and carved plaster details.',
    approach: 'Using soft, diffused light to reveal the textures and patterns of traditional artisanship.',
    result: 'A comprehensive visual library showcasing the riad\'s authentic character.',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    hotel: 'Hotel Telegraphenamt',
    author: 'Marketing Director',
    role: 'Marketing',
    location: 'Berlin',
    quote: 'The visuals captured the identity of Telegraphenamt with precision. Strong creative eye and a very smooth collaboration.',
  },
  {
    id: '2',
    hotel: 'Malkata House',
    author: 'Owner',
    role: 'Owner',
    location: 'Luxor',
    quote: 'He captured the character and atmosphere of the house beautifully, with great sensitivity to detail.',
  },
  {
    id: '3',
    hotel: 'Prince Park Tower',
    author: 'Marketing Team',
    role: 'Marketing',
    location: 'Tokyo',
    quote: 'The content performed very well and resonated strongly with our audience.',
  },
];
