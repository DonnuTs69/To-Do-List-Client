import { useState } from "react"
import { axiosInstance } from "../api"

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({})
  const [isLogin, setisLogin] = useState(false)

  const getUserData = async () => {
    const response = await axiosInstance.get("/auth/profile")
    setisLogin(true)
    setUserData(response?.data)
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
  }

  return (
    <UserProvider.Provider value={{ logout, isLogin, userData, getUserData }}>
      {children}
    </UserProvider.Provider>
  )
}
