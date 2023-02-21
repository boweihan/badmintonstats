import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  UserCircleIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/outline'

import EmptyState from '@/components/ui/EmptyState'
import DeleteModal from '@/components/ui/DeleteModal'

function GroupList({ data, deleteAction }) {
  const history = useHistory()
  const [selected, setSelected] = useState()
  const [openModal, setOpenModal] = useState(false)

  if (!data || data.length == 0) {
    return (
      <EmptyState
        icon={UserCircleIcon}
        title="No groups"
        message="Start by adding a new group"
        btnLabel="Add Group"
        link="/group/create"
      />
    )
  }

  const showDeleteModal = (id) => {
    setSelected(id)
    setOpenModal(true)
  }

  const deleteModalAction = () => {
    deleteAction(selected)
    setOpenModal(false)
  }

  const cancelModalAction = () => {
    setOpenModal(false)
  }

  return (
    <div className="overflow-x-auto">
      <DeleteModal
        open={openModal}
        deleteAction={deleteModalAction}
        cancelAction={cancelModalAction}
      />
      {/* <div className="mb-4">
        <Link to="/group/create" className="btn btn-secondary btn-sm">
          <UserCircleIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
          New Group
        </Link>
      </div> */}
      <table className="table w-full max-w-screen-lg py-0">
        <tbody>
          {data.map((group, index) => (
            <tr key={index}>
              <td
                onClick={() => history.push(`/group/${group.id}`)}
                className="cursor-pointer hover:bg-white hover:text-black rounded-md"
              >
                {group.name}
              </td>
              {/* <td>
                <Link
                  to={`/group/edit/${group.id}`}
                  className="text-primary hover:text-primary-focus"
                  title={`Edit ${group.name}`}
                >
                  <PencilAltIcon
                    className="w-5 h-5 mr-2 -ml-1"
                    aria-hidden="true"
                  />
                </Link>
              </td>
              <td>
                <button
                  type="button"
                  title={`Delete ${group.name}`}
                  className="text-secondary-content"
                  onClick={() => showDeleteModal(author.id)}
                >
                  <TrashIcon
                    className="w-5 h-5 mr-2 -ml-1"
                    aria-hidden="true"
                  />
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GroupList
