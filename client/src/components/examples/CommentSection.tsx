import CommentSection from '../CommentSection'
import femaleAuthor from "@assets/generated_images/Female_author_profile_photo_7ada6e1d.png"
import maleAuthor from "@assets/generated_images/Male_author_profile_photo_2d3f88a6.png"

export default function CommentSectionExample() {
  //todo: remove mock functionality
  const mockComments = [
    {
      id: "1",
      author: {
        name: "Sarah Chen",
        avatar: femaleAuthor,
        username: "sarahchen"
      },
      content: "This is such an insightful article! I particularly appreciated the section on practical applications. It really helped me understand how these concepts apply to my daily work.",
      publishedAt: "2 hours ago",
      claps: 12,
      replies: [
        {
          id: "1-1",
          author: {
            name: "Marcus Rodriguez",
            avatar: maleAuthor,
            username: "marcusr"
          },
          content: "I completely agree! The practical examples really make the difference in understanding complex topics.",
          publishedAt: "1 hour ago",
          claps: 3
        }
      ]
    },
    {
      id: "2",
      author: {
        name: "Alex Kim",
        avatar: femaleAuthor,
        username: "alexkim"
      },
      content: "Great read! I'd love to see a follow-up article diving deeper into the implementation details you mentioned.",
      publishedAt: "4 hours ago",
      claps: 8
    }
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-serif font-bold mb-6">Comment Section</h2>
      <div className="max-w-2xl">
        <CommentSection
          comments={mockComments}
          onAddComment={(content) => console.log("New comment:", content)}
          onClapComment={(id) => console.log("Comment clapped:", id)}
          onReplyComment={(id, content) => console.log("Reply to comment:", id, content)}
        />
      </div>
    </div>
  )
}