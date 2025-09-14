// User profile page
import { useParams } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, BookOpen, Users, Edit, Settings, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuth();
  
  // For now, we'll use mock data. In a real app, this would fetch the user by username
  const isOwnProfile = true; // This would be determined by comparing username with current user

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          {isOwnProfile && (
            <Link href="/settings">
              <Button variant="outline" size="sm" data-testid="button-edit-profile">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={currentUser?.profileImageUrl} />
                  <AvatarFallback className="text-2xl">
                    {currentUser?.firstName?.[0]}{currentUser?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h1 className="text-3xl font-bold" data-testid="text-profile-name">
                      {currentUser?.firstName} {currentUser?.lastName}
                    </h1>
                    <p className="text-muted-foreground">@{username}</p>
                  </div>
                  
                  {currentUser?.bio && (
                    <p className="text-lg leading-relaxed max-w-2xl">
                      {currentUser.bio}
                    </p>
                  )}
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{currentUser?.followersCount || 0} followers</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>{currentUser?.followingCount || 0} following</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{currentUser?.totalClaps || 0} claps received</span>
                    </div>
                  </div>
                  
                  {currentUser?.isWriter && (
                    <Badge variant="secondary">
                      <Edit className="h-3 w-3 mr-1" />
                      Writer
                    </Badge>
                  )}
                </div>

                {!isOwnProfile && (
                  <div className="flex flex-col space-y-2">
                    <Button data-testid="button-follow">
                      Follow
                    </Button>
                    <Button variant="outline" size="sm">
                      Message
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="articles" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="liked">Liked</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            
            <TabsContent value="articles" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Published Articles</h2>
                <span className="text-sm text-muted-foreground">12 articles</span>
              </div>
              
              {/* Article List */}
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="hover-elevate">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">
                            Sample Article Title {i}
                          </h3>
                          <p className="text-muted-foreground mb-3">
                            This is a sample article description that gives readers 
                            an overview of what to expect from the content...
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Dec 14, 2024</span>
                            <span>•</span>
                            <span>5 min read</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                              <span>{Math.floor(Math.random() * 100) + 10}</span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="w-20 h-20 bg-muted rounded-lg"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="drafts" className="space-y-6">
              {isOwnProfile ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Draft Articles</h2>
                    <Link href="/write">
                      <Button size="sm" data-testid="button-new-draft">
                        <Edit className="h-4 w-4 mr-2" />
                        New Article
                      </Button>
                    </Link>
                  </div>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <BookOpen className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        No drafts yet. Start writing your first article!
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">
                      Drafts are only visible to the author.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="liked" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Liked Articles</h2>
                <span className="text-sm text-muted-foreground">5 articles</span>
              </div>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Articles you've clapped for will appear here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Bio</h4>
                    <p className="text-muted-foreground">
                      {currentUser?.bio || "No bio available."}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Joined</h4>
                    <p className="text-muted-foreground">
                      December 2024
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Writing Stats</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Articles</p>
                        <p className="text-muted-foreground">12</p>
                      </div>
                      <div>
                        <p className="font-medium">Total Claps</p>
                        <p className="text-muted-foreground">{currentUser?.totalClaps || 0}</p>
                      </div>
                      <div>
                        <p className="font-medium">Followers</p>
                        <p className="text-muted-foreground">{currentUser?.followersCount || 0}</p>
                      </div>
                      <div>
                        <p className="font-medium">Following</p>
                        <p className="text-muted-foreground">{currentUser?.followingCount || 0}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}