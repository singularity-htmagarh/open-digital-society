import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Users, BookOpen, Heart } from "lucide-react";
import { useState } from "react";

interface AuthorProfileProps {
  author: {
    name: string;
    username: string;
    avatar?: string;
    bio: string;
    followers: number;
    following: number;
    articles: number;
    totalClaps: number;
  };
  isFollowing?: boolean;
  onFollowClick?: (username: string) => void;
  onProfileClick?: (username: string) => void;
}

export default function AuthorProfile({ 
  author, 
  isFollowing = false, 
  onFollowClick,
  onProfileClick 
}: AuthorProfileProps) {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = () => {
    setFollowing(!following);
    onFollowClick?.(author.username);
    console.log("Follow toggled:", author.username, !following);
  };

  const handleProfileClick = () => {
    onProfileClick?.(author.username);
    console.log("Profile clicked:", author.username);
  };

  return (
    <Card className="hover-elevate cursor-pointer" onClick={handleProfileClick}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <Avatar 
            className="h-12 w-12"
            data-testid={`avatar-${author.username}`}
          >
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className="text-lg">{author.name.charAt(0)}</AvatarFallback>
          </Avatar>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h3 
                  className="font-semibold text-base"
                  data-testid={`text-author-name-${author.username}`}
                >
                  {author.name}
                </h3>
                <p 
                  className="text-sm text-muted-foreground"
                  data-testid={`text-author-username-${author.username}`}
                >
                  @{author.username}
                </p>
              </div>

              <Button
                data-testid={`button-follow-${author.username}`}
                variant={following ? "secondary" : "default"}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFollow();
                }}
                className="ml-2"
              >
                <UserPlus className="h-4 w-4 mr-1" />
                {following ? "Following" : "Follow"}
              </Button>
            </div>

            {/* Bio */}
            <p 
              className="text-sm text-muted-foreground mt-2 line-clamp-2"
              data-testid={`text-author-bio-${author.username}`}
            >
              {author.bio}
            </p>

            {/* Stats */}
            <div className="flex items-center space-x-6 mt-4 text-sm">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span data-testid={`text-followers-${author.username}`}>
                  <strong>{author.followers.toLocaleString()}</strong> followers
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span data-testid={`text-articles-${author.username}`}>
                  <strong>{author.articles}</strong> articles
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4 text-muted-foreground" />
                <span data-testid={`text-claps-${author.username}`}>
                  <strong>{author.totalClaps.toLocaleString()}</strong> claps
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}