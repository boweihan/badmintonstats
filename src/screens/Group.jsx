import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { GroupService } from '@/services/DatabaseService'
import PageHeading from '@/components/ui/PageHeading'
import Alert from '@/components/ui/Alert'
import TieList from '@/components/tie/List'

function Group() {
  const history = useHistory()
  const currentUser = useCurrentUser()
  const { id } = useParams()

  const { data, isLoading, error, status } = useQuery(
    ['groups', { id }],
    GroupService.getOne
  )

  if (!currentUser) {
    // TODO: secure client routes
  }

  return (
    <>
      <PageHeading title="Group Details" />
      <h2 className="mt-8 text-lg font-semibold text-primary">Group Ties:</h2>
      <div className="mt-6">
        {error && <Alert type="error" message={error.message} />}
        {isLoading && (
          <Alert
            type="info"
            message="Loading..."
            innerClass="animate animate-pulse"
          />
        )}
        {status === 'success' && <TieList />}
      </div>
    </>
  )
}

export default Group
