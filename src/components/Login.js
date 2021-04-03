import React, { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Login(props) {
  const history = useHistory();

  //state
  const [isChecked, setIsChecked] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [isInValid, setIsInValid] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isChecked")) {
      setUserName(localStorage.getItem("userName"));
      setPassword(localStorage.getItem("password"));
      setIsChecked(localStorage.getItem("isChecked"));
    }
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form.checkValidity());
    if (form.checkValidity() === false) {
      setValidated(true);
      event.preventDefault();
    } else {
      if (userName === "User" && password === "User@123") {
        if (isChecked && userName !== "" && password !== "") {
          localStorage.setItem("userName", userName);
          localStorage.setItem("password", password);
          localStorage.setItem("isChecked", isChecked);
        } else {
          localStorage.removeItem("userName");
          localStorage.removeItem("password");
          localStorage.removeItem("isChecked");
        }
        setIsInValid(false);
        history.push("/book-list");
      } else {
        event.preventDefault();
        setIsInValid(true);
      }
    }
  };
  return (
    <Card style={{ width: "50rem" }} className="card-center">
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Name"
              onChange={(e) => setUserName(e.target.value)}
              required
              value={userName}
            />
            <Form.Control.Feedback type="invalid">
              Please enter username
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
            />
            <Form.Control.Feedback type="invalid">
              Please enter password
            </Form.Control.Feedback>
          </Form.Group>

          {isInValid && (
            <Form.Label style={{ color: "red" }}>
              Username or Password is invalid
            </Form.Label>
          )}
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Remember me"
              checked={isChecked}
              onChange={(e) => setIsChecked(!isChecked)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
