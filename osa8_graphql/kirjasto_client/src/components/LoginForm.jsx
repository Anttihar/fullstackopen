import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "../queries"
import { useNavigate } from "react-router-dom"
import {
  Box,
  FormControl,
  TextField,
  Button,
  Typography
} from "@mui/material"

const LoginForm = ({ setUser, setErrMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const [ login, { data } ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.message)
      setErrMessage(error.message)
      setTimeout(() => {
        setErrMessage(null)
      }, 5000);
    }
  })

  useEffect(() => {
    if (data) {
      const user = data.login
      setUser(user)
      localStorage.setItem('loggedUser', JSON.stringify(user))
      navigate("/")
    }
  }, [data])

  const handleLogin = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    
  }

  return (
    <Box sx={{ display: "grid", justifyContent: "center" }}>
      <Typography variant="h2" sx={{ m: 2, textAlign: "center" }}>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <FormControl>
          <TextField
            label="Username"
            type='text'
            value={username}
            sx={{ m: 1 }}
            size='small'
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            label="Password"
            type='password'
            value={password}
            sx={{ m: 1 }}
            size='small'
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button type="submit">Submit</Button>
        </FormControl>
      </form>
    </Box>
  )
}

export default LoginForm