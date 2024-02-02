const LoginForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleLogin}>
                <input 
                    type="text"
                    name="username"
                    value={props.username}
                    onChange={({ target }) => props.setUsername(target.value)}
                    placeholder="Käyttäjänimi"
                />
                <br />
                <input 
                    type="password"
                    name="password"
                    value={props.password}
                    onChange={({ target }) => props.setPassword(target.value)}
                    placeholder="Salasana"
                />
                <br />
                <button type="submit">Kirjaudu</button>

            </form>
        </div>
    )
}

export default LoginForm