import Header from "./Header";
import HeroSection from "./HeroSection";
import ArticleCard from "./ArticleCard";
import AuthorProfile from "./AuthorProfile";
import DonationCTA from "./DonationCTA";
import Footer from "./Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, BookOpen, Users, ArrowRight } from "lucide-react";

// Import generated images
import techImage from "@assets/generated_images/Tech_article_featured_image_3617f300.png";
import wellnessImage from "@assets/generated_images/Wellness_article_featured_image_cea8b618.png";
import femaleAuthor from "@assets/generated_images/Female_author_profile_photo_7ada6e1d.png";
import maleAuthor from "@assets/generated_images/Male_author_profile_photo_2d3f88a6.png";

export default function LandingPage() {
  //todo: remove mock functionality
  const featuredArticles = [
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

  const featuredAuthors = [
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

  const trendingTopics = [
    "Artificial Intelligence", "Mindfulness", "Open Source", "Climate Change", 
    "Digital Privacy", "Remote Work", "Cryptocurrency", "Mental Health"
  ];

  return (
    <div className="min-h-screen">
      <Header 
        onSearch={(query) => console.log("Search:", query)}
        isLoggedIn={false}
      />
      
      <main>
        {/* Hero Section */}
        <HeroSection 
          onGetStarted={() => console.log("Get started clicked")}
          onLearnMore={() => console.log("Learn more clicked")}
        />

        {/* Trending Topics */}
        <section className="py-12 border-b">
          <div className="container">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-serif font-bold">Trending Topics</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingTopics.map((topic) => (
                <Badge 
                  key={topic}
                  variant="secondary" 
                  className="hover-elevate cursor-pointer"
                  data-testid={`topic-${topic.toLowerCase().replace(' ', '-')}`}
                  onClick={() => console.log("Topic clicked:", topic)}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-serif font-bold">Featured Articles</h2>
              </div>
              <Button 
                variant="outline"
                data-testid="button-view-all-articles"
                onClick={() => console.log("View all articles clicked")}
              >
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-6">
              {featuredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  {...article}
                  onClapClick={(id) => console.log("Article clapped:", id)}
                  onCommentClick={(id) => console.log("Comments clicked:", id)}
                  onBookmarkClick={(id) => console.log("Article bookmarked:", id)}
                  onCardClick={(id) => console.log("Article clicked:", id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Authors */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-serif font-bold">Featured Writers</h2>
              </div>
              <Button 
                variant="outline"
                data-testid="button-view-all-writers"
                onClick={() => console.log("View all writers clicked")}
              >
                Discover Writers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredAuthors.map((author) => (
                <AuthorProfile
                  key={author.username}
                  author={author}
                  onFollowClick={(username) => console.log("Follow clicked:", username)}
                  onProfileClick={(username) => console.log("Profile clicked:", username)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Donation CTA */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-md mx-auto">
              <DonationCTA 
                onDonateClick={(amount) => console.log("Donate clicked:", amount || "custom")}
                onLearnMoreClick={() => console.log("Learn more about impact clicked")}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer onNewsletterSignup={(email) => console.log("Newsletter signup:", email)} />
    </div>
  );
}