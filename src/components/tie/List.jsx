import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { TieService } from '@/services/DatabaseService'
import Alert from '@/components/ui/Alert'

function TieList() {
  const currentUser = useCurrentUser()
  const [selected, setSelected] = useState()
  const [openModal, setOpenModal] = useState(false)
  const { id } = useParams()

  const { data, isLoading, error, status } = useQuery(
    ['ties', { property: 'group', value: id }],
    TieService.getByPropertyValue
  )

  if (!currentUser) {
    // TODO: secure client routes
  }

  console.log(data)

  return (
    <div className="overflow-x-auto">
      {isLoading ? (
        <Alert
          type="info"
          message="Loading..."
          innerClass="animate animate-pulse"
        />
      ) : (
        <table className="table w-full max-w-screen-lg py-0">
          <tbody>
            {data.map((tie, index) => (
              <tr key={index}>
                <td
                  onClick={() => history.push(`/group/${group.id}`)}
                  className="cursor-pointer hover:bg-white hover:text-black rounded-md"
                >
                  {new Date(tie.timestamp * 1000).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TieList
