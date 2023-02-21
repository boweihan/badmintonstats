import { useState, useEffect } from 'react'
import { auth } from '@/firebase'

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setCurrentUser(authUser)
      } else {
        setCurrentUser(null)
      }
    })
  }, [])

  return currentUser
}
