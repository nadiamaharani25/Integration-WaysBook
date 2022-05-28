// Import package
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Modal, Alert, Form, Button } from "react-bootstrap";
import rupiahFormat from "rupiah-format";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

// Import API config
import { API } from "../../config/api";

// Import assets and stylesheets
import background from "../../assets/background.png";
import cssModule from "./Homepage.form.module.css";

// Import components
import NavbarLandingPage from "../../component/Navbars/Navbar";
import NavbarAdmin from "../../component/Navbars/NavbarAdmin";
import NavbarUser from "../../component/Navbars/NavbarUser";
import LoadingAnimation from "../../component/loading/LoadingAnimation";


function Homepage() {
  document.title = `WaysBook`;

  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const [alerts, setAlerts] = useState(false);

  // Declare useState
  const [loading, setLoading] = useState(false);
  const [modalShowSignUp, setModalShowSignUp] = useState(false);
  const [modalShowSignIn, setModalShowSignIn] = useState(false);
  // const [modalSignUpSuccess, setModalSignUpSuccess] = useState(false);


  // Change setState
  setTimeout(() => setLoading(true), 2000);
  const closeModalSignUp = () => setModalShowSignUp(false);
  const closeModalSignIn = () => setModalShowSignIn(false);

  let navbarConfig = "";
  if (!state.user.role) {
    navbarConfig = <NavbarLandingPage />;
  }
  if (state.user.role == "customer") {
    navbarConfig = <NavbarUser cartTg={alerts} />;
  }
  if (state.user.role == "admin") {
    navbarConfig = <NavbarAdmin />;
  }

  const [promoBooks, setPromoBooks] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get("/books")
      .then((res) => {
        return setBooks(res.data.data.books);
      })
      .catch((error) => {
        console.log(error);
      });

    API.get("/promo-books")
      .then((res) => {
        return setPromoBooks(res.data.data.promoBooks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  // Modal Login and Register
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [message, setMessage] = useState(null);

  //Register Form
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  //Login Form
  const [logForm, setLogForm] = useState({
    email: "",
    password: "",
  });

  const handleChangeRegister = (e) => {
    setRegForm({
      ...regForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeLogin = (e) => {
    setLogForm({
      ...logForm,
      [e.target.name]: e.target.value,
    });
  };

  //All Function
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

  // Handle Submit
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
      const body = JSON.stringify(regForm);

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


  // Handle Login
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
      const body = JSON.stringify(logForm);

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

  const setNav = (par1) => {
    if (!state.user.role) {
      handleOpenLogin();
    } else if (state.user.role == "customer") {
      navigate(`/detail/${par1}`);
    } else if (state.user.role == "admin") {
      navigate(`/update-book/${par1}`);
    }
  };

  const setAddCart = (par1) => {
    if (!state.user.role) {
      handleOpenLogin();
    } else if (state.user.role == "customer") {
      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Insert data user to database
      API.post(
        "/cart",
        {
          idProduct: par1,
        },
        config
      );

      setAlerts(true);
    } else if (state.user.role == "admin") {
      navigate(`/update-book/${par1}`);
    }
  };

  return (
    <>
      {loading ? (

        <div
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "100%",
            width: "100%",
          }}
        >
          {navbarConfig}

          <Container>
            <Row style={{ marginBottom: "40px" }}>
              <Col className={cssModule.titleHeader}>
                <p>With us, you can shop online & help</p>
                <p>save your high street at the same time</p>
              </Col>
            </Row>
            {promoBooks.length >= 1 ? (
              <Row>
                <Col>
                  <Carousel variant="dark">
                    {promoBooks.map((item, index) => (
                      <Carousel.Item key={index}>
                        <Row style={{ width: "75%", margin: "auto" }}>
                          <Col style={{ display: "flex", justifyContent: "center" }}>
                            <img className="d-block" src={item.bookImg} alt=""
                              style={{
                                width: "236.22px",
                                height: "345.09px",
                                borderRadius: "0px 10px 10px 0px",
                              }}
                            />
                          </Col>
                          <Col className={cssModule.promoProps}>
                            <h3 onClick={() => setNav(item.id)}>
                              {item.title}
                            </h3>
                            <h6>By: {item.author}</h6>
                            <h5>
                              {rupiahFormat.convert(item.price)}{" "}
                            </h5>
                            <button style={{ backgroundColor: 'red', border: 'none' }} onClick={() => setAddCart(item.id)} className="btn-primary">
                              <span>Add to Cart</span>
                            </button>
                            <p>{item.desc}</p>
                          </Col>
                        </Row>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Col>
              </Row>
            ) : (
              <Row>
                <h1
                  style={{
                    textAlign: "center",
                    marginTop: "89px",
                    marginBottom: "89px",
                  }}
                >
                  Sorry, No Promo Books
                </h1>
              </Row>
            )}
          </Container>

          <Container fluid
            style={{
              marginTop: "50px",
              height: "100%",
              width: "100%",
              backgroundColor: "#E5E5E5",
              paddingBottom: "30px",
            }}
          >
            <Row style={{ width: "80%", margin: "30px auto 30px auto" }}>
              <Col style={{ marginTop: "45px" }}>
                <h2 style={{ fontFamily: "cursive" }}>List Book</h2>
              </Col>
            </Row>

            <Row
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "80%",
                margin: "0px auto 30px auto",
                paddingBottom: "10px",
              }}
            >
              {books.map((item, index) => (
                <Col md={2} my={5}
                  key={index}
                  className={cssModule.listBook}
                  style={{ width: "250px", marginBottom: "10px" }}
                >
                  <img src={item.bookImg} onClick={() => setNav(item.id)} alt="" />
                  <h3 className="mt-3">{item.title}</h3>
                  <h6>By: {item.author}</h6>
                  <h5>{rupiahFormat.convert(item.price)}</h5>
                </Col>
              ))}
            </Row>
          </Container>

          {/* Modal Cart */}
          <Modal style={{ top: "250px", }} show={alerts} onHide={() => setAlerts(false)} z>
            <Modal.Body
              style={{
                textAlign: "center",
                color: "#469F74",
                fontSize: "24px",
              }}
            >
              The product is successfully added to the cart
            </Modal.Body>
          </Modal>

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

export default Homepage;
