import { Box, Typography } from "@mui/material"

const Notification = ({ message, errMessage }) => {
  const messageStyle = {
    display: "flex",
    justifyContent: "center"
  }

  const errMessageStyle = {
    display: "flex",
    justifyContent: "center",
    color: "red"
  }

  if (message) {
    return (
      <Box sx={messageStyle}>
        <Typography>{message}</Typography>
      </Box>
    )
  } 
  if (errMessage) {
    return (
      <Box sx={errMessageStyle}>
        <Typography>{errMessage}</Typography>
      </Box>
    )
  }
  return null
}

export default Notification