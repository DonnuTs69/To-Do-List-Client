import {
  Box,
  FormControl,
  Icon,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { axiosInstance } from "../api"
import { useParams } from "react-router-dom"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import EditIcon from "@mui/icons-material/Edit"
import LensIcon from "@mui/icons-material/Lens"
import ClearIcon from "@mui/icons-material/Clear"
import ModalConfirmation from "./ModalConfirmation"

const RenderListAndTask = () => {
  const [renderList, setRenderList] = useState({})
  const [variant, setVariant] = useState("render")
  const [inputDescription, setInputDescription] = useState("")
  const [inputStatus, setInputStatus] = useState("")
  const [taskId, setTaskId] = useState(null)
  const [renderStatus, setRenderStatus] = useState("")
  const [deleteTask, setDeleteTask] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const [editingTaskId, setEditingTaskId] = useState(null)

  const toggleVariant = useCallback((id) => {
    setVariant((currentVariant) =>
      currentVariant === "render" ? "edit" : "render"
    )
    setEditingTaskId(editingTaskId === null ? id : null)
    setTaskId(taskId === null ? id : null)
  })

  const params = useParams()

  const getList = async () => {
    try {
      const response = await axiosInstance.get(`/list/${params.id}`)
      setRenderList(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getStatus = async () => {
    try {
      const responseStatus = await axiosInstance.get("/status/")
      setRenderStatus(responseStatus.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const editTaskAndStatus = async () => {
    try {
      await axiosInstance.patch("/task/edit", {
        description: inputDescription,
        StatusId: inputStatus,
        id: taskId,
      })

      getList()
      toggleVariant()
      // setVariant("render")
      // setTaskId(null)
    } catch (err) {
      console.log(err)
    }
  }

  const destroyTask = async () => {
    try {
      console.log(deleteTask, "asu")
      await axiosInstance.delete(`/task/delete/${deleteTask}`)
      getList()
      handleCloseModal()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getList()
  }, [deleteTask])

  useEffect(() => {
    getStatus()
  }, [])

  const statusColors = {
    "on Progress": "orange",
    Success: "green",
  }
  const handleOpenModal = useCallback((id) => {
    setOpenModal(true)
    // setDeleteTask(deleteTask === null ? id : null)
    setDeleteTask(id)
    console.log(id)
  })
  const handleCloseModal = () => setOpenModal(false)
  // console.log(deleteTask, "delId")

  return (
    <>
      <Box sx={{ margin: "auto", minWidth: "fit-content" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            // borderBottom: "2px solid black",
            mt: "50px",
          }}
        >
          {renderList?.title?.toUpperCase()}
        </Typography>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: "500", borderTop: "2px solid black", mt: "20px" }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Edit</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {variant === "render" ? "Delete" : "Cancel"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderList?.Tasks?.map((val) => (
                <TableRow key={val.id}>
                  <TableCell sx={{ width: 250 }}>
                    {val.id === editingTaskId ? (
                      <Input
                        sx={{ width: "fit-content" }}
                        defaultValue={val.description}
                        onChange={(e) => setInputDescription(e.target.value)}
                        type="text"
                        autoFocus={true}
                      />
                    ) : (
                      val.description
                    )}
                  </TableCell>
                  <TableCell sx={{ width: 250 }}>
                    {val.id === editingTaskId ? (
                      <FormControl sx={{ width: "180px" }}>
                        <InputLabel id="status">Status</InputLabel>
                        <Select
                          id={val.id}
                          label="Status"
                          onChange={(e) => setInputStatus(e.target.value)}
                          defaultValue={val.Status.id}
                          sx={{ width: "170px", height: "40px" }}
                          displayEmpty
                        >
                          {renderStatus?.map((val) => (
                            <MenuItem value={val.id}>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Icon
                                  sx={{
                                    color: statusColors[val.status],
                                    mr: 1,
                                  }}
                                >
                                  <LensIcon />
                                </Icon>
                                {val.status}
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <Box display="flex">
                        <Icon sx={{ color: statusColors[val.Status.status] }}>
                          <FiberManualRecordIcon />
                        </Icon>
                        {val.Status.status}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      sx={{ color: "#1976d2" }}
                      onClick={() =>
                        variant === "render"
                          ? toggleVariant(val.id)
                          : editTaskAndStatus() && setTaskId(null)
                      }
                      type={variant === "render" ? null : "submit"}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() =>
                        variant === "render"
                          ? handleOpenModal(val.id)
                          : toggleVariant(val.id)
                      }
                    >
                      <ClearIcon />
                    </IconButton>
                    {val.id === deleteTask ? null : (
                      <ModalConfirmation
                        open={openModal}
                        handleClose={handleCloseModal}
                        handleDelete={destroyTask}
                        taskId={val.id}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default RenderListAndTask
