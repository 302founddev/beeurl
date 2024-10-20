import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
  name: string,
  email: string,
  original_url: string,
  shortened_url: string
}

export const useProfile = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) return

      setIsLoading(true)

      try {
        const response = await fetch('http://localhost:8000/api/auth/profile', {
          method: 'GET',
          credentials: 'include',
        })

        if (!response.ok) {
          //TODO
          navigate('/signin')

          throw new Error('Error getting data')
        }

        const data = await response.json()
        setUser(data.user)
      } catch (error) {
        console.error(error)
        return error
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [user])

  return { user, isLoading }
}
