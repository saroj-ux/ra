import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        pending: "bg-warning/10 text-warning",
        accepted: "bg-info/10 text-info",
        in_progress: "bg-primary/10 text-primary",
        completed: "bg-success/10 text-success",
        cancelled: "bg-destructive/10 text-destructive",
        verified: "bg-success/10 text-success",
        top_rated: "bg-warning/10 text-warning",
      },
    },
    defaultVariants: {
      variant: "pending",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  dot?: boolean;
}

export function StatusBadge({ className, variant, dot = true, children, ...props }: StatusBadgeProps) {
  return (
    <div className={cn(statusBadgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
      )}
      {children}
    </div>
  );
}
