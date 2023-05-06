import { Box, Button, TextField, Modal, Typography } from "@mui/material"
import { axiosInstance } from "../api"
import { useState } from "react"

const CreateList = ({ handleClose, open }) => {
  const [title, setTitle] = useState("")

  const listHandler = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.post("list/create", {
        title: title,
      })

      handleClose()
    } catch (err) {
      console.log(err)
    }
  }

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
          display: "grid",
          borderRadius: "5px",
        }}
      >
        <Box sx={{ placeSelf: "center" }}>
          <Typography variant="h4" color="black" id="keep-mounted-modal-title">
            Create List
          </Typography>
          <TextField
            id="keep-mounted-modal-description"
            onChange={(e) => setTitle(e.target.value)}
            label="List"
            sx={{ width: "fit-content", mt: "10px" }}
          />
          <Box>
            <Button
              variant="contained"
              onClick={listHandler}
              type="submit"
              sx={{ width: "222px", mt: "10px", mb: "15px" }}
            >
              submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateList
