// Article creation/editing page
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { BookOpen, Save, Eye, Upload, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Write() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [article, setArticle] = useState({
    title: "",
    subtitle: "",
    content: "",
    excerpt: "",
    featuredImage: "",
    isOpenAccess: true,
    status: "draft"
  });

  const createArticleMutation = useMutation({
    mutationFn: async (articleData: any) => {
      return await apiRequest("/api/articles", "POST", articleData);
    },
    onSuccess: (data) => {
      toast({
        title: "Article saved!",
        description: "Your article has been saved successfully.",
      });
      setLocation(`/article/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save article. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSave = (status: string) => {
    if (!article.title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title to your article.",
        variant: "destructive",
      });
      return;
    }

    if (!article.content.trim()) {
      toast({
        title: "Content required", 
        description: "Please add some content to your article.",
        variant: "destructive",
      });
      return;
    }

    createArticleMutation.mutate({
      ...article,
      status,
      excerpt: article.excerpt || article.content.substring(0, 200) + "...",
      readTime: Math.ceil(article.content.split(" ").length / 200), // Estimate reading time
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">Write Article</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleSave("draft")}
              disabled={createArticleMutation.isPending}
              data-testid="button-save-draft"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              data-testid="button-preview"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button 
              size="sm"
              onClick={() => handleSave("published")}
              disabled={createArticleMutation.isPending}
              data-testid="button-publish"
            >
              {createArticleMutation.isPending ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <Input
                  placeholder="Article title..."
                  value={article.title}
                  onChange={(e) => setArticle({ ...article, title: e.target.value })}
                  className="text-3xl font-bold border-none p-0 focus-visible:ring-0 placeholder:text-muted-foreground"
                  data-testid="input-title"
                />
                <Input
                  placeholder="Subtitle (optional)"
                  value={article.subtitle}
                  onChange={(e) => setArticle({ ...article, subtitle: e.target.value })}
                  className="text-lg border-none p-0 focus-visible:ring-0 placeholder:text-muted-foreground"
                  data-testid="input-subtitle"
                />
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Tell your story..."
                  value={article.content}
                  onChange={(e) => setArticle({ ...article, content: e.target.value })}
                  className="min-h-[500px] text-base border-none p-0 focus-visible:ring-0 resize-none"
                  data-testid="textarea-content"
                />
              </CardContent>
            </Card>
          </div>

          {/* Settings Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              {/* Publishing Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Publishing Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief description of your article..."
                      value={article.excerpt}
                      onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                      className="text-sm"
                      rows={3}
                      data-testid="textarea-excerpt"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="featured-image">Featured Image URL</Label>
                    <Input
                      id="featured-image"
                      placeholder="https://example.com/image.jpg"
                      value={article.featuredImage}
                      onChange={(e) => setArticle({ ...article, featuredImage: e.target.value })}
                      data-testid="input-featured-image"
                    />
                    <Button variant="outline" size="sm" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="open-access">Open Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Make this article freely available to all readers
                      </p>
                    </div>
                    <Switch
                      id="open-access"
                      checked={article.isOpenAccess}
                      onCheckedChange={(checked) => setArticle({ ...article, isOpenAccess: checked })}
                      data-testid="switch-open-access"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tags</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Add tags..."
                    data-testid="input-tags"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Technology</Badge>
                    <Badge variant="secondary">Society</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Help readers discover your article by adding relevant tags
                  </p>
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Words:</span>
                    <span data-testid="text-word-count">
                      {article.content.split(" ").filter(word => word.length > 0).length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Characters:</span>
                    <span>{article.content.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Read time:</span>
                    <span>{Math.ceil(article.content.split(" ").length / 200)} min</span>
                  </div>
                </CardContent>
              </Card>

              {/* Author Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Author</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user?.email}
                      </p>
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