import { Box } from "@mui/material"
import { axiosInstance } from "../api"
import { useEffect, useState } from "react"

const HomePage = () => {
  const [dataUser, setDataUser] = useState({})

  const getDataUser = async () => {
    try {
      const response = await axiosInstance.get("/auth/profile")

      setDataUser(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  //   console.log(dataUser, "state")

  useEffect(() => {
    getDataUser()
  }, [])

  return (
    <Box>
      <h1>Home</h1>
      <h1>{dataUser.username}</h1>
      <h2>ASU</h2>
    </Box>
  )
}

export default HomePage
