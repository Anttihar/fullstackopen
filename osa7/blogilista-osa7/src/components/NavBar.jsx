import { Container, Navbar, Nav, Button, Form, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setUser } from "../reducers/userReducer"
import { setMessage } from "../reducers/messageReducer"

const NaviBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user.user)

  const logout = () => {
    dispatch(setUser(null))
    window.localStorage.clear()
    navigate('/')
    if (!window.localStorage.getItem("loggedAppUser")) {
      dispatch(setMessage('Uloskirjautuminen onnistunut'))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
    }
  }

  return (
    <Navbar expand="md" bg="light">
      <Container>
        <Navbar.Brand href="/">BLOGILISTA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              <strong>Blogit</strong>
            </Nav.Link>
            <Nav.Link as={Link} to="/users">
              <strong>Käyttäjät</strong>
            </Nav.Link>
          </Nav>
          <Container className="d-flex justify-content-end">
            <Form>
              <Row>
                <Col>
                  <Form.Text>{user.name} kirjautunut</Form.Text>
                </Col>
                <Col>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => logout()}
                  >
                    Kirjaudu ulos
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NaviBar