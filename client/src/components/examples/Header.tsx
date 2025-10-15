import Header from '../Header'
import femaleAuthorAvatar from "@assets/generated_images/Female_author_profile_photo_7ada6e1d.png"

export default function HeaderExample() {
  return (
    <div className="min-h-screen">
      {/* Logged out state */}
      <Header onSearch={(query) => console.log("Search:", query)} />
      
      <div className="p-8">
        <h2 className="text-lg font-semibold mb-4">Logged Out State</h2>
        <p className="text-muted-foreground mb-8">Header shows sign in and get started buttons</p>
        
        {/* Logged in state */}
        <div className="border rounded-lg">
          <Header 
            isLoggedIn={true}
            userAvatar={femaleAuthorAvatar}
            userName="Sarah Chen"
            onSearch={(query) => console.log("Search:", query)}
          />
        </div>
        <h2 className="text-lg font-semibold mt-4 mb-2">Logged In State</h2>
        <p className="text-muted-foreground">Header shows write button, notifications, and user menu</p>
      </div>
    </div>
  )
}