import { Box, Button, Input, Modal, Typography } from "@mui/material"
import { axiosInstance } from "../api"
import { useEffect, useState } from "react"

const CreateList = ({ handleClose, open }) => {
  const [title, setTitle] = useState("")
  // const [openModal, setOpenModal] = useState(open)

  // const handleCloseModal = () => {
  //   setOpenModal(false)
  //   handleClose()
  // }

  // useEffect(() => {
  //   setOpenModal(open)
  // }, [open])

  const listHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post("list/create", {
        title: title,
      })
      window.location.reload()
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  // console.log(open)
  // console.log(handleClose)
  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "35%",
          width: 400,
          bgcolor: "background.paper",
          border: "1px solid white",
          boxShadow: 24,
        }}
      >
        <Typography variant="h4" color="red" id="keep-mounted-modal-title">
          Create List
        </Typography>
        <Input
          id="keep-mounted-modal-description"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button onClick={listHandler} type="submit">
          submit
        </Button>
      </Box>
    </Modal>
  )
}

export default CreateList
