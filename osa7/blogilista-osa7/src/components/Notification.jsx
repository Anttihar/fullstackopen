import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"

const Notification = () => {
  const message = useSelector(state => state.message.message)
  const errorMessage = useSelector(state => state.message.errorMessage)
  if (message) {
    console.log(message)
    return <Alert className="mt-3" variant="success">{message}</Alert>
  }
  if (errorMessage) {
    console.log(errorMessage)
    return <Alert className="mt-3" variant="danger">{errorMessage}</Alert>
  }
  return null
}

export default Notification
