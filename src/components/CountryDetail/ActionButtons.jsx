import { useBucketList } from '../../context/BucketListContext'
import './CountryDetail.css'

export default function ActionButtons({ country }) {
  const {
    isInBucketList,
    isVisited,
    addToBucketList,
    removeFromBucketList,
    markAsVisited,
    removeFromVisited,
  } = useBucketList()

  const inBucket   = isInBucketList(country.cca3)
  const hasVisited = isVisited(country.cca3)

  function handleBucketList() {
    if (inBucket) {
      removeFromBucketList(country.cca3)
    } else {
      addToBucketList(country)
    }
  }

  function handleVisited() {
    if (hasVisited) {
      removeFromVisited(country.cca3)
    } else {
      markAsVisited(country)
    }
  }

  return (
    <div className="action-buttons">
      <button
        className={`action-btn bucket ${inBucket ? 'active' : ''}`}
        onClick={handleBucketList}
      >
        {inBucket ? '❤️ In Bucket List' : '🤍 Add to Bucket List'}
      </button>

      <button
        className={`action-btn visited ${hasVisited ? 'active' : ''}`}
        onClick={handleVisited}
      >
        {hasVisited ? '✅ Visited!' : '☑️ Mark as Visited'}
      </button>
    </div>
  )
}
