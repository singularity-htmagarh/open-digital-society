// Home page for authenticated users
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, BookOpen, TrendingUp, Users, Edit } from "lucide-react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { user } = useAuth();
  
  const { data: articles, isLoading } = useQuery({
    queryKey: ["/api/articles"],
  });

  const { data: trendingArticles } = useQuery({
    queryKey: ["/api/articles", "trending"],
  });

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Open Digital Society</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link href="/explore" className="text-sm font-medium hover:text-primary">
                Explore
              </Link>
              <Link href="/following" className="text-sm font-medium hover:text-primary">
                Following
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/write">
              <Button size="sm" data-testid="button-write">
                <Edit className="h-4 w-4 mr-2" />
                Write
              </Button>
            </Link>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.profileImageUrl} />
              <AvatarFallback>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              data-testid="button-logout"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome Message */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.firstName || 'Writer'}
              </h1>
              <p className="text-muted-foreground">
                Discover the latest articles from the community
              </p>
            </div>

            {/* Featured Article */}
            <Card className="mb-8 hover-elevate">
              <CardHeader>
                <Badge variant="secondary" className="w-fit">Featured</Badge>
                <CardTitle className="text-2xl">
                  The Future of Open Knowledge Sharing
                </CardTitle>
                <CardDescription>
                  Exploring how digital platforms are democratizing access to information 
                  and empowering communities worldwide.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>ED</AvatarFallback>
                    </Avatar>
                    <span>Editorial Team</span>
                  </div>
                  <span>•</span>
                  <span>5 min read</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>234</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Article Feed */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Latest Articles
              </h2>
              
              {isLoading ? (
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Sample articles - replace with real data */}
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="hover-elevate">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Sample Article Title {i}
                        </CardTitle>
                        <CardDescription>
                          This is a sample article description that gives readers 
                          an overview of what to expect from the content...
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>AU</AvatarFallback>
                              </Avatar>
                              <span>Author Name</span>
                            </div>
                            <span>•</span>
                            <span>3 min read</span>
                            <span>•</span>
                            <span>Dec 14</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                              <span>{Math.floor(Math.random() * 100) + 10}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{Math.floor(Math.random() * 20)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/write">
                    <Button className="w-full" size="sm" data-testid="button-new-article">
                      <Edit className="h-4 w-4 mr-2" />
                      New Article
                    </Button>
                  </Link>
                  <Link href="/drafts">
                    <Button variant="outline" className="w-full" size="sm">
                      View Drafts
                    </Button>
                  </Link>
                  <Link href="/stats">
                    <Button variant="outline" className="w-full" size="sm">
                      Your Stats
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trending Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["Technology", "Society", "Environment", "Education", "Health"].map((topic) => (
                      <div key={topic} className="flex items-center justify-between">
                        <Badge variant="secondary">{topic}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 50) + 10} articles
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Active Writers</span>
                      </div>
                      <span className="text-sm font-medium">1,234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Published Today</span>
                      </div>
                      <span className="text-sm font-medium">42</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Total Claps</span>
                      </div>
                      <span className="text-sm font-medium">5,678</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}