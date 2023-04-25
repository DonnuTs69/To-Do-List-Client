import { Box, Button, Input, Typography } from "@mui/material"
import { useState } from "react"
import { axiosInstance } from "../api"
import { useNavigate, Link } from "react-router-dom"
import Navbar from "../components/Navbar"

const Login = () => {
  const [usernameOrEmail, setUsernameOremail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post("/auth/login", {
        usernameOrEmail: usernameOrEmail,
        password: password,
      })

      localStorage.setItem("auth_token", response.data.token)

      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Box
        top="100px"
        display="grid"
        margin="auto"
        justifyContent="center"
        position="relative"
        sx={{
          width: "500px",
        }}
        border="1px solid red"
      >
        <Typography variant="h3" gutterBottom>
          Login
        </Typography>
        <form onSubmit={loginUser}>
          <Box>
            <Typography>Username or Email</Typography>
            <Input
              value={usernameOrEmail}
              onChange={(e) => setUsernameOremail(e.target.value)}
              type="text"
            />
            <Typography>Password</Typography>
            <Input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Pasword"
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "195px", mt: "20px" }}
          >
            Submit
          </Button>
        </form>
        <Typography>Dont have account?</Typography>
        <Link to="/register">
          <Typography>Sign Up</Typography>
        </Link>
      </Box>
    </>
  )
}

export default Login
