// From javascript_log_in_with_replit integration - Landing page for logged out users
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, BookOpen, Search, MessageCircle, Zap } from "lucide-react";
// Placeholder images - replace with actual assets as needed

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Open Digital Society</span>
          </div>
          <Button onClick={handleLogin} data-testid="button-login">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            Open Access Publishing Platform
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Publish Ideas That
            <span className="text-primary"> Matter</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A non-profit publishing platform where writers share knowledge freely, 
            readers discover meaningful content, and communities support independent journalism.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleLogin}
              data-testid="button-start-writing"
            >
              Start Writing
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleLogin}
              data-testid="button-start-reading"
            >
              Start Reading
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Writers and Readers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to publish, discover, and engage with meaningful content
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-elevate">
              <CardHeader>
                <Heart className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Open Access</CardTitle>
                <CardDescription>
                  All content is freely available. Support writers through donations, not paywalls.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Community Driven</CardTitle>
                <CardDescription>
                  Connect with readers, engage through comments, and build meaningful discussions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <Search className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Discover Content</CardTitle>
                <CardDescription>
                  Advanced search and tagging system to find exactly what you're looking for.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <MessageCircle className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Rich Engagement</CardTitle>
                <CardDescription>
                  Clap for articles, leave thoughtful comments, and bookmark for later reading.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Writing Tools</CardTitle>
                <CardDescription>
                  Professional writing interface with rich text editing and media support.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Track your impact with detailed analytics on views, engagement, and reach.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Two-Column Content Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <Badge variant="secondary" className="mb-4">For Writers</Badge>
              <h3 className="text-3xl font-bold mb-6">
                Share Your Knowledge Freely
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Publish articles without barriers. Our platform supports writers through 
                community donations while keeping all content freely accessible to readers.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Rich text editor with media support
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Community feedback and engagement
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Direct support through donations
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-primary/60" />
                  <p className="text-muted-foreground">Writer workspace</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="w-full h-80 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-16 w-16 mx-auto mb-4 text-primary/60" />
                  <p className="text-muted-foreground">Reading community</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Badge variant="secondary" className="mb-4">For Readers</Badge>
              <h3 className="text-3xl font-bold mb-6">
                Discover Ideas That Inspire
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Access a growing library of thoughtful articles on topics that matter. 
                Engage with authors and fellow readers in meaningful discussions.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Completely free access to all content
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Personalized reading recommendations
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Support your favorite writers directly
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of writers and readers committed to free, open access to knowledge.
          </p>
          <Button 
            size="lg" 
            onClick={handleLogin}
            data-testid="button-join-community"
          >
            Join Our Community
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Open Digital Society</span>
          </div>
          <p className="text-sm text-muted-foreground">
            A non-profit platform for open access publishing and knowledge sharing.
          </p>
        </div>
      </footer>
    </div>
  );
}