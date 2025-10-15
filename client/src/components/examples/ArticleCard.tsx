import ArticleCard from '../ArticleCard'
import techImage from "@assets/generated_images/Tech_article_featured_image_3617f300.png"
import wellnessImage from "@assets/generated_images/Wellness_article_featured_image_cea8b618.png"
import femaleAuthor from "@assets/generated_images/Female_author_profile_photo_7ada6e1d.png"
import maleAuthor from "@assets/generated_images/Male_author_profile_photo_2d3f88a6.png"

export default function ArticleCardExample() {
  //todo: remove mock functionality
  const mockArticles = [
    {
      id: "1",
      title: "The Future of Artificial Intelligence in Everyday Life",
      subtitle: "How AI is transforming the way we work, learn, and connect",
      content: "Artificial intelligence is no longer a distant future concept. From smart homes to personalized education, AI is revolutionizing how we interact with technology and each other. In this comprehensive guide, we explore the practical applications of AI that are already changing our daily routines and what we can expect in the coming years.",
      author: {
        name: "Dr. Sarah Chen",
        avatar: femaleAuthor,
        username: "sarahchen"
      },
      publishedAt: "2 days ago",
      readTime: "8 min read",
      featuredImage: techImage,
      tags: ["Technology", "AI", "Future", "Innovation"],
      claps: 234,
      comments: 18
    },
    {
      id: "2", 
      title: "Mindful Productivity: Finding Balance in a Digital World",
      subtitle: "Strategies for maintaining focus and well-being in our connected age",
      content: "In our hyperconnected world, finding true productivity while maintaining mental health has become increasingly challenging. This article explores practical techniques for mindful productivity, helping you achieve more while feeling less overwhelmed. From digital detox strategies to mindful work practices, discover how to thrive in the modern workplace.",
      author: {
        name: "Marcus Rodriguez",
        avatar: maleAuthor,
        username: "marcusr"
      },
      publishedAt: "5 days ago", 
      readTime: "6 min read",
      featuredImage: wellnessImage,
      tags: ["Wellness", "Productivity", "Mindfulness", "Work-Life Balance"],
      claps: 189,
      comments: 24
    },
    {
      id: "3",
      title: "Building Inclusive Communities in Open Source",
      content: "Open source software has transformed how we build technology, but creating truly inclusive communities remains a challenge. This piece examines successful strategies for fostering diversity and belonging in open source projects, with actionable insights for maintainers and contributors alike.",
      author: {
        name: "Alex Kim",
        avatar: femaleAuthor,
        username: "alexkim"
      },
      publishedAt: "1 week ago",
      readTime: "5 min read", 
      tags: ["Open Source", "Community", "Diversity", "Technology"],
      claps: 156,
      comments: 31
    }
  ];

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-serif font-bold mb-6">Article Cards</h2>
      <div className="space-y-6">
        {mockArticles.map((article) => (
          <ArticleCard
            key={article.id}
            {...article}
            onClapClick={(id) => console.log("Clap clicked:", id)}
            onCommentClick={(id) => console.log("Comment clicked:", id)}
            onBookmarkClick={(id) => console.log("Bookmark clicked:", id)}
            onCardClick={(id) => console.log("Card clicked:", id)}
          />
        ))}
      </div>
    </div>
  )
}