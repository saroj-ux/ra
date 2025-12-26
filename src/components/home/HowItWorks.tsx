import { Search, CalendarCheck, Smile } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Choose Service",
    description: "Browse through our wide range of home services and select what you need.",
  },
  {
    icon: CalendarCheck,
    title: "2. Pick Time",
    description: "Choose your preferred date and time slot that works best for you.",
  },
  {
    icon: Smile,
    title: "3. Relax",
    description: "Our verified professional arrives at your doorstep and gets the job done.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground">
            Book your service in 3 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 border-t-2 border-dashed border-border" />
              )}
              
              <div className="relative z-10 mb-5 inline-flex">
                <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-primary">
                  <step.icon className="w-9 h-9 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground max-w-[250px] mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}