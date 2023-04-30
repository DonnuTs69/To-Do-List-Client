import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { axiosInstance } from "../api"
import { useEffect, useState } from "react"

const Navbar = () => {
  const [userData, setUserData] = useState({})
  const [isLogin, setIsLogin] = useState(false)

  const navigate = useNavigate()

  const getUserData = async () => {
    const response = await axiosInstance.get("/auth/profile")
    setIsLogin(true)
    setUserData(response?.data)
  }

  useEffect(() => {
    const getToken = localStorage.getItem("auth_token")
    if (getToken) {
      setIsLogin(true)
      getUserData()
    }
  }, [])

  const logoutBtnHandler = () => {
    localStorage.removeItem("auth_token")
    navigate("/auth")
  }

  // useEffect(() => {
  //   getUserData()
  // }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box>
            <Link to="/" className="title">
              <Box component="img" src="/img/tdl.png" sx={{ width: "50px" }} />
            </Link>
          </Box>
          <Box>
            {!isLogin ? (
              <Link to="/auth">
                <Typography color="white">Login</Typography>
              </Link>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="button">
                  {userData ? userData.username : ""}
                </Typography>
                <Button sx={{ color: "white" }} onClick={logoutBtnHandler}>
                  Logout
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  )
}

export default Navbar
