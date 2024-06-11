import { useSelector } from "react-redux"

const Notification = () => {
  const message = useSelector(state => state.message.message)
  const errorMessage = useSelector(state => state.message.errorMessage)
  if (message) {
    console.log(message)
    return <div className="message">{message}</div>
  }
  if (errorMessage) {
    console.log(errorMessage)
    return <div className="errorMessage">{errorMessage}</div>
  }
  return null
}

export default Notification
