import { Box, Button, Container, Input, Paper, Typography } from "@mui/material"
import React, { useState } from "react"
import { axiosInstance } from "../api"

const Register = () => {
  const [emailInput, setEmailInput] = useState("")
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")

  const registerUser = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.post("/auth/register", {
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
      })
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
          Register
        </Typography>
        <form onSubmit={registerUser}>
          <Box>
            <Typography>Username</Typography>
            <Input
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            <Typography>Email</Typography>
            <Input
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              type="email"
            />
            <Typography>Password</Typography>
            <Input
              type="text"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </Box>
          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </>
  )
}

export default Register
