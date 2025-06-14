import { UserDTO } from '../dtos/UserDTO'
import { storageUserSave, storageUserGet } from '../storage/storageUser'
import { storageAuthTokenGet, storageAuthTokenSave } from '../storage/storageAuthToken'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'

export type RegisterContextDataProps = {
  user: UserDTO
  signInWithClerk: (clerkUser: { id: string; name: string; email: string; avatarUrl?: string }) => Promise<void>
  isLoadingUserStorageData: boolean
}

type RegisterContextProviderProps = {
  children: ReactNode;
}

export const RegisterContext = createContext<RegisterContextDataProps>({} as RegisterContextDataProps)

export function RegisterContextProvider({ children }: RegisterContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true)
      await storageUserSave(userData)
      await storageAuthTokenSave(token)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signInWithClerk(clerkUser: { id: string;  name: string; email: string; avatarUrl?: string }) {
    try {
      const { id, name, email, avatarUrl } = clerkUser

      try {
        const response = await api.post('/users/register', {
          id,
          name,
          email,
          avatarUrl
        })

      } catch (error: any) {
        if (error.response?.status === 409) {
          const existing = await api.get(`/users/by-email/${email}`)
        } else {
          throw error
        }
      }

      const userData: UserDTO = {
        id,
        name,
        email,
        avatarUrl: avatarUrl || null
      }

      const fakeToken = `clerk-token-${userData.id}`

      await storageUserAndTokenSave(userData, fakeToken)
      userAndTokenUpdate(userData, fakeToken)

    } catch (error) {
      console.error("Erro no login com Clerk:", error)
      throw error
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true)

      const userLogged = await storageUserGet()
      const token = await storageAuthTokenGet()

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <RegisterContext.Provider value={{
      user,
      signInWithClerk,
      isLoadingUserStorageData
    }}>
      {children}
    </RegisterContext.Provider>
  )
}
