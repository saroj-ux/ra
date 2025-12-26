import { cn } from "@/lib/utils";

interface ServiceIconProps {
  service: "ac" | "electrical" | "plumbing" | "cleaning" | "salon";
  className?: string;
}

const serviceIcons = {
  ac: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M8 2h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
      <path d="M8 10v2"/>
      <path d="M16 10v2"/>
      <path d="M12 10v4"/>
      <path d="M8 16s1 4 4 4 4-4 4-4"/>
    </svg>
  ),
  electrical: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  plumbing: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M9 3h6v2a3 3 0 0 1-3 3v0a3 3 0 0 1-3-3V3z"/>
      <path d="M12 8v4"/>
      <path d="M5 12h14"/>
      <path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>
    </svg>
  ),
  cleaning: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M10 5a2 2 0 0 1 4 0v2h-4V5z"/>
      <path d="M8 7h8l-1 13H9L8 7z"/>
      <path d="M12 11v5"/>
    </svg>
  )
};

const serviceColors = {
  ac: "text-service-ac bg-service-ac/10",
  electrical: "text-service-electrical bg-service-electrical/10",
  plumbing: "text-service-plumbing bg-service-plumbing/10",
  cleaning: "text-service-cleaning bg-service-cleaning/10"
};

export function ServiceIcon({ service, className }: ServiceIconProps) {
  return (
    <div className={cn("p-1 rounded-xl", serviceColors[service], className)}>
      {serviceIcons[service]}
    </div>
  );
}
