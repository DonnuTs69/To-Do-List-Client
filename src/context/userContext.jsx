import { createContext, useEffect, useState } from "react"

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

export const UserProvirder = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = { currentUser, setCurrentUser }

  useEffect(() => {
    const getUserData = localStorage.getItem("current_user")
    if (getUserData) {
      setCurrentUser(JSON.parse(getUserData))
    }
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
