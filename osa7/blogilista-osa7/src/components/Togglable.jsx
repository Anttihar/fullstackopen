import { useState, useImperativeHandle, forwardRef } from "react"
import { Button } from "react-bootstrap"

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const buttonStyle2 = {
    marginTop: 3,
    marginBottom: 10,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  Togglable.displayName = "Togglable"

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          className="mt-3 mb-3"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          className="mb-3"
          variant="secondary"
          onClick={toggleVisibility}
          size="sm"
        >
          Peruuta
        </Button>
      </div>
    </div>
  )
})

export default Togglable
