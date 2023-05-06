import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../context/userContext"

const ProtectRoute = ({ children }) => {
  const { currentUser } = useContext(UserContext)

  if (!currentUser) {
    return <Navigate replace to="/auth" />
  }
  return children
}

export default ProtectRoute
