// Article detail/reading page
import { useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Bookmark, Share2, Eye, Calendar, Clock, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");

  const { data: article, isLoading } = useQuery({
    queryKey: ["/api/articles", id],
  });

  const { data: comments } = useQuery({
    queryKey: ["/api/articles", id, "comments"],
  });

  const clapMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest(`/api/articles/${id}/clap`, "POST");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles", id] });
      toast({
        title: "Clapped!",
        description: "Thanks for showing your appreciation.",
      });
    },
    onError: (error: any) => {
      if (error.message.includes("Already clapped")) {
        toast({
          title: "Already clapped",
          description: "You've already clapped for this article.",
          variant: "destructive",
        });
      }
    },
  });

  const commentMutation = useMutation({
    mutationFn: async (content: string) => {
      return await apiRequest(`/api/articles/${id}/comments`, "POST", { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles", id, "comments"] });
      setNewComment("");
      toast({
        title: "Comment posted!",
        description: "Your comment has been added.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleClap = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to clap for articles.",
        variant: "destructive",
      });
      return;
    }
    clapMutation.mutate();
  };

  const handleComment = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required", 
        description: "Please sign in to leave comments.",
        variant: "destructive",
      });
      return;
    }
    if (!newComment.trim()) return;
    commentMutation.mutate(newComment.trim());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b p-4">
          <div className="container mx-auto">
            <Skeleton className="h-8 w-32" />
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Article not found</h1>
          <p className="text-muted-foreground mb-4">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              data-testid="button-share"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              data-testid="button-bookmark"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            {article.isOpenAccess && (
              <Badge variant="secondary" className="mb-4">
                Open Access
              </Badge>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-article-title">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="text-xl text-muted-foreground mb-6">
                {article.subtitle}
              </p>
            )}
            
            {/* Author and metadata */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Author Name</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Dec 14, 2024
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime || 5} min read
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {article.viewsCount || 0} views
                </span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="mb-8">
              <img 
                src={article.featuredImage} 
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-8" data-testid="text-article-content">
            {article.content ? (
              article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))
            ) : (
              <p>No content available.</p>
            )}
          </div>

          {/* Article Actions */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleClap}
                    disabled={clapMutation.isPending}
                    data-testid="button-clap"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    {article.clapsCount || 0} Claps
                  </Button>
                  <Button variant="ghost" size="sm" data-testid="button-comment">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {article.commentsCount || 0} Comments
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Follow Author
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Comments</h2>
            
            {/* Add Comment */}
            {isAuthenticated && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profileImageUrl} />
                      <AvatarFallback>
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <Textarea
                        placeholder="Share your thoughts..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[100px]"
                        data-testid="textarea-new-comment"
                      />
                      <Button 
                        size="sm"
                        onClick={handleComment}
                        disabled={commentMutation.isPending || !newComment.trim()}
                        data-testid="button-post-comment"
                      >
                        {commentMutation.isPending ? "Posting..." : "Post Comment"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {comments && comments.length > 0 ? (
                comments.map((comment: any) => (
                  <Card key={comment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>AU</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium">Commenter Name</span>
                            <span className="text-sm text-muted-foreground">
                              2 hours ago
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed">
                            {comment.content}
                          </p>
                          <div className="flex items-center space-x-4 mt-3">
                            <Button variant="ghost" size="sm">
                              <Heart className="h-3 w-3 mr-1" />
                              {comment.clapsCount || 0}
                            </Button>
                            <Button variant="ghost" size="sm">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}