import { Service, Professional, Booking, ServiceCategory } from "@/types";

export const services: Service[] = [
  {
    id: "ac-general",
    name: "AC General Service & Cleaning",
    category: "ac",
    description: "Complete AC servicing including filter cleaning, gas check, cooling check, and general maintenance. Our certified technicians ensure your AC runs efficiently.",
    shortDescription: "Filter cleaning, gas check, cooling check",
    startingPrice: 499,
    rating: 4.8,
    reviewCount: 2340,
    duration: "45-60 mins",
    includedServices: [
      "Filter cleaning",
      "Condenser coil cleaning",
      "Drain pipe cleaning",
      "Gas pressure check",
      "Cooling performance check",
      "Overall inspection"
    ],
    addOns: [
      { name: "Deep cleaning", price: 299 },
      { name: "Gas refilling (R32)", price: 1499 },
      { name: "Stabilizer installation", price: 399 }
    ],
    faqs: [
      { question: "How long does AC servicing take?", answer: "Regular servicing takes 45-60 minutes per unit." },
      { question: "Do I need to be present?", answer: "Yes, someone should be present during the service." },
      { question: "What's included in general service?", answer: "Filter cleaning, gas check, cooling check, and overall inspection." }
    ]
  },
  {
    id: "ac-repair",
    name: "AC Repair & Troubleshooting",
    category: "ac",
    description: "Expert diagnosis and repair of all AC issues including cooling problems, strange noises, water leakage, and electrical faults.",
    shortDescription: "Diagnosis and repair of AC issues",
    startingPrice: 399,
    rating: 4.7,
    reviewCount: 1856,
    duration: "60-90 mins",
    includedServices: [
      "Complete diagnosis",
      "Minor repairs",
      "Electrical check",
      "Thermostat calibration",
      "Performance testing"
    ],
    addOns: [
      { name: "PCB repair", price: 999 },
      { name: "Compressor repair", price: 2499 },
      { name: "Fan motor replacement", price: 1299 }
    ],
    faqs: [
      { question: "Is diagnosis free?", answer: "Diagnosis fee of ₹399 is adjusted against repair charges." },
      { question: "Do you provide warranty?", answer: "Yes, 30-day warranty on repairs." }
    ]
  },
  {
    id: "electrical-switch",
    name: "Switch & Socket Repair",
    category: "electrical",
    description: "Professional repair and replacement of electrical switches, sockets, and switchboards.",
    shortDescription: "Switch, socket & switchboard repairs",
    startingPrice: 199,
    rating: 4.6,
    reviewCount: 3210,
    duration: "30-45 mins",
    includedServices: [
      "Switch replacement",
      "Socket repair",
      "Switchboard inspection",
      "Wiring check"
    ],
    addOns: [
      { name: "Modular switch upgrade", price: 299 },
      { name: "MCB installation", price: 449 }
    ],
    faqs: [
      { question: "Do you bring switches?", answer: "Yes, we carry common switches. Specialty items may require advance notice." }
    ]
  },
  {
    id: "electrical-fan",
    name: "Fan Installation & Repair",
    category: "electrical",
    description: "Installation, repair and maintenance of ceiling fans, exhaust fans, and table fans.",
    shortDescription: "Fan installation, repair & servicing",
    startingPrice: 249,
    rating: 4.7,
    reviewCount: 2890,
    duration: "45-60 mins",
    includedServices: [
      "Fan installation",
      "Speed regulator check",
      "Blade balancing",
      "Motor inspection"
    ],
    addOns: [
      { name: "Regulator replacement", price: 349 },
      { name: "Capacitor replacement", price: 249 }
    ],
    faqs: []
  },
  {
    id: "plumbing-leak",
    name: "Tap & Leak Repair",
    category: "plumbing",
    description: "Fix all types of leaks - taps, pipes, faucets. Quick and reliable repairs.",
    shortDescription: "Tap repair, pipe leak fixing",
    startingPrice: 149,
    rating: 4.5,
    reviewCount: 4120,
    duration: "30-60 mins",
    includedServices: [
      "Leak detection",
      "Tap repair/replacement",
      "Washer replacement",
      "Joint sealing"
    ],
    addOns: [
      { name: "Premium tap installation", price: 399 },
      { name: "Pipe replacement (per ft)", price: 149 }
    ],
    faqs: []
  },
  {
    id: "plumbing-drain",
    name: "Drain & Blockage Cleaning",
    category: "plumbing",
    description: "Clear blocked drains, sinks, and toilets. Chemical and mechanical cleaning available.",
    shortDescription: "Blocked drain & toilet cleaning",
    startingPrice: 299,
    rating: 4.4,
    reviewCount: 2340,
    duration: "45-90 mins",
    includedServices: [
      "Blockage assessment",
      "Manual cleaning",
      "Chemical treatment",
      "Flow testing"
    ],
    addOns: [
      { name: "High-pressure jet cleaning", price: 599 },
      { name: "Drain cover replacement", price: 199 }
    ],
    faqs: []
  },
  {
    id: "cleaning-deep",
    name: "Deep Home Cleaning",
    category: "cleaning",
    description: "Comprehensive deep cleaning for your entire home. Perfect for festivals or moving in/out.",
    shortDescription: "Complete home deep cleaning",
    startingPrice: 1999,
    rating: 4.8,
    reviewCount: 5670,
    duration: "4-6 hours",
    includedServices: [
      "All rooms cleaning",
      "Kitchen deep clean",
      "Bathroom scrubbing",
      "Window cleaning",
      "Floor mopping & polishing",
      "Ceiling & wall dusting"
    ],
    addOns: [
      { name: "Sofa cleaning", price: 599 },
      { name: "Carpet cleaning", price: 799 },
      { name: "Balcony cleaning", price: 399 }
    ],
    faqs: [
      { question: "How many cleaners will come?", answer: "2-3 cleaners based on home size." },
      { question: "Do you bring cleaning supplies?", answer: "Yes, we bring all necessary cleaning supplies and equipment." }
    ]
  },
  {
    id: "cleaning-bathroom",
    name: "Bathroom Deep Cleaning",
    category: "cleaning",
    description: "Intensive bathroom cleaning including tiles, fixtures, and sanitization.",
    shortDescription: "Bathroom scrubbing & sanitization",
    startingPrice: 599,
    rating: 4.7,
    reviewCount: 3450,
    duration: "1-2 hours",
    includedServices: [
      "Tile scrubbing",
      "Fixture cleaning",
      "Mirror polishing",
      "Drain cleaning",
      "Sanitization"
    ],
    addOns: [
      { name: "Grout cleaning", price: 299 },
      { name: "Anti-bacterial treatment", price: 199 }
    ],
    faqs: []
  },
  {
    id: "salon-haircut",
    name: "Women's Haircut & Styling",
    category: "salon",
    description: "Professional haircut and styling at your doorstep by expert stylists.",
    shortDescription: "Haircut, blow dry & styling",
    startingPrice: 499,
    rating: 4.9,
    reviewCount: 8920,
    duration: "45-60 mins",
    includedServices: [
      "Hair consultation",
      "Haircut",
      "Blow dry",
      "Basic styling"
    ],
    addOns: [
      { name: "Hair spa", price: 799 },
      { name: "Deep conditioning", price: 399 },
      { name: "Hair color", price: 1499 }
    ],
    faqs: []
  },
  {
    id: "salon-facial",
    name: "Facial & Cleanup",
    category: "salon",
    description: "Rejuvenating facial treatments for glowing, healthy skin.",
    shortDescription: "Facial, cleanup & skincare",
    startingPrice: 599,
    rating: 4.8,
    reviewCount: 6780,
    duration: "60-90 mins",
    includedServices: [
      "Cleansing",
      "Exfoliation",
      "Face massage",
      "Face pack",
      "Moisturizing"
    ],
    addOns: [
      { name: "Gold facial upgrade", price: 499 },
      { name: "Under-eye treatment", price: 299 }
    ],
    faqs: []
  }
];

