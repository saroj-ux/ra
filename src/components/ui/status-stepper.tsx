import { cn } from "@/lib/utils";
import { Check, Circle, Clock, MapPin, CheckCircle2 } from "lucide-react";

export type BookingStatus = "requested" | "accepted" | "on_the_way" | "completed" | "cancelled";

interface StatusStepperProps {
  currentStatus: BookingStatus;
  className?: string;
}

const steps: { status: BookingStatus; label: string; icon: React.ReactNode }[] = [
  { status: "requested", label: "Requested", icon: <Clock className="w-4 h-4" /> },
  { status: "accepted", label: "Accepted", icon: <Check className="w-4 h-4" /> },
  { status: "on_the_way", label: "On the way", icon: <MapPin className="w-4 h-4" /> },
  { status: "completed", label: "Completed", icon: <CheckCircle2 className="w-4 h-4" /> },
];

const statusOrder: BookingStatus[] = ["requested", "accepted", "on_the_way", "completed"];

export function StatusStepper({ currentStatus, className }: StatusStepperProps) {
  const currentIndex = currentStatus === "cancelled" ? -1 : statusOrder.indexOf(currentStatus);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;

          return (
            <div key={step.status} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                {index > 0 && (
                  <div
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors",
                      isCompleted ? "bg-success" : "bg-border"
                    )}
                  />
                )}
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                    isCompleted && "bg-success text-success-foreground",
                    isCurrent && "bg-primary text-primary-foreground shadow-primary",
                    isPending && "bg-secondary text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors",
                      isCompleted ? "bg-success" : "bg-border"
                    )}
                  />
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center",
                  isCompleted && "text-success",
                  isCurrent && "text-primary",
                  isPending && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
