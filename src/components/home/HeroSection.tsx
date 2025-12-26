import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ServiceIcon } from "@/components/ui/service-icon";
import { useAuth } from "@/contexts/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities, City, categoryLabels, categoryPrices, ServiceCategory } from "@/types";
import { ChevronDown, Home, Wrench, Star, Droplets, Sparkles } from "lucide-react";

const categories: ServiceCategory[] = ["ac", "electrical", "plumbing", "cleaning"];

export function HeroSection() {
  const { selectedCity, setSelectedCity } = useAuth();

  return (
    <section className="relative bg-gradient-hero overflow-hidden">
      {/* Decorative elements - matching reference */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top right decorative icons */}
        <div className="absolute top-16 right-16 w-12 h-12 border-2 border-border rounded-lg flex items-center justify-center opacity-40">
          <Home className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="absolute top-32 right-32 w-10 h-10 border-2 border-border rounded-full flex items-center justify-center opacity-30">
          <Wrench className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="absolute top-20 right-48 w-8 h-8 border-2 border-border rounded-lg flex items-center justify-center opacity-25">
          <Star className="w-3 h-3 text-muted-foreground" />
        </div>
        <div className="absolute top-48 right-20 w-10 h-10 border-2 border-border rounded-full flex items-center justify-center opacity-35">
          <Droplets className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="absolute top-36 right-56 w-6 h-6 bg-primary/10 rounded-full" />
        <div className="absolute top-52 right-40 w-4 h-4 bg-accent/20 rounded-full" />
        {/* Blue squiggle/brush decoration */}
        <svg className="absolute top-40 right-28 w-24 h-12 opacity-60" viewBox="0 0 100 50">
          <path d="M10 25 Q30 10, 50 25 T90 25" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <div className="container relative py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content and CTA */}
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              Book trusted home<br />services in{" "}
              <span className="text-gradient">minutes</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8">
              Verified professionals for all your home needs. From AC repair to salon at home, we've got you covered.
            </p>

            {/* City selector & CTA */}
           
          </div>

          {/* Right Column - Booked Home */}
          <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Booked Services</h2>
            
 <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1 max-w-xs">
                <p className="text-xs text-muted-foreground mb-1.5">Select your city</p>
                <Select value={selectedCity} onValueChange={(value) => setSelectedCity(value as City)}>
                  <SelectTrigger className="h-12 text-base bg-background border border-border">
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city} className="text-base">
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Link to="/services" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-12 px-8 font-semibold">
                    Explore Services
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* <div className="space-y-4">
              <div className="flex items-center p-4 bg-muted/30 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary">
                    <path d="M12 2a3 3 0 0 0-3 3c0 1.12.5 2.01 1.5 2.5.5.23 1 .5 1.5.5s1-.27 1.5-.5c1-.49 1.5-1.38 1.5-2.5a3 3 0 0 0-3-3z"></path>
                    <path d="M19 8h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"></path>
                    <path d="M12 3v18"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">No services booked yet</h3>
                  <p className="text-sm text-muted-foreground">Your upcoming services will appear here</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Booking History
              </Button>
            </div> */}
          </div>
        </div>
      </div>
      {/* our Services Section */}
      <div className="bg-background py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Our Services</h2>
            <p className="text-muted-foreground">Choose from our wide range of home services</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
            {[
              {
                title: 'Electronic Appliances',
                description: 'Repair and maintenance of all home appliances',
                icon: 'electrical'
              },
              {
                title: 'Handyman Service',
                description: 'All types of home repair and maintenance',
                icon: 'plumbing'
              },
              {
                title: 'Cleaning',
                description: 'Professional home and office cleaning services',
                icon: 'cleaning'
              },
              {
                title: 'Civil Work',
                description: 'Construction and renovation services',
                icon: 'ac'
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border/50 flex flex-col items-center text-center"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${service.icon === 'electrical' ? 'text-service-electrical bg-service-electrical/10' : 
                  service.icon === 'plumbing' ? 'text-service-plumbing bg-service-plumbing/10' :
                  service.icon === 'cleaning' ? 'text-service-cleaning bg-service-cleaning/10' :
                  'text-service-ac bg-service-ac/10'}`}
                >
                  {service.icon === 'electrical' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  ) : service.icon === 'plumbing' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M9 3h6v2a3 3 0 0 1-3 3v0a3 3 0 0 1-3-3V3z"/>
                      <path d="M12 8v4"/>
                      <path d="M5 12h14"/>
                      <path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>
                    </svg>
                  ) : service.icon === 'cleaning' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M10 5a2 2 0 0 1 4 0v2h-4V5z"/>
                      <path d="M8 7h8l-1 13H9L8 7z"/>
                      <path d="M12 11v5"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M8 2h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
                      <path d="M8 10v2"/>
                      <path d="M16 10v2"/>
                      <path d="M12 10v4"/>
                      <path d="M8 16s1 4 4 4 4-4 4-4"/>
                    </svg>
                  )}
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Popular Services Section */}
      <div className="bg-background py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Popular Services</h2>
            <p className="text-muted-foreground">Choose from our most booked services</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/services?category=${category}`}
                className="group bg-background rounded-2xl p-5 md:p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <ServiceIcon service={category} className="!w-7 !h-7 md:!w-8 md:!h-8 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">
                  {categoryLabels[category]}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Starting ₹{categoryPrices[category]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}