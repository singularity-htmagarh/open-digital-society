import { Search, Menu, User, Bell, Edit, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  onSearch?: (query: string) => void;
  isLoggedIn?: boolean;
  userAvatar?: string;
  userName?: string;
}

export default function Header({ onSearch, isLoggedIn = false, userAvatar, userName }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
    console.log("Search triggered:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2" data-testid="logo-link">
            <Heart className="h-6 w-6 text-primary" />
            <span className="font-serif text-xl font-bold">Open Digital Society</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              data-testid="input-search"
              placeholder="Search articles, writers, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </form>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          
          {isLoggedIn ? (
            <>
              <Button data-testid="button-write" size="sm" className="hidden sm:flex">
                <Edit className="h-4 w-4 mr-2" />
                Write
              </Button>
              
              <Button data-testid="button-notifications" variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button data-testid="button-user-menu" variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback>{userName?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem data-testid="link-profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem data-testid="link-dashboard">
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem data-testid="link-settings">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem data-testid="button-logout">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button data-testid="button-login" variant="ghost" size="sm">
                Sign In
              </Button>
              <Button data-testid="button-signup" size="sm">
                Get Started
              </Button>
            </div>
          )}

          <Button data-testid="button-menu" variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}