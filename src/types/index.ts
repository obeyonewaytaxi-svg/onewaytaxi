export type Cab = {
  title: string;
  slug: string;
  rate: number;
  roundTripRate: number;
  image: string;
  capacity: string;
  luggage: string;
  model: string;
  description: string;
  details: string[];
};

export type Route = {
  name: string;
  slug: string;
  origin: string;
  destination: string;
  distanceKm: number;
  durationHours: string;
  via: string;
  popular: boolean;
  description?: string;
  directionNotes?: {
    title: string;
    paragraphs: string[];
  };
};

export type Service = {
  title: string;
  slug: string;
  seoTitle?: string;
  description: string;
  metaDescription?: string;
  longDescription: string;
  features: string[];
  icon: 'Truck' | 'MapPin' | 'Star' | 'Plane' | 'RotateCcw';
  faqs?: FaqItem[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Review = {
  // Reviewer name as shown on the source platform. Use 'Google reviewer' when the
  // platform does not show a name, rather than inventing a person.
  name: string;
  // Optional: only set when the reviewer's own review states the route / city.
  // Left undefined rather than guessed, so the site never asserts a fact the
  // customer didn't write.
  location?: string;
  route?: string;
  rating: number;
  quote: string;
  // Optional: only set when the review's date is actually known.
  date?: string;
  // Where the review was published. Drives the badge shown on the card so a
  // reader can always tell which platform a quote came from.
  source?: 'Google' | 'Justdial' | 'WhatsApp';
};

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  date: string;
  datePublished?: string;
  readTime: string;
  category: string;
  content: string[];
};

export type TripType = 'One Way' | 'Round Trip';

export type SeoProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
  jsonLd?: object | object[];
  noindex?: boolean;
};
