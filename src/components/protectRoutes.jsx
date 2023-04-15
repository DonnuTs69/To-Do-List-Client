import { Navigate } from "react-router-dom"

const ProtectRoute = ({ children }) => {
  const getToken = localStorage.getItem("auth_token")

  if (!getToken) {
    return <Navigate replace to="/login" />
  }
  return children
}

export default ProtectRoute
