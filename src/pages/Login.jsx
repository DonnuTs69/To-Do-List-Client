import { Box, Button, Input, Typography } from "@mui/material"
import { useState } from "react"
import { axiosInstance } from "../api"

const Login = () => {
  const [usernameOrEmail, setUsernameOremail] = useState("")
  const [password, setPassword] = useState("")

  const loginUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post("/auth/login", {
        usernameOrEmail: usernameOrEmail,
        password: password,
      })

      localStorage.setItem("auth_token", response.data.token)

      // console.log(response.data.token)
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
        sx={{ width: "500px" }}
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </>
  )
}

export default Login
