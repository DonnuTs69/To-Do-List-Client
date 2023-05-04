import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/userContext"

const Navbar = () => {
  const { currentUser } = useContext(UserContext)

  const navigate = useNavigate()

  const logoutBtnHandler = () => {
    localStorage.clear()
    navigate("/auth")
  }

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
            {currentUser ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="button">
                  {/* {userData ? userData.username : ""} */}
                  {currentUser.username}
                </Typography>
                <Button sx={{ color: "white" }} onClick={logoutBtnHandler}>
                  Logout
                </Button>
              </Box>
            ) : (
              <Link to="/auth">
                <Typography color="white">Login</Typography>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  )
}

export default Navbar
