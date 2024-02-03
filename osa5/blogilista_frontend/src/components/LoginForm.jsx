import { useState } from "react"

const LoginForm = ({ login }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        login(username, password)
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input 
                    type="text"
                    name="username"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                    placeholder="Käyttäjänimi"
                />
                <br />
                <input 
                    type="password"
                    name="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    placeholder="Salasana"
                />
                <br />
                <button type="submit">Kirjaudu</button>

            </form>
        </div>
    )
}

export default LoginForm