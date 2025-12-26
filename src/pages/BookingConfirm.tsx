import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { getServiceById, getProfessionalsByCategory } from "@/data/services";
import { CheckCircle2, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

interface BookingData {
  serviceId: string;
  date: string;
  timeSlot: string;
  addOns: string[];
  address: {
    flat: string;
    street: string;
    city: string;
    pincode: string;
  };
  notes: string;
  professionalId?: string;
  total: number;
}

export default function BookingConfirmPage() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState<string>("");

  useEffect(() => {
    const pending = sessionStorage.getItem("pendingBooking");
    if (pending) {
      setBookingData(JSON.parse(pending));
    } else {
      navigate("/services");
    }
  }, [navigate]);

  if (!bookingData) {
    return null;
  }

  const service = getServiceById(bookingData.serviceId);
  const professional = bookingData.professionalId
    ? getProfessionalsByCategory(service?.category || "ac").find(
        (p) => p.id === bookingData.professionalId
      )
    : null;

  const handleConfirm = () => {
    // Generate a random booking ID
    const id = "BK" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setBookingId(id);
    setIsConfirmed(true);
    sessionStorage.removeItem("pendingBooking");

    // TODO: In production, this would call an API to create the booking
    // and trigger payment flow (Razorpay integration point)
  };

  if (isConfirmed) {
    return (
      <MainLayout>
        <div className="container py-16 max-w-xl mx-auto text-center">
          <div className="animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground mb-6">
              Your booking ID is <span className="font-semibold text-foreground">{bookingId}</span>
            </p>

            <div className="bg-card rounded-2xl p-6 border border-border text-left mb-6">
              <h3 className="font-semibold text-foreground mb-4">{service?.name}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{bookingData.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{bookingData.timeSlot}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span>
                    {bookingData.address.flat}, {bookingData.address.street},{" "}
                    {bookingData.address.city} - {bookingData.address.pincode}
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex justify-between">
                <span className="text-muted-foreground">Total Paid</span>
                <span className="font-bold text-primary">₹{bookingData.total}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to={`/booking/${bookingId}`} className="flex-1">
                <Button variant="default" className="w-full">
                  Track Booking
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/dashboard" className="flex-1">
                <Button variant="outline" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-8 max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          Confirm Your Booking
        </h1>

        <div className="bg-card rounded-2xl p-6 border border-border mb-6">
          <h2 className="font-semibold text-foreground mb-4">{service?.name}</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{bookingData.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium">{bookingData.timeSlot}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">
                  {bookingData.address.flat}, {bookingData.address.street}
                </p>
                <p className="text-sm text-muted-foreground">
                  {bookingData.address.city} - {bookingData.address.pincode}
                </p>
              </div>
            </div>

            {professional && (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs text-primary font-semibold">
                    {professional.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Professional</p>
                  <p className="font-medium">{professional.name}</p>
                </div>
              </div>
            )}

            {bookingData.notes && (
              <div>
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="text-sm">{bookingData.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-6">
          <h3 className="font-semibold text-foreground mb-4">Price Summary</h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service charge</span>
              <span>₹{service?.startingPrice}</span>
            </div>
            {bookingData.addOns.map((addOn) => {
              const addOnData = service?.addOns.find((a) => a.name === addOn);
              return addOnData ? (
                <div key={addOn} className="flex justify-between">
                  <span className="text-muted-foreground">{addOn}</span>
                  <span>₹{addOnData.price}</span>
                </div>
              ) : null;
            })}
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Platform fee</span>
              <span>₹0</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>GST (18%)</span>
              <span>Included</span>
            </div>
          </div>

          <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-border">
            <span>Total Amount</span>
            <span className="text-primary">₹{bookingData.total}</span>
          </div>
        </div>

        {/* TODO: Payment integration point - Razorpay */}
        <div className="bg-secondary/50 rounded-xl p-4 mb-6">
          <p className="text-sm text-muted-foreground text-center">
            💳 Payment will be collected after service completion (Cash / UPI / Card)
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate(-1)} className="flex-1">
            Go Back
          </Button>
          <Button variant="hero" onClick={handleConfirm} className="flex-1">
            Confirm Booking
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
