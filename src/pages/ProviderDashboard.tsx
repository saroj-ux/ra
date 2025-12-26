import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleBookings } from "@/data/services";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, IndianRupee, Check, X } from "lucide-react";

export default function ProviderDashboard() {
  const { user } = useAuth();
  const [jobRequests, setJobRequests] = useState(sampleBookings.filter(b => b.status === "requested"));
  const todaysJobs = sampleBookings.filter(b => b.status === "accepted" || b.status === "on_the_way");

  const earnings = {
    total: 45680,
    lastSevenDays: 8540,
    jobs: sampleBookings.filter(b => b.status === "completed").map(b => ({
      name: b.service.name,
      date: b.date,
      amount: b.totalAmount
    }))
  };

  const handleAccept = (id: string) => {
    setJobRequests(prev => prev.filter(j => j.id !== id));
    toast({ title: "Job Accepted!", description: "The customer has been notified." });
  };

  const handleReject = (id: string) => {
    setJobRequests(prev => prev.filter(j => j.id !== id));
    toast({ title: "Job Declined" });
  };

  return (
    <MainLayout>
      <div className="bg-gradient-cta text-primary-foreground py-8">
        <div className="container">
          <h1 className="text-2xl md:text-3xl font-bold">Partner Dashboard</h1>
          <p className="opacity-80 mt-1">Welcome, {user?.name || "Partner"}</p>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue="requests">
          <TabsList className="mb-6">
            <TabsTrigger value="requests">New Requests ({jobRequests.length})</TabsTrigger>
            <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            {jobRequests.length === 0 ? (
              <div className="bg-card rounded-2xl p-8 border text-center">
                <p className="text-muted-foreground">No new job requests</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobRequests.map((job) => (
                  <div key={job.id} className="bg-card rounded-2xl p-5 border">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{job.service.name}</h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{job.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{job.timeSlot}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.address.city}</span>
                        </div>
                        <p className="font-bold text-primary mt-2">₹{job.totalAmount}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleReject(job.id)}><X className="w-4 h-4 mr-1" />Decline</Button>
                        <Button size="sm" onClick={() => handleAccept(job.id)}><Check className="w-4 h-4 mr-1" />Accept</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="schedule">
            {todaysJobs.length === 0 ? (
              <div className="bg-card rounded-2xl p-8 border text-center">
                <p className="text-muted-foreground">No jobs scheduled for today</p>
              </div>
            ) : (
              <div className="space-y-4">
                {todaysJobs.map((job) => (
                  <div key={job.id} className="bg-card rounded-2xl p-5 border flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{job.service.name}</h3>
                      <p className="text-sm text-muted-foreground">{job.timeSlot} • {job.address.flat}, {job.address.city}</p>
                    </div>
                    <StatusBadge variant={job.status === "on_the_way" ? "in_progress" : "accepted"}>{job.status.replace("_", " ")}</StatusBadge>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="earnings">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-card rounded-2xl p-6 border">
                <p className="text-muted-foreground text-sm">Total Earnings</p>
                <p className="text-3xl font-bold text-foreground flex items-center gap-1"><IndianRupee className="w-6 h-6" />{earnings.total.toLocaleString()}</p>
              </div>
              <div className="bg-card rounded-2xl p-6 border">
                <p className="text-muted-foreground text-sm">Last 7 Days</p>
                <p className="text-3xl font-bold text-success flex items-center gap-1"><IndianRupee className="w-6 h-6" />{earnings.lastSevenDays.toLocaleString()}</p>
              </div>
            </div>
            <h3 className="font-semibold mb-3">Recent Completed Jobs</h3>
            <div className="space-y-3">
              {earnings.jobs.map((job, i) => (
                <div key={i} className="bg-card rounded-xl p-4 border flex justify-between">
                  <div><p className="font-medium">{job.name}</p><p className="text-sm text-muted-foreground">{job.date}</p></div>
                  <p className="font-bold text-success">₹{job.amount}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
