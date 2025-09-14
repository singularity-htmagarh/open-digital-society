# Design Guidelines for Open Digital Society

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Medium.com's clean, content-focused design while incorporating non-profit organization aesthetics. The design emphasizes readability, writer-reader connection, and community engagement.

## Core Design Elements

### Color Palette
**Light Mode:**
- Primary: 210 15% 20% (deep charcoal for text)
- Secondary: 210 10% 45% (medium gray for metadata)
- Background: 0 0% 98% (warm white)
- Accent: 142 76% 36% (earthy green for non-profit feel)

**Dark Mode:**
- Primary: 0 0% 90% (light text)
- Secondary: 210 5% 65% (muted gray)
- Background: 210 20% 8% (deep dark blue-gray)
- Accent: 142 60% 45% (softer green)

### Typography
- **Primary Font**: Inter (Google Fonts) - for UI elements, navigation
- **Reading Font**: Georgia - for article content and headlines
- **Hierarchy**: 
  - Headlines: Georgia 32px-48px bold
  - Body: Georgia 18px regular, 1.6 line-height
  - UI Text: Inter 14px-16px various weights

### Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16
- Consistent p-4, m-6, gap-8 patterns
- Article content max-width: 680px centered
- Reading margins: px-8 on mobile, px-16 on desktop

### Component Library

**Navigation**
- Clean header with logo, search, and user menu
- Minimal navigation focusing on "Write", "Read", "Donate"
- Sticky navigation on scroll with subtle shadow

**Article Cards**
- Large featured image (if available)
- Title, subtitle, author info, read time
- Clap count and comment preview
- Clean typography hierarchy

**Reading Experience**
- Generous whitespace around content
- Floating action bar for claps/comments
- Progress indicator for reading
- Related articles section

**Forms & Interactions**
- Rounded corners (radius-md)
- Subtle shadows and hover states
- Focus rings for accessibility
- Success states in accent green

**Community Features**
- Comment threading with indentation
- User avatars and badges
- Donation CTAs with warm, inviting styling
- Tag system with pill-style badges

### Special Considerations
- **Open Access Badge**: Distinctive green badge for free content
- **Donation Flow**: Warm, community-focused design with impact messaging
- **Writer Dashboard**: Clean, data-focused interface for analytics
- **Mobile-First**: Optimized reading experience on all devices

### Images
- **Hero Section**: Large, inspiring image representing knowledge sharing and community
- **Article Headers**: Optional featured images, properly sized and optimized
- **User Avatars**: Circular, consistent sizing across platform
- **Illustration Style**: Clean, modern illustrations for empty states and onboarding

This design creates a trustworthy, readable platform that honors Medium's proven UX patterns while establishing Open Digital Society's unique non-profit identity.