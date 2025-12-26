import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { StatusStepper } from "@/components/ui/status-stepper";
import { sampleBookings } from "@/data/services";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

export default function BookingTrackingPage() {
  const { id } = useParams<{ id: string }>();
  const [isCancelled, setIsCancelled] = useState(false);

  // Find booking from sample data or use a mock
  const booking = sampleBookings.find((b) => b.id === id) || {
    id: id || "BK123456",
    service: sampleBookings[1].service,
    professional: sampleBookings[1].professional,
    status: "on_the_way" as const,
    date: "2024-12-21",
    timeSlot: "2:00 PM - 6:00 PM",
    address: {
      flat: "A-123",
      street: "MG Road",
      city: "Delhi",
      pincode: "110001",
    },
    totalAmount: 2599,
    createdAt: new Date().toISOString(),
  };

  const handleCancel = () => {
    setIsCancelled(true);
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    });
  };

  const canCancel = booking.status === "requested" || booking.status === "accepted";

  return (
    <MainLayout>
      <div className="bg-secondary/30 py-6">
        <div className="container">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Track Your Booking
          </h1>
          <p className="text-muted-foreground mt-1">
            Booking ID: <span className="font-medium text-foreground">{booking.id}</span>
          </p>
        </div>
      </div>

      <div className="container py-8 max-w-3xl">
        {isCancelled ? (
          <div className="bg-destructive/10 rounded-2xl p-6 text-center mb-8">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Booking Cancelled
            </h2>
            <p className="text-muted-foreground">
              This booking has been cancelled. Any payment will be refunded within 5-7 business days.
            </p>
          </div>
        ) : (
          <>
            {/* Status Stepper */}
            <div className="bg-card rounded-2xl p-6 border border-border mb-8">
              <StatusStepper currentStatus={booking.status} />
            </div>

            {/* Status Message */}
            <div className="bg-primary/5 rounded-xl p-4 mb-8 text-center">
              {booking.status === "requested" && (
                <p className="text-foreground">
                  Your booking request has been sent. Waiting for professional to accept.
                </p>
              )}
              {booking.status === "accepted" && (
                <p className="text-foreground">
                  Great! <span className="font-semibold">{booking.professional?.name}</span> has accepted your booking.
                </p>
              )}
              {booking.status === "on_the_way" && (
                <p className="text-foreground">
                  <span className="font-semibold">{booking.professional?.name}</span> is on the way! ETA: ~15 mins
                </p>
              )}
              {booking.status === "completed" && (
                <p className="text-foreground">
                  Service completed! Don't forget to leave a review.
                </p>
              )}
            </div>
          </>
        )}

        {/* Booking Details */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-6">
          <h3 className="font-semibold text-foreground mb-4">{booking.service.name}</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{booking.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium">{booking.timeSlot}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">
                  {booking.address.flat}, {booking.address.street}
                </p>
                <p className="text-sm text-muted-foreground">
                  {booking.address.city} - {booking.address.pincode}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border flex justify-between">
            <span className="text-muted-foreground">Total Amount</span>
            <span className="font-bold text-primary">₹{booking.totalAmount}</span>
          </div>
        </div>

        {/* Professional Contact */}
        {booking.professional && !isCancelled && (
          <div className="bg-card rounded-2xl p-6 border border-border mb-6">
            <h3 className="font-semibold text-foreground mb-4">Your Professional</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {booking.professional.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-semibold">{booking.professional.name}</p>
                <p className="text-sm text-muted-foreground">
                  {booking.professional.jobsCompleted.toLocaleString()} jobs completed
                </p>
              </div>
              <div className="flex gap-2">
                {/* TODO: Integrate with WhatsApp/SMS notifications */}
                <Button variant="outline" size="icon">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        {!isCancelled && canCancel && (
          <div className="flex justify-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                  Cancel Booking
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to cancel this booking? Cancellations within 2 hours of the scheduled time may incur a fee.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleCancel}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Yes, Cancel
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
