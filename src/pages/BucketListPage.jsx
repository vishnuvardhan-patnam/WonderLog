import { useState } from 'react'
import BucketListTabs from '../components/BucketList/BucketListTabs'
import WishList from '../components/BucketList/WishList'
import VisitedList from '../components/BucketList/VisitedList'
import { useBucketList } from '../context/BucketListContext'
import './Pages.css'

export default function BucketListPage() {
  const [activeTab, setActiveTab] = useState('wishlist')
  const { bucketList, visited } = useBucketList()

  return (
    <div className="page bucketlist-page">
      <div className="bucketlist-header">
        <div>
          <h1 className="page-title">My Bucket List</h1>
          <p className="page-sub">
            {bucketList.length} to visit · {visited.length} visited
          </p>
        </div>
      </div>

      <BucketListTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'wishlist' ? <WishList /> : <VisitedList />}
    </div>
  )
}