export const professionals: Professional[] = [
  {
    id: "pro-1",
    name: "Rajesh Kumar",
    rating: 4.9,
    jobsCompleted: 2345,
    badges: ["verified", "top_rated"],
    specializations: ["ac", "electrical"],
    yearsExperience: 8
  },
  {
    id: "pro-2",
    name: "Amit Patel",
    rating: 4.8,
    jobsCompleted: 1890,
    badges: ["verified"],
    specializations: ["plumbing"],
    yearsExperience: 6
  },
  {
    id: "pro-3",
    name: "Priya Sharma",
    rating: 4.9,
    jobsCompleted: 3210,
    badges: ["verified", "top_rated", "experienced"],
    specializations: ["salon", "cleaning"],
    yearsExperience: 10
  },
  {
    id: "pro-4",
    name: "Suresh Reddy",
    rating: 4.7,
    jobsCompleted: 1456,
    badges: ["verified"],
    specializations: ["electrical", "plumbing"],
    yearsExperience: 5
  },
  {
    id: "pro-5",
    name: "Neha Verma",
    rating: 4.8,
    jobsCompleted: 2100,
    badges: ["verified", "top_rated"],
    specializations: ["cleaning"],
    yearsExperience: 7
  }
];

export const sampleBookings: Booking[] = [
  {
    id: "booking-1",
    service: services[0],
    professional: professionals[0],
    status: "completed",
    date: "2024-12-15",
    timeSlot: "10:00 AM - 11:00 AM",
    address: {
      flat: "A-123",
      street: "MG Road",
      city: "Delhi",
      pincode: "110001"
    },
    totalAmount: 799,
    createdAt: "2024-12-14T10:00:00Z",
    review: {
      rating: 5,
      comment: "Excellent service! The technician was very professional and thorough."
    }
  },
  {
    id: "booking-2",
    service: services[6],
    professional: professionals[4],
    status: "on_the_way",
    date: "2024-12-21",
    timeSlot: "2:00 PM - 6:00 PM",
    address: {
      flat: "B-456",
      street: "Park Street",
      city: "Mumbai",
      pincode: "400001"
    },
    totalAmount: 2599,
    createdAt: "2024-12-20T15:00:00Z"
  },
  {
    id: "booking-3",
    service: services[8],
    professional: professionals[2],
    status: "accepted",
    date: "2024-12-22",
    timeSlot: "11:00 AM - 12:00 PM",
    address: {
      flat: "C-789",
      street: "Brigade Road",
      city: "Bangalore",
      pincode: "560001"
    },
    totalAmount: 899,
    createdAt: "2024-12-20T18:00:00Z"
  }
];

