import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Reply, MoreHorizontal, MessageCircle } from "lucide-react";
import { useState } from "react";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
    username: string;
  };
  content: string;
  publishedAt: string;
  claps: number;
  replies?: Comment[];
  hasClapped?: boolean;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment?: (content: string) => void;
  onClapComment?: (commentId: string) => void;
  onReplyComment?: (commentId: string, content: string) => void;
}

function CommentItem({ comment, onClap, onReply, level = 0 }: {
  comment: Comment;
  onClap?: (id: string) => void;
  onReply?: (id: string, content: string) => void;
  level?: number;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [clapped, setClapped] = useState(comment.hasClapped || false);
  const [clapCount, setClapCount] = useState(comment.claps);

  const handleClap = () => {
    if (!clapped) {
      setClapped(true);
      setClapCount(prev => prev + 1);
      onClap?.(comment.id);
      console.log("Comment clapped:", comment.id);
    }
  };

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply?.(comment.id, replyContent);
      setReplyContent("");
      setShowReplyForm(false);
      console.log("Reply submitted:", comment.id, replyContent);
    }
  };

  return (
    <div className={`${level > 0 ? 'ml-8 border-l pl-4' : ''}`}>
      <div className="flex space-x-3 py-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback className="text-xs">{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-medium">{comment.author.name}</span>
            <span className="text-xs text-muted-foreground">@{comment.author.username}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{comment.publishedAt}</span>
          </div>

          <p className="text-sm mb-2" data-testid={`text-comment-${comment.id}`}>
            {comment.content}
          </p>

          <div className="flex items-center space-x-4">
            <Button
              data-testid={`button-clap-comment-${comment.id}`}
              variant="ghost"
              size="sm"
              onClick={handleClap}
              className={`text-xs h-6 ${clapped ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Heart className={`h-3 w-3 mr-1 ${clapped ? 'fill-current' : ''}`} />
              {clapCount}
            </Button>

            <Button
              data-testid={`button-reply-comment-${comment.id}`}
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-xs h-6 text-muted-foreground"
            >
              <Reply className="h-3 w-3 mr-1" />
              Reply
            </Button>

            <Button
              data-testid={`button-more-comment-${comment.id}`}
              variant="ghost"
              size="sm"
              className="text-xs h-6 text-muted-foreground"
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>

          {showReplyForm && (
            <div className="mt-3 space-y-2">
              <Textarea
                data-testid={`input-reply-${comment.id}`}
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[60px] text-sm"
              />
              <div className="flex space-x-2">
                <Button 
                  data-testid={`button-submit-reply-${comment.id}`}
                  size="sm" 
                  onClick={handleReply}
                  disabled={!replyContent.trim()}
                >
                  Reply
                </Button>
                <Button 
                  data-testid={`button-cancel-reply-${comment.id}`}
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowReplyForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onClap={onClap}
                  onReply={onReply}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CommentSection({ 
  comments, 
  onAddComment, 
  onClapComment, 
  onReplyComment 
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment?.(newComment);
      setNewComment("");
      console.log("New comment added:", newComment);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5" />
          <span className="font-semibold">Comments ({comments.length})</span>
        </div>
      </CardHeader>
      <CardContent>
        {/* Add Comment Form */}
        <div className="space-y-3 mb-6">
          <Textarea
            data-testid="input-new-comment"
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px]"
          />
          <Button 
            data-testid="button-submit-comment"
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            Post Comment
          </Button>
        </div>

        {/* Comments List */}
        <div className="space-y-1">
          {comments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onClap={onClapComment}
                onReply={onReplyComment}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}