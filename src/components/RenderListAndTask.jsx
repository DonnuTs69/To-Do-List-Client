import { Box, List, ListItem, ListItemText, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { axiosInstance } from "../api"
import { useParams } from "react-router-dom"

const RenderListAndTask = () => {
  const [renderList, setRenderList] = useState({})

  const params = useParams()

  const getList = async () => {
    try {
      const response = await axiosInstance.get(`/list/${params.id}`)
      setRenderList(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }
  console.log(renderList)

  useEffect(() => {
    getList()
  }, [])

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {renderList?.title?.toUpperCase()}
        </Typography>
        <List>
          {renderList?.Tasks?.map((item) => (
            <ListItemText>
              <Typography>{item.description}</Typography>
            </ListItemText>
            // <Typography>{item.Status.status}</Typography>
          ))}
        </List>
      </Box>
    </>
  )
}

export default RenderListAndTask
