import './BucketList.css'

// Simple tab bar for switching between Wish List and Visited List
export default function BucketListTabs({ activeTab, onChange }) {
  return (
    <div className="bl-tabs" role="tablist">
      <button
        role="tab"
        aria-selected={activeTab === 'wishlist'}
        className={`bl-tab ${activeTab === 'wishlist' ? 'active' : ''}`}
        onClick={() => onChange('wishlist')}
      >
        🤍 Wish List
      </button>
      <button
        role="tab"
        aria-selected={activeTab === 'visited'}
        className={`bl-tab ${activeTab === 'visited' ? 'active' : ''}`}
        onClick={() => onChange('visited')}
      >
        ✅ Visited
      </button>
    </div>
  )
}
