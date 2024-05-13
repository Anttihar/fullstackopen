import { useState, useImperativeHandle, forwardRef } from "react"

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const buttonStyle2 = {
    marginTop: 3,
    marginBottom: 10,
  }

  const buttonStyle1 = {
    fontWeight: "bold",
    fontSize: 14,
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
        <button style={buttonStyle1} onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button style={buttonStyle2} onClick={toggleVisibility}>
          Peruuta
        </button>
      </div>
    </div>
  )
})

export default Togglable
