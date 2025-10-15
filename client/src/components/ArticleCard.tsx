import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface ArticleCardProps {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    username: string;
  };
  publishedAt: string;
  readTime: string;
  featuredImage?: string;
  tags: string[];
  claps: number;
  comments: number;
  isBookmarked?: boolean;
  onClapClick?: (id: string) => void;
  onCommentClick?: (id: string) => void;
  onBookmarkClick?: (id: string) => void;
  onCardClick?: (id: string) => void;
}

export default function ArticleCard({
  id,
  title,
  subtitle,
  content,
  author,
  publishedAt,
  readTime,
  featuredImage,
  tags,
  claps,
  comments,
  isBookmarked = false,
  onClapClick,
  onCommentClick,
  onBookmarkClick,
  onCardClick
}: ArticleCardProps) {
  const [clapCount, setClapCount] = useState(claps);
  const [hasClapped, setHasClapped] = useState(false);
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleClap = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasClapped) {
      setClapCount(prev => prev + 1);
      setHasClapped(true);
      onClapClick?.(id);
      console.log("Article clapped:", id);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
    onBookmarkClick?.(id);
    console.log("Article bookmarked:", id, !bookmarked);
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCommentClick?.(id);
    console.log("Comments clicked:", id);
  };

  return (
    <Card 
      className="hover-elevate cursor-pointer transition-all duration-200"
      onClick={() => {
        onCardClick?.(id);
        console.log("Article clicked:", id);
      }}
      data-testid={`card-article-${id}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Article Content */}
          <div className="flex-1 min-w-0">
            {/* Author Info */}
            <div className="flex items-center space-x-2 mb-3">
              <Avatar className="h-6 w-6">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback className="text-xs">{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{author.name}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{publishedAt}</span>
            </div>

            {/* Article Title & Content */}
            <h3 className="font-serif text-lg font-bold mb-2 line-clamp-2">
              {title}
            </h3>
            
            {subtitle && (
              <p className="text-muted-foreground text-sm mb-2 line-clamp-1">
                {subtitle}
              </p>
            )}
            
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              {content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs hover-elevate"
                  data-testid={`tag-${tag}`}
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <span className="text-xs text-muted-foreground">+{tags.length - 3}</span>
              )}
            </div>

            {/* Engagement Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  data-testid={`button-clap-${id}`}
                  variant="ghost"
                  size="sm"
                  onClick={handleClap}
                  className={`text-xs ${hasClapped ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  <Heart className={`h-4 w-4 mr-1 ${hasClapped ? 'fill-current' : ''}`} />
                  {clapCount}
                </Button>
                
                <Button
                  data-testid={`button-comment-${id}`}
                  variant="ghost"
                  size="sm"
                  onClick={handleComment}
                  className="text-xs text-muted-foreground"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {comments}
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">{readTime}</span>
                
                <Button
                  data-testid={`button-bookmark-${id}`}
                  variant="ghost"
                  size="icon"
                  onClick={handleBookmark}
                  className={`h-8 w-8 ${bookmarked ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                </Button>

                <Button
                  data-testid={`button-more-${id}`}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {featuredImage && (
            <div className="flex-shrink-0">
              <img
                src={featuredImage}
                alt={title}
                className="w-24 h-16 object-cover rounded-md"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}