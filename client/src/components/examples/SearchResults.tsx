import SearchResults from '../SearchResults'
import techImage from "@assets/generated_images/Tech_article_featured_image_3617f300.png"
import wellnessImage from "@assets/generated_images/Wellness_article_featured_image_cea8b618.png"
import femaleAuthor from "@assets/generated_images/Female_author_profile_photo_7ada6e1d.png"
import maleAuthor from "@assets/generated_images/Male_author_profile_photo_2d3f88a6.png"

export default function SearchResultsExample() {
  //todo: remove mock functionality
  const mockResults = [
    {
      type: 'article' as const,
      data: {
        id: "1",
        title: "The Future of Artificial Intelligence in Everyday Life",
        subtitle: "How AI is transforming the way we work, learn, and connect",
        content: "Artificial intelligence is no longer a distant future concept...",
        author: {
          name: "Dr. Sarah Chen",
          avatar: femaleAuthor,
          username: "sarahchen"
        },
        publishedAt: "2 days ago",
        readTime: "8 min read",
        featuredImage: techImage,
        tags: ["Technology", "AI", "Future"],
        claps: 234,
        comments: 18
      }
    },
    {
      type: 'author' as const,
      data: {
        name: "Marcus Rodriguez",
        username: "marcusr",
        avatar: maleAuthor,
        bio: "Mindfulness coach and productivity expert helping professionals find balance.",
        followers: 8750,
        following: 189,
        articles: 32,
        totalClaps: 5600
      }
    },
    {
      type: 'tag' as const,
      data: {
        name: "artificial-intelligence",
        articleCount: 156,
        followerCount: 2340
      }
    },
    {
      type: 'article' as const,
      data: {
        id: "2",
        title: "Mindful Productivity in a Digital World",
        content: "Finding balance while staying productive in our connected age...",
        author: {
          name: "Marcus Rodriguez",
          avatar: maleAuthor,
          username: "marcusr"
        },
        publishedAt: "5 days ago",
        readTime: "6 min read",
        featuredImage: wellnessImage,
        tags: ["Productivity", "Mindfulness"],
        claps: 189,
        comments: 24
      }
    }
  ];

  return (
    <SearchResults
      query="artificial intelligence"
      results={mockResults}
      totalResults={mockResults.length}
      onSearch={(query) => console.log("New search:", query)}
      onFilterChange={(filters) => console.log("Filters changed:", filters)}
      onSortChange={(sort) => console.log("Sort changed:", sort)}
    />
  )
}