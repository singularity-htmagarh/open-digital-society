import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Target, Users, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DonationCTAProps {
  onDonateClick?: (amount?: number) => void;
  onLearnMoreClick?: () => void;
}

export default function DonationCTA({ onDonateClick, onLearnMoreClick }: DonationCTAProps) {
  const donationAmounts = [10, 25, 50, 100];

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          {/* Icon and Badge */}
          <div className="flex justify-center items-center space-x-2">
            <Heart className="h-6 w-6 text-primary" />
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Non-Profit Mission
            </Badge>
          </div>

          {/* Headline */}
          <h3 className="font-serif text-xl font-bold">
            Support Open Knowledge
          </h3>
          
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Help us keep knowledge free and accessible. Your donation supports 
            writers, maintains our platform, and advances digital literacy worldwide.
          </p>

          {/* Impact Stats */}
          <div className="grid grid-cols-3 gap-4 my-6">
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div className="text-sm font-semibold">10K+</div>
              <div className="text-xs text-muted-foreground">Writers Supported</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Target className="h-4 w-4 text-primary" />
              </div>
              <div className="text-sm font-semibold">100%</div>
              <div className="text-xs text-muted-foreground">Open Access</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div className="text-sm font-semibold">0</div>
              <div className="text-xs text-muted-foreground">Ads or Tracking</div>
            </div>
          </div>

          {/* Donation Amounts */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {donationAmounts.map((amount) => (
              <Button
                key={amount}
                data-testid={`button-donate-${amount}`}
                variant="outline"
                size="sm"
                onClick={() => {
                  onDonateClick?.(amount);
                  console.log("Donation amount clicked:", amount);
                }}
                className="border-primary/30 hover:bg-primary/10"
              >
                ${amount}
              </Button>
            ))}
          </div>

          {/* Main CTA */}
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button 
              data-testid="button-donate-custom"
              onClick={() => {
                onDonateClick?.();
                console.log("Custom donation clicked");
              }}
              className="bg-primary hover:bg-primary/90"
            >
              <Heart className="h-4 w-4 mr-2" />
              Make a Donation
            </Button>
            
            <Button 
              data-testid="button-learn-impact"
              variant="ghost" 
              onClick={() => {
                onLearnMoreClick?.();
                console.log("Learn more about impact clicked");
              }}
              className="text-primary hover:bg-primary/10"
            >
              Learn About Our Impact
            </Button>
          </div>

          {/* Fine Print */}
          <p className="text-xs text-muted-foreground">
            Open Digital Society is a registered 501(c)(3) nonprofit. 
            Donations are tax-deductible.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}