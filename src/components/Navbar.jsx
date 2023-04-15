import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { axiosInstance } from "../api"
import { useEffect, useState } from "react"

const Navbar = () => {
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const getToken = localStorage.getItem("auth_token")

  const getUserData = async () => {
    const response = await axiosInstance.get("/auth/profile")
    setUserData(response.data)
  }

  useEffect(() => {
    getUserData()
  }, [])

  const logoutBtnHandler = () => {
    localStorage.removeItem("auth_token")
    navigate("/login")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>
            <Link to="/">TDL</Link>
          </Typography>
          {!getToken ? (
            <Link to="/login">
              <Typography color="white">Login</Typography>
            </Link>
          ) : (
            <Box>
              <Typography>{userData ? userData.username : ""}</Typography>
              <Button sx={{ color: "white" }} onClick={logoutBtnHandler}>
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
