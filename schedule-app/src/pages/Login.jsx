import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/LoginSignup.css";

// kmp example https://github.com/kmayerpatel/Fall2020COMP426UserLogin/tree/with_login

const Login = () => {
    //<h1>Login to UNC Course Tracker</h1>
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <>
        <div className="jumbotron" style={{ textAlign: "center" }}>
          <h1 className="display-4">- Log in to your Scheduler - </h1>
        </div>
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
        </>
    );
}

export default Login;