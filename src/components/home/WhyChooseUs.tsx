import { whyChooseUs } from "@/data/services";
import { Shield, IndianRupee, Clock, Headphones } from "lucide-react";

const iconMap = {
  shield: Shield,
  currency: IndianRupee,
  clock: Clock,
  headphones: Headphones,
};

const colorMap = {
  shield: "bg-primary/10 text-primary",
  currency: "bg-accent/10 text-accent",
  clock: "bg-warning/10 text-warning",
  headphones: "bg-destructive/10 text-destructive",
};

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-16 md:py-20 bg-section">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground">
            Your trusted partner for all home services
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {whyChooseUs.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            const colorClass = colorMap[item.icon as keyof typeof colorMap] || "bg-primary/10 text-primary";
            return (
              <div
                key={item.title}
                className="bg-card rounded-2xl p-6 text-center border border-border"
              >
                <div className={`w-14 h-14 rounded-xl ${colorClass} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}