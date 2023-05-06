import { Snackbar } from "@mui/material"
import MuiAlert from "@mui/material/Alert"

const SnackbarAlert = ({ open, handleClose, alertMessage, alertStatus }) => {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleClose}
      >
        <MuiAlert
          onClose={handleClose}
          severity={alertStatus}
          sx={{ width: "100%" }}
          variant="filled"
          elevation={6}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </>
  )
}

export default SnackbarAlert
