import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Import our main components
import LandingPage from "@/components/LandingPage";
import SearchResults from "@/components/SearchResults";
import CommentSection from "@/components/CommentSection";

// Import component examples for demonstration
import HeaderExample from "@/components/examples/Header";
import HeroSectionExample from "@/components/examples/HeroSection";
import ArticleCardExample from "@/components/examples/ArticleCard";
import AuthorProfileExample from "@/components/examples/AuthorProfile";
import DonationCTAExample from "@/components/examples/DonationCTA";
import CommentSectionExample from "@/components/examples/CommentSection";
import SearchResultsExample from "@/components/examples/SearchResults";
import FooterExample from "@/components/examples/Footer";
import ThemeToggleExample from "@/components/examples/ThemeToggle";

function Router() {
  return (
    <Switch>
      {/* Main landing page */}
      <Route path="/" component={LandingPage} />
      
      {/* Component demonstration pages */}
      <Route path="/examples/header" component={HeaderExample} />
      <Route path="/examples/hero" component={HeroSectionExample} />
      <Route path="/examples/article-card" component={ArticleCardExample} />
      <Route path="/examples/author-profile" component={AuthorProfileExample} />
      <Route path="/examples/donation" component={DonationCTAExample} />
      <Route path="/examples/comments" component={CommentSectionExample} />
      <Route path="/examples/search" component={SearchResultsExample} />
      <Route path="/examples/footer" component={FooterExample} />
      <Route path="/examples/theme-toggle" component={ThemeToggleExample} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;