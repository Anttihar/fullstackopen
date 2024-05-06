import { createContext, useContext, useReducer } from "react"

const notiReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return state = `You just voted: ${action.payload}`
    case 'CREATE':
      return state = `You just created new anecdote: ${action.payload}`
    case 'EMPTY':
      return state = null
    case 'ERROR':
      return state = action.payload
  }
}

const NotificationContext = createContext()

export const useNotiValue = () => {
  const notiAndDispatch = useContext(NotificationContext)
  return notiAndDispatch[0]
}

export const useNotiDispatch = () => {
  const notiAndDispatch = useContext(NotificationContext)
  return notiAndDispatch[1]
}

export const NotiContextProvider = (props) => {
  const [notification, notiDispatch] = useReducer(notiReducer, null)

  return(
    <NotificationContext.Provider value={ [notification, notiDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext