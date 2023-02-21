import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { GroupService } from '@/services/DatabaseService'
import PageHeading from '@/components/ui/PageHeading'
import GroupList from '@/components/group/List'
import Alert from '@/components/ui/Alert'
import Montage from '@/components/montage'

function Home() {
  const currentUser = useCurrentUser()

  const { data, isLoading, error, status } = useQuery(
    'groups',
    GroupService.getAll
  )

  const queryClient = useQueryClient()

  const deleteMutation = useMutation((id) => GroupService.remove(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('groups')
    },
  })

  const deleteAction = async (id) => {
    deleteMutation.mutateAsync(id)
  }

  if (currentUser) {
    return (
      <>
        <PageHeading title={`Welcome ${currentUser.displayName}!`} />
        <h2 className="mt-8 text-lg font-semibold text-primary">
          Your Badminton Groups:
        </h2>
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
            <GroupList data={data} deleteAction={deleteAction} />
          )}
        </div>
      </>
    )
  }

  return <Montage />
}

export default Home
