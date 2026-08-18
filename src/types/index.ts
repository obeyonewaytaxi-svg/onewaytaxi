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
  name: string;
  location: string;
  route: string;
  rating: number;
  quote: string;
  date: string;
};

export type BlogPost = {
  slug: string;
  title: string;
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
