import AuthorProfile from '../AuthorProfile'
import femaleAuthor from "@assets/generated_images/Female_author_profile_photo_7ada6e1d.png"
import maleAuthor from "@assets/generated_images/Male_author_profile_photo_2d3f88a6.png"

export default function AuthorProfileExample() {
  //todo: remove mock functionality
  const mockAuthors = [
    {
      name: "Dr. Sarah Chen",
      username: "sarahchen",
      avatar: femaleAuthor,
      bio: "AI researcher and writer passionate about the intersection of technology and human creativity. PhD in Computer Science from Stanford.",
      followers: 12500,
      following: 234,
      articles: 47,
      totalClaps: 8900
    },
    {
      name: "Marcus Rodriguez", 
      username: "marcusr",
      avatar: maleAuthor,
      bio: "Mindfulness coach and productivity expert. Helping professionals find balance in the digital age through evidence-based practices.",
      followers: 8750,
      following: 189,
      articles: 32,
      totalClaps: 5600
    }
  ];

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-serif font-bold mb-6">Author Profiles</h2>
      <div className="space-y-4">
        {mockAuthors.map((author) => (
          <AuthorProfile
            key={author.username}
            author={author}
            onFollowClick={(username) => console.log("Follow clicked:", username)}
            onProfileClick={(username) => console.log("Profile clicked:", username)}
          />
        ))}
      </div>
    </div>
  )
}