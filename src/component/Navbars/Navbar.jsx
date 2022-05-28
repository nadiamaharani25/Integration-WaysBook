//Import Package
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Modal, Alert, Form, Button } from "react-bootstrap";

//Import User Context
import { UserContext } from "../../context/userContext";

//Import Assets and Stylesheet
import Logo from "../../assets/WaysBookLogo.png";
import cssModule from "./Navbar.module.css";

//Import API
import { API } from "../../config/api";

//Import Component
import LoadingAnimation from "../loading/LoadingAnimation";


function NavbarLandingPage(props) {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [message, setMessage] = useState(null);

  // Declare useState(false);
  const [loading, setLoading] = useState(false);

  // Change setState
  setTimeout(() => setLoading(true), 2000);

  // Register Form
  const [registrasiForm, setRegistrasiForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Login Form
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChangeRegister = (e) => {
    setRegistrasiForm({
      ...registrasiForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeLogin = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseLogin = () => {
    setMessage(null);
    setLoginShow(false);
  };

  const handleOpenLogin = () => {
    setMessage(null);
    setLoginShow(true);
  };

  const handleCloseRegister = () => {
    setMessage(null);
    setRegisterShow(false);
  };

  const handleOpenRegister = () => {
    setMessage(null);
    setRegisterShow(true);
  };

  const switchRegLog = () => {
    setMessage(null);
    setRegisterShow(false);
    setLoginShow(true);
  };

  const switchLogReg = () => {
    setMessage(null);
    setLoginShow(false);
    setRegisterShow(true);
  };

  const handleSubmitReg = async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(registrasiForm);

      // Insert data user to database
      const response = await API.post("/register", body, config);

      const alert = (
        <Alert variant="success" className="py-1">
          Register Success
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Register Failed
        </Alert>
      );
      setMessage(alert);
    }
  };

  const handleSubmitLog = async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(loginForm);

      // Insert data user to database
      const response = await API.post("/login", body, config);

      const alert = (
        <Alert variant="success" className="py-1">
          Login Success!
        </Alert>
      );
      setMessage(alert);

      let dataUser = response.data.data.user;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: dataUser,
      });

      setLoginShow(false);

      navigate("/");
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login Failed!
        </Alert>
      );
      setMessage(alert);
    }
  };

  return (
    <>
      {loading ? (
        <div>
          <Navbar
            expand="lg"
            style={{
              top: "20px",
            }}
          >
            <Container>
              <Navbar.Brand href="/">
                <img src={Logo} alt="" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                style={{ justifyContent: "flex-end" }}
                id="basic-navbar-nav"
              >
                <Nav>
                  <Nav.Item className={cssModule.btnLogin}>
                    <button onClick={handleOpenLogin}>Login</button>
                  </Nav.Item>
                  <Nav.Item className={cssModule.btnRegister}>
                    <button onClick={handleOpenRegister}>Register</button>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          {/* Modal Login */}
          <Modal show={loginShow} onHide={handleCloseLogin} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body style={{ borderRadius: "50px !important" }}>
              <h2 style={{ margin: "10px 0 30px 0" }}>Login</h2>
              {message && message}
              <Form onSubmit={handleSubmitLog}>
                <Form.Group className="mb-3">
                  <Form.Control type="email" id="email" style={{ backgroundColor: "#BCBCBC40" }} placeholder="Email" name="email" autoComplete="off" onChange={handleChangeLogin} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="password" id="password" style={{ backgroundColor: "#BCBCBC40" }} placeholder="Password" name="password" autoComplete="off" onChange={handleChangeLogin} required />
                </Form.Group>
                <Button variant="danger" type="submit" style={{ width: "100%", backgroundColor: "#D60000", marginTop: "15px" }}>
                  Login
                </Button>
                <Form.Group className="my-3">
                  <p className="text-center">
                    Already have an account? Klik{" "}
                    <b
                      style={{ cursor: "pointer" }}
                      onClick={switchLogReg}
                    >
                      Here
                    </b>
                  </p>
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal>

          {/* Modal Register */}
          <Modal show={registerShow} onHide={handleCloseRegister} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body style={{ borderRadius: "50px !important" }}>
              <h2 style={{ margin: "10px 0 30px 0" }}>Register</h2>
              {message && message}
              <Form onSubmit={handleSubmitReg}>
                <Form.Group className="mb-3">
                  <Form.Control type="email" id="email" style={{ backgroundColor: "#BCBCBC40" }} placeholder="Email" name="email" autoComplete="off" onChange={handleChangeRegister} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" id="name" style={{ backgroundColor: "#BCBCBC40" }} placeholder="Name" name="name" autoComplete="off" onChange={handleChangeRegister} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="password" id="password" style={{ backgroundColor: "#BCBCBC40" }} placeholder="Password" name="password" autoComplete="off" onChange={handleChangeRegister} required />
                </Form.Group>
                <Button variant="danger" type="submit" style={{ width: "100%", backgroundColor: "#D60000", marginTop: "15px" }}>
                  Register
                </Button>
                <Form.Group className="my-3">
                  <p className="text-center">
                    Already have an account? Klik{" "}
                    <b
                      style={{ cursor: "pointer" }}
                      onClick={switchRegLog}
                    >
                      Here
                    </b>
                  </p>
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal>

        </div>
      ) : (
        <LoadingAnimation />
      )
      }
    </>
  );
}

export default NavbarLandingPage;
