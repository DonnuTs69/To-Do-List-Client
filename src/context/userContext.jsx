import { createContext, useState } from "react"

export const UserContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
})

export const UserProvirder = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  // const value = { currentUser, setCurrentUser }

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  )
}