export const testimonials = [
  {
    id: "1",
    name: "Priya Sharma",
    rating: 5,
    comment: "Excellent service! The electrician was very professional and fixed my wiring issue quickly. Highly recommend!",
    avatar: ""
  },
  {
    id: "2",
    name: "Rahul Verma",
    rating: 5,
    comment: "Booked AC servicing and the technician arrived on time. Very satisfied with the quality of work.",
    avatar: ""
  },
  {
    id: "3",
    name: "Anjali Patel",
    rating: 5,
    comment: "The home cleaning service was amazing! My house looks spotless. Will definitely book again.",
    avatar: ""
  }
];

export const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "5,000+", label: "Verified Professionals" },
  { value: "4.8★", label: "Average Rating" },
  { value: "50,000+", label: "Services Completed" }
];

export const whyChooseUs = [
  {
    title: "Verified Professionals",
    description: "All service partners are background verified and trained for quality service.",
    icon: "shield"
  },
  {
    title: "Transparent Pricing",
    description: "No hidden charges. See the exact price breakdown before you book.",
    icon: "currency"
  },
  {
    title: "On-Time Guarantee",
    description: "We value your time. Our professionals arrive on schedule or you get compensated.",
    icon: "clock"
  },
  {
    title: "24/7 Support",
    description: "Our customer support team is always available to help you with any queries.",
    icon: "headphones"
  }
];

export const faqs = [
  {
    question: "Are your professionals verified and trained?",
    answer: "Yes, all our service partners undergo thorough background verification and receive professional training. We ensure they meet our quality standards before they start accepting bookings."
  },
  {
    question: "How does pricing work?",
    answer: "Our pricing is completely transparent. You'll see the exact cost breakdown including service charges, taxes, and any applicable fees before you confirm your booking. No hidden charges."
  },
  {
    question: "Can I reschedule or cancel my booking?",
    answer: "Yes, you can reschedule or cancel your booking up to 2 hours before the scheduled time. Cancellations made within 2 hours may incur a small cancellation fee."
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer: "Customer satisfaction is our priority. If you're not happy with the service, contact our support team within 24 hours and we'll arrange for a re-service or provide a refund as per our policy."
  },
  {
    question: "What safety measures are in place?",
    answer: "All professionals wear masks and carry sanitizers. They follow strict hygiene protocols. You can also view their vaccination status and ratings from previous customers before booking."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major payment methods including credit/debit cards, UPI, net banking, and digital wallets. You can also pay cash after service completion."
  }
];

export const timeSlots = [
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM"
];

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter(s => s.category === category);
}

export function getServiceById(id: string): Service | undefined {
  return services.find(s => s.id === id);
}

export function getProfessionalsByCategory(category: ServiceCategory): Professional[] {
  return professionals.filter(p => p.specializations.includes(category));
}
