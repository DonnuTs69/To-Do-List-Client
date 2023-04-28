import { Box, Button, Modal, Typography } from "@mui/material"

const ModalConfirmation = ({ open, handleClose, handleDelete, taskId }) => {
  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={open}
      onClose={() => handleClose()}
      hideBackdrop
    >
      <Box
        sx={{
          position: "absolute",
          top: "35%",
          left: "35%",
          width: 400,
          bgcolor: "white",
          border: "1px solid black",
          //   boxShadow: 24,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are You Sure Want to Delete This Task?
        </Typography>
        <Box display="flex">
          <Button onClick={() => handleDelete(taskId)} id={taskId}>
            Delete
          </Button>
          <Button onClick={() => handleClose()}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalConfirmation
