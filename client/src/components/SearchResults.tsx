import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, SortDesc, Users, BookOpen, Hash } from "lucide-react";
import { useState } from "react";
import ArticleCard from "./ArticleCard";
import AuthorProfile from "./AuthorProfile";

interface SearchResult {
  type: 'article' | 'author' | 'tag';
  data: any;
}

interface SearchResultsProps {
  query: string;
  results: SearchResult[];
  totalResults: number;
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: string[]) => void;
  onSortChange?: (sort: string) => void;
}

export default function SearchResults({
  query,
  results,
  totalResults,
  onSearch,
  onFilterChange,
  onSortChange
}: SearchResultsProps) {
  const [searchInput, setSearchInput] = useState(query);
  const [activeFilters, setActiveFilters] = useState<string[]>(['all']);
  const [sortBy, setSortBy] = useState('relevance');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchInput);
    console.log("Search submitted:", searchInput);
  };

  const handleFilterToggle = (filter: string) => {
    let newFilters;
    if (filter === 'all') {
      newFilters = ['all'];
    } else {
      newFilters = activeFilters.includes(filter)
        ? activeFilters.filter(f => f !== filter && f !== 'all')
        : [...activeFilters.filter(f => f !== 'all'), filter];
      
      if (newFilters.length === 0) {
        newFilters = ['all'];
      }
    }
    
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
    console.log("Filters changed:", newFilters);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    onSortChange?.(newSort);
    console.log("Sort changed:", newSort);
  };

  const filterCounts = {
    articles: results.filter(r => r.type === 'article').length,
    authors: results.filter(r => r.type === 'author').length,
    tags: results.filter(r => r.type === 'tag').length,
  };

  return (
    <div className="container py-8">
      {/* Search Header */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            data-testid="input-search-results"
            placeholder="Search articles, writers, topics..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </form>
        
        <div className="mt-4">
          <p className="text-muted-foreground">
            <span className="font-medium">{totalResults.toLocaleString()}</span> results for 
            <span className="font-medium"> "{query}"</span>
          </p>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Filters */}
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter:</span>
          
          <Button
            data-testid="filter-all"
            variant={activeFilters.includes('all') ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterToggle('all')}
          >
            All ({totalResults})
          </Button>
          
          <Button
            data-testid="filter-articles"
            variant={activeFilters.includes('articles') ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterToggle('articles')}
            className="space-x-1"
          >
            <BookOpen className="h-3 w-3" />
            <span>Articles ({filterCounts.articles})</span>
          </Button>
          
          <Button
            data-testid="filter-authors"
            variant={activeFilters.includes('authors') ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterToggle('authors')}
            className="space-x-1"
          >
            <Users className="h-3 w-3" />
            <span>Authors ({filterCounts.authors})</span>
          </Button>
          
          <Button
            data-testid="filter-tags"
            variant={activeFilters.includes('tags') ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterToggle('tags')}
            className="space-x-1"
          >
            <Hash className="h-3 w-3" />
            <span>Tags ({filterCounts.tags})</span>
          </Button>
        </div>

        {/* Sort */}
        <div className="flex items-center space-x-2 md:ml-auto">
          <SortDesc className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Sort:</span>
          
          <Button
            data-testid="sort-relevance"
            variant={sortBy === 'relevance' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSortChange('relevance')}
          >
            Relevance
          </Button>
          
          <Button
            data-testid="sort-recent"
            variant={sortBy === 'recent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSortChange('recent')}
          >
            Most Recent
          </Button>
          
          <Button
            data-testid="sort-popular"
            variant={sortBy === 'popular' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSortChange('popular')}
          >
            Popular
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {results.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </CardContent>
          </Card>
        ) : (
          results.map((result, index) => {
            const shouldShow = activeFilters.includes('all') || 
                             activeFilters.includes(result.type === 'article' ? 'articles' : 
                                                   result.type === 'author' ? 'authors' : 'tags');
            
            if (!shouldShow) return null;

            return (
              <div key={`${result.type}-${index}`}>
                {result.type === 'article' && (
                  <ArticleCard
                    {...result.data}
                    onClapClick={(id) => console.log("Search result clapped:", id)}
                    onCommentClick={(id) => console.log("Search result comment clicked:", id)}
                    onBookmarkClick={(id) => console.log("Search result bookmarked:", id)}
                    onCardClick={(id) => console.log("Search result clicked:", id)}
                  />
                )}
                
                {result.type === 'author' && (
                  <AuthorProfile
                    author={result.data}
                    onFollowClick={(username) => console.log("Author followed from search:", username)}
                    onProfileClick={(username) => console.log("Author profile clicked from search:", username)}
                  />
                )}
                
                {result.type === 'tag' && (
                  <Card className="hover-elevate cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            #{result.data.name}
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            {result.data.articleCount} articles • {result.data.followerCount} followers
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => console.log("Tag followed:", result.data.name)}
                        >
                          Follow
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}