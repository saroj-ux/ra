import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-cta text-primary-foreground">
      <div className="container text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Ready to Book Your Service?
        </h2>
        <p className="text-base text-primary-foreground/80 mb-8 max-w-xl mx-auto">
          Join thousands of satisfied customers across India
        </p>
        <Link to="/services">
          <Button
            size="lg"
            className="bg-background text-primary hover:bg-background/90 font-semibold px-8"
          >
            Get Started Now
          </Button>
        </Link>
      </div>
    </section>
  );
}