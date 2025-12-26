import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from "@/components/ui/rating";
import { ServiceIcon } from "@/components/ui/service-icon";
import { StatusBadge } from "@/components/ui/status-badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getServiceById, getProfessionalsByCategory, timeSlots } from "@/data/services";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  CheckCircle2,
  MapPin,
  Plus,
  ArrowLeft,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ServiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, selectedCity } = useAuth();

  const service = getServiceById(id || "");

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [address, setAddress] = useState({
    flat: "",
    street: "",
    city: selectedCity,
    pincode: "",
  });
  const [notes, setNotes] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState<string>();

  if (!service) {
    return (
      <MainLayout>
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">Service not found</p>
          <Button variant="outline" onClick={() => navigate("/services")} className="mt-4">
            Browse Services
          </Button>
        </div>
      </MainLayout>
    );
  }

  const professionals = getProfessionalsByCategory(service.category);

  const toggleAddOn = (addOnName: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnName)
        ? prev.filter((a) => a !== addOnName)
        : [...prev, addOnName]
    );
  };

  const calculateTotal = () => {
    let total = service.startingPrice;
    service.addOns.forEach((addOn) => {
      if (selectedAddOns.includes(addOn.name)) {
        total += addOn.price;
      }
    });
    return total;
  };

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast({
        title: "Please login to continue",
        description: "You need to be logged in to book a service.",
      });
      navigate("/auth");
      return;
    }

    if (!selectedDate || !selectedTimeSlot) {
      toast({
        title: "Please select date and time",
        variant: "destructive",
      });
      return;
    }

    if (!address.flat || !address.street || !address.pincode) {
      toast({
        title: "Please fill in your address",
        variant: "destructive",
      });
      return;
    }

    // Navigate to confirmation page with booking details
    const bookingData = {
      serviceId: service.id,
      date: format(selectedDate, "yyyy-MM-dd"),
      timeSlot: selectedTimeSlot,
      addOns: selectedAddOns,
      address,
      notes,
      professionalId: selectedProfessional,
      total: calculateTotal(),
    };

    // Store in sessionStorage for the confirmation page
    sessionStorage.setItem("pendingBooking", JSON.stringify(bookingData));
    navigate("/booking/confirm");
  };

  return (
    <MainLayout>
      <div className="bg-secondary/30 py-6">
        <div className="container">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Header */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4">
                <ServiceIcon service={service.category} className="flex-shrink-0" />
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    {service.name}
                  </h1>
                  <div className="flex items-center gap-3 mt-2">
                    <Rating rating={service.rating} />
                    <span className="text-sm text-muted-foreground">
                      ({service.reviewCount.toLocaleString()} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">{service.description}</p>
            </div>

            {/* What's Included */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                What's Included
              </h2>
              <ul className="space-y-3">
                {service.includedServices.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Add-ons */}
            {service.addOns.length > 0 && (
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Add-ons (Optional)
                </h2>
                <div className="space-y-3">
                  {service.addOns.map((addOn) => (
                    <button
                      key={addOn.name}
                      onClick={() => toggleAddOn(addOn.name)}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-xl border transition-all",
                        selectedAddOns.includes(addOn.name)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            selectedAddOns.includes(addOn.name)
                              ? "border-primary bg-primary"
                              : "border-border"
                          )}
                        >
                          {selectedAddOns.includes(addOn.name) && (
                            <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                          )}
                        </div>
                        <span className="font-medium text-foreground">{addOn.name}</span>
                      </div>
                      <span className="font-semibold text-primary">+₹{addOn.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Professionals */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Available Professionals
              </h2>
              <div className="space-y-3">
                {professionals.slice(0, 3).map((pro) => (
                  <button
                    key={pro.id}
                    onClick={() => setSelectedProfessional(pro.id)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                      selectedProfessional === pro.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{pro.name}</span>
                        {pro.badges.includes("verified") && (
                          <StatusBadge variant="verified" dot={false}>Verified</StatusBadge>
                        )}
                        {pro.badges.includes("top_rated") && (
                          <StatusBadge variant="top_rated" dot={false}>Top Rated</StatusBadge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <Rating rating={pro.rating} size="sm" />
                        <span>{pro.jobsCompleted.toLocaleString()} jobs</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {service.faqs.length > 0 && (
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {service.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="border border-border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-2xl p-6 border border-border shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Book this Service
              </h3>

              {/* Date Picker */}
              <div className="mb-4">
                <Label className="mb-2 block">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Slots */}
              <div className="mb-4">
                <Label className="mb-2 block">Select Time Slot</Label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedTimeSlot === slot ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                      onClick={() => setSelectedTimeSlot(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-3 mb-4">
                <Label className="mb-2 block">Service Address</Label>
                <Input
                  placeholder="Flat / House No."
                  value={address.flat}
                  onChange={(e) => setAddress({ ...address, flat: e.target.value })}
                />
                <Input
                  placeholder="Street / Area"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={address.city}
                    disabled
                    className="bg-secondary"
                  />
                  <Input
                    placeholder="Pincode"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <Label className="mb-2 block">Additional Notes (Optional)</Label>
                <Textarea
                  placeholder="Any specific instructions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Price Summary */}
              <div className="border-t border-border pt-4 mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Base price</span>
                  <span className="text-foreground">₹{service.startingPrice}</span>
                </div>
                {selectedAddOns.map((addOnName) => {
                  const addOn = service.addOns.find((a) => a.name === addOnName);
                  return addOn ? (
                    <div key={addOnName} className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{addOn.name}</span>
                      <span className="text-foreground">₹{addOn.price}</span>
                    </div>
                  ) : null;
                })}
                <div className="flex justify-between font-semibold text-lg mt-3 pt-3 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">₹{calculateTotal()}</span>
                </div>
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleBooking}
              >
                Book Service Now
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-3">
                Free cancellation up to 2 hours before service
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
