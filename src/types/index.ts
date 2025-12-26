// Types for the home services marketplace

export type ServiceCategory = "ac" | "electrical" | "plumbing" | "cleaning" | "salon";

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  shortDescription: string;
  startingPrice: number;
  rating: number;
  reviewCount: number;
  duration: string;
  includedServices: string[];
  addOns: { name: string; price: number }[];
  faqs: { question: string; answer: string }[];
  image?: string;
}

export interface Professional {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  jobsCompleted: number;
  badges: ("verified" | "top_rated" | "experienced")[];
  specializations: ServiceCategory[];
  yearsExperience: number;
}

export interface Booking {
  id: string;
  service: Service;
  professional?: Professional;
  status: "requested" | "accepted" | "on_the_way" | "completed" | "cancelled";
  date: string;
  timeSlot: string;
  address: {
    flat: string;
    street: string;
    city: string;
    pincode: string;
  };
  notes?: string;
  totalAmount: number;
  createdAt: string;
  review?: {
    rating: number;
    comment: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "customer" | "provider";
  avatar?: string;
}

export interface JobRequest {
  id: string;
  booking: Booking;
  estimatedEarnings: number;
}

export interface Earnings {
  total: number;
  lastSevenDays: number;
  completedJobs: {
    id: string;
    serviceName: string;
    date: string;
    amount: number;
  }[];
}

export const cities = ["Delhi", "Mumbai", "Bangalore"] as const;
export type City = typeof cities[number];

export const categoryLabels: Record<ServiceCategory, string> = {
  ac: "AC Repair",
  electrical: "Electrician",
  plumbing: "Plumber",
  cleaning: "Home Cleaning",
  salon: "Salon at Home",
};

export const categoryDescriptions: Record<ServiceCategory, string> = {
  ac: "AC installation, repair & maintenance",
  electrical: "Electrical repairs & installations",
  plumbing: "Plumbing repairs & installations",
  cleaning: "Deep cleaning & regular cleaning",
  salon: "Salon services at your doorstep",
};

export const categoryPrices: Record<ServiceCategory, number> = {
  ac: 299,
  electrical: 199,
  plumbing: 149,
  cleaning: 599,
  salon: 399,
};
