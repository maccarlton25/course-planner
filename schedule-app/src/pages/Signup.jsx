import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/LoginSignup.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext.js";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    // initializing for db
    const majorType = "";
    const semRem = 1;
    const coursesTaken = [];
    const bsRequired = [];
    const courses = [];

    function validateForm() {
        return email.length > 0 && password.length > 4 && passwordCheck.length > 4;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newUser = { email, password, passwordCheck, majorType, semRem, coursesTaken, bsRequired, courses };
        (async () => {
            await Axios.post("http://localhost:9000/users/register", newUser);
            const loginRes = await Axios.post("http://localhost:9000/users/login", { email, password });
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            console.log(loginRes.data);
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/profile");
        })();
    }

    return (
        <>
            <div className="jumbotron" style={{ textAlign: "center" }}>
                <h1 className="display-4">- Create an account -</h1>
                <p className="lead">
                    Creating an account allows you to save progress and keep track of your courses.
                </p>
            </div>
            <div className="Signup">
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="display-name">
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control
                            autoFocus
                            placeholder="Johnny Appleseed"
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            placeholder="name@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            placeholder="Enter Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="passwordCheck">
                        <Form.Control
                            placeholder="Confirm Password"
                            type="password"
                            value={passwordCheck}
                            onChange={(e) => setPasswordCheck(e.target.value)}
                        />
                        <Form.Text muted>
                            Your password must be at least 5 characters long.
                        </Form.Text>
                    </Form.Group>
                    
                    <Button block size="lg" type="submit" disabled={!validateForm()}>
                        Create Account
                </Button>
                </Form>
            </div>
        </>
    );
}

export default Signup;