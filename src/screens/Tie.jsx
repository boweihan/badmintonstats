import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { GameService } from '@/services/DatabaseService'
import PageHeading from '@/components/ui/PageHeading'
import Alert from '@/components/ui/Alert'
import { didWinSet } from '@/util/util'
import SetDisplay from '@/components/tie/SetDisplay'

function Group() {
  const currentUser = useCurrentUser()
  const { id } = useParams()

  const { data, isLoading, error, status } = useQuery(
    ['games', { property: 'tie', value: id }],
    GameService.getByPropertyValue
  )

  if (!currentUser) {
    // TODO: secure client routes
  }

  const wonSets = []
  const lostSets = []

  if (data && currentUser) {
    const buckets = {}

    data.forEach((game) => {
      if (buckets[game.set]) {
        buckets[game.set].push(game)
      } else {
        buckets[game.set] = [game]
      }
    })

    Object.keys(buckets).forEach((setId) => {
      const set = buckets[setId]
      if (didWinSet(set, currentUser.uid)) {
        wonSets.push(set)
      } else {
        lostSets.push(set)
      }
    })
  }

  return (
    <>
      <PageHeading title="Tie Details" />
      <h2 className="mt-8 text-lg font-semibold text-primary">Results:</h2>
      <div className="mt-6">
        {error && <Alert type="error" message={error.message} />}
        {isLoading && (
          <Alert
            type="info"
            message="Loading..."
            innerClass="animate animate-pulse"
          />
        )}
        {status === 'success' && (
          <>
            {wonSets.map((set) => (
              <SetDisplay win set={set} uid={currentUser.uid} />
            ))}
            {lostSets.map((set) => (
              <SetDisplay set={set} uid={currentUser.uid} />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default Group
