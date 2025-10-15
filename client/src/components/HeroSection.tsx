import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen, Heart } from "lucide-react";
import heroImage from "@assets/generated_images/Hero_image_for_publishing_platform_b710e483.png";

interface HeroSectionProps {
  onGetStarted?: () => void;
  onLearnMore?: () => void;
}

export default function HeroSection({ onGetStarted, onLearnMore }: HeroSectionProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="People sharing knowledge in a digital community"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Where Knowledge
            <span className="text-primary block">Meets Community</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Join Open Digital Society, a platform where writers share their insights 
            and readers discover transformative content. Together, we're building a 
            more informed and connected world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              data-testid="button-get-started"
              size="lg" 
              onClick={() => {
                onGetStarted?.();
                console.log("Get started clicked");
              }}
              className="text-lg px-8"
            >
              Start Writing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              data-testid="button-learn-more"
              variant="outline" 
              size="lg"
              onClick={() => {
                onLearnMore?.();
                console.log("Learn more clicked");
              }}
              className="text-lg px-8 bg-background/80 backdrop-blur"
            >
              Explore Articles
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border/50">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">10,000+</div>
              <div className="text-sm text-muted-foreground">Active Writers</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">50,000+</div>
              <div className="text-sm text-muted-foreground">Articles Published</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">Non-Profit</div>
              <div className="text-sm text-muted-foreground">Community Driven</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}