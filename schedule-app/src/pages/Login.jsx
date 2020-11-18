import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/LoginSignup.css";
import Axios from "axios";
import {useHistory} from "react-router-dom";
import UserContext from "../context/UserContext.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const loginUser = {email, password};
        const loginRes = await Axios.post("http://localhost:9000/users/login", loginUser);
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
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
                        placeholder="name@example.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
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