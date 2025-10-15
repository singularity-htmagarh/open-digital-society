import { Heart, Twitter, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface FooterProps {
  onNewsletterSignup?: (email: string) => void;
}

export default function Footer({ onNewsletterSignup }: FooterProps) {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onNewsletterSignup?.(email);
      console.log("Newsletter signup:", email);
      setEmail("");
    }
  };

  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl font-bold">Open Digital Society</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A non-profit platform where knowledge meets community. 
              Building a more informed and connected world through quality content.
            </p>
            <div className="flex space-x-2">
              <Button 
                data-testid="link-twitter"
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => console.log("Twitter link clicked")}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button 
                data-testid="link-github"
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => console.log("GitHub link clicked")}
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button 
                data-testid="link-linkedin"
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => console.log("LinkedIn link clicked")}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button 
                data-testid="link-contact"
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => console.log("Contact link clicked")}
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h4 className="font-semibold">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Button 
                  data-testid="link-write"
                  variant="ghost" 
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => console.log("Write link clicked")}
                >
                  Start Writing
                </Button>
              </li>
              <li>
                <Button 
                  data-testid="link-explore"
                  variant="ghost" 
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => console.log("Explore link clicked")}
                >
                  Explore Articles
                </Button>
              </li>
              <li>
                <Button 
                  data-testid="link-writers"
                  variant="ghost" 
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => console.log("Writers link clicked")}
                >
                  Find Writers
                </Button>
              </li>
              <li>
                <Button 
                  data-testid="link-topics"
                  variant="ghost" 
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => console.log("Topics link clicked")}
                >
                  Browse Topics
                </Button>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="font-semibold">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Button 
                  data-testid="link-about"
                  variant="ghost" 
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => console.log("About link clicked")}
                >
                  About Us
                </Button>
              </li>
              <li>
                <Button 
                  data-testid="link-guidelines"
                  variant="ghost" 
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => console.log("Guidelines link clicked")}
                >
                  Community Guidelines
                </Button>
              </li>
              <li>
                <Button 
                  data-testid="link-donate"
                  variant="ghost" 
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => console.log("Donate link clicked")}
                >
                  Donate
                </Button>
              </li>
              <li>
                <Button 
                  data-testid="link-volunteer"
                  variant="ghost" 
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => console.log("Volunteer link clicked")}
                >
                  Volunteer
                </Button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold">Stay Connected</h4>
            <p className="text-sm text-muted-foreground">
              Get weekly updates on new articles and community highlights.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                data-testid="input-newsletter-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9"
              />
              <Button 
                data-testid="button-newsletter-signup"
                type="submit" 
                size="sm" 
                className="w-full"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 Open Digital Society. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Button 
              data-testid="link-privacy"
              variant="ghost" 
              className="h-auto p-0 text-muted-foreground hover:text-foreground"
              onClick={() => console.log("Privacy link clicked")}
            >
              Privacy Policy
            </Button>
            <Button 
              data-testid="link-terms"
              variant="ghost" 
              className="h-auto p-0 text-muted-foreground hover:text-foreground"
              onClick={() => console.log("Terms link clicked")}
            >
              Terms of Service
            </Button>
            <Button 
              data-testid="link-accessibility"
              variant="ghost" 
              className="h-auto p-0 text-muted-foreground hover:text-foreground"
              onClick={() => console.log("Accessibility link clicked")}
            >
              Accessibility
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}