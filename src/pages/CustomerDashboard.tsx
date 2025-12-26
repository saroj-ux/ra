import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { StatusBadge } from "@/components/ui/status-badge";
import { sampleBookings } from "@/data/services";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Clock, MapPin, Star, ArrowRight } from "lucide-react";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const upcomingBookings = sampleBookings.filter(b => b.status !== "completed" && b.status !== "cancelled");
  const pastBookings = sampleBookings.filter(b => b.status === "completed");

  return (
    <MainLayout>
      <div className="bg-secondary/30 py-8">
        <div className="container">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, {user?.name?.split(" ")[0] || "User"}!
          </h1>
          <p className="text-muted-foreground mt-1">Manage your bookings and reviews</p>
        </div>
      </div>

      <div className="container py-8">
        {/* Upcoming Bookings */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Upcoming Bookings</h2>
            <Link to="/services">
              <Button variant="outline" size="sm">Book New Service</Button>
            </Link>
          </div>

          {upcomingBookings.length === 0 ? (
            <div className="bg-card rounded-2xl p-8 border border-border text-center">
              <p className="text-muted-foreground mb-4">No upcoming bookings</p>
              <Link to="/services"><Button>Browse Services</Button></Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingBookings.map((booking) => (
                <Link key={booking.id} to={`/booking/${booking.id}`} className="bg-card rounded-2xl p-5 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-foreground">{booking.service.name}</h3>
                    <StatusBadge variant={booking.status === "accepted" ? "accepted" : booking.status === "on_the_way" ? "in_progress" : "pending"}>
                      {booking.status.replace("_", " ")}
                    </StatusBadge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{booking.date}</div>
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{booking.timeSlot}</div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{booking.address.city}</div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-border">
                    <span className="font-bold text-primary">₹{booking.totalAmount}</span>
                    <span className="text-sm text-primary flex items-center gap-1">Track <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Past Bookings */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Past Bookings</h2>
          <div className="space-y-4">
            {pastBookings.map((booking) => (
              <div key={booking.id} className="bg-card rounded-2xl p-5 border border-border">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{booking.service.name}</h3>
                    <p className="text-sm text-muted-foreground">{booking.date} • ₹{booking.totalAmount}</p>
                  </div>
                  {booking.review ? (
                    <div className="flex items-center gap-2">
                      <Rating rating={booking.review.rating} size="sm" />
                      <span className="text-sm text-muted-foreground">Reviewed</span>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm"><Star className="w-4 h-4 mr-1" />Leave Review</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
