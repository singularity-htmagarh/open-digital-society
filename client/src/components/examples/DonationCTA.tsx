import DonationCTA from '../DonationCTA'

export default function DonationCTAExample() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-serif font-bold mb-6">Donation Call-to-Action</h2>
      <div className="max-w-md mx-auto">
        <DonationCTA 
          onDonateClick={(amount) => console.log("Donate clicked:", amount || "custom")}
          onLearnMoreClick={() => console.log("Learn more clicked")}
        />
      </div>
    </div>
  )
}