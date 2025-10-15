import ThemeToggle from '../ThemeToggle'

export default function ThemeToggleExample() {
  return (
    <div className="p-8">
      <h2 className="text-lg font-semibold mb-4">Theme Toggle</h2>
      <p className="text-muted-foreground mb-4">Click to switch between light and dark themes</p>
      <ThemeToggle />
    </div>
  )
}