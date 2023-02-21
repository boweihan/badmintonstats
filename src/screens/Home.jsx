import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { GroupService } from '@/services/DatabaseService'
import PageHeading from '@/components/ui/PageHeading'
import GroupList from '@/components/group/List'
import Alert from '@/components/ui/Alert'

function Home() {
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

  return (
    <>
      <PageHeading title="Home" />
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

export default Home
