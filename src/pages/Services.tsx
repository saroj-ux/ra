import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rating } from "@/components/ui/rating";
import { ServiceIcon } from "@/components/ui/service-icon";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services } from "@/data/services";
import { categoryLabels, ServiceCategory } from "@/types";
import { Search, Filter, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories: (ServiceCategory | "all")[] = ["all", "ac", "electrical", "plumbing", "cleaning", "salon"];
const timeFilters = ["all", "today", "tomorrow", "this_week"] as const;

export default function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") as ServiceCategory | null;

  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | "all">(
    initialCategory || "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [timeFilter, setTimeFilter] = useState<typeof timeFilters[number]>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Category filter
      if (selectedCategory !== "all" && service.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (
        searchQuery &&
        !service.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !service.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Price filter
      if (service.startingPrice < priceRange[0] || service.startingPrice > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (service.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, priceRange, minRating]);

  const handleCategoryChange = (category: ServiceCategory | "all") => {
    setSelectedCategory(category);
    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setPriceRange([0, 5000]);
    setMinRating(0);
    setTimeFilter("all");
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    searchQuery ||
    priceRange[0] > 0 ||
    priceRange[1] < 5000 ||
    minRating > 0 ||
    timeFilter !== "all";

  return (
    <MainLayout>
      <div className="bg-secondary/30 py-8">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Browse Services
          </h1>
          <p className="text-muted-foreground">
            Find the perfect service for your home needs
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Categories</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                        selectedCategory === category
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-secondary"
                      )}
                    >
                      {category !== "all" && (
                        <ServiceIcon service={category} className="!p-1.5 !rounded-md" />
                      )}
                      <span>{category === "all" ? "All Services" : categoryLabels[category]}</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={5000}
                  step={100}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Minimum Rating</h3>
                <Select value={String(minRating)} onValueChange={(v) => setMinRating(Number(v))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any rating</SelectItem>
                    <SelectItem value="4">4★ & above</SelectItem>
                    <SelectItem value="4.5">4.5★ & above</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Availability</h3>
                <Select value={timeFilter} onValueChange={(v) => setTimeFilter(v as typeof timeFilter)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="this_week">This week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {hasActiveFilters && (
                <Button variant="outline" className="w-full" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Mobile Filter */}
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-card rounded-xl p-4 mb-6 border border-border animate-scale-in">
                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category === "all" ? "All" : categoryLabels[category]}
                    </Button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Select value={String(minRating)} onValueChange={(v) => setMinRating(Number(v))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any rating</SelectItem>
                      <SelectItem value="4">4★ & above</SelectItem>
                      <SelectItem value="4.5">4.5★ & above</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={timeFilter} onValueChange={(v) => setTimeFilter(v as typeof timeFilter)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredServices.length} services
            </p>

            {/* Service Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredServices.map((service) => (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  className="group bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <ServiceIcon service={service.category} className="flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {service.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {service.shortDescription}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <Rating rating={service.rating} size="sm" />
                        <span className="text-xs text-muted-foreground">
                          ({service.reviewCount.toLocaleString()})
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <span className="text-xs text-muted-foreground">Starting</span>
                          <p className="font-bold text-primary">₹{service.startingPrice}</p>
                        </div>
                        <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No services found matching your criteria</p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
