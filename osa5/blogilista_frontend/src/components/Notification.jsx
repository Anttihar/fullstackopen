const Notification = ({ message, errorMessage }) => {
    if (message) {
        return (
            <div className="message">
                {message}
            </div>
        )
    } else if (errorMessage) {
        return (
            <div className="errorMessage">
                {errorMessage}
            </div>
        )
    }
    return null
}

export default Notification