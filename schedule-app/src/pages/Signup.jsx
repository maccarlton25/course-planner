import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/LoginSignup.css";
import Axios from "axios";
import {useHistory} from "react-router-dom";
import UserContext from "../context/UserContext.js";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [majorType, setMajorType] = useState("");
    const [coursesTaken, setCoursesTaken] = useState([]);
    const [bsRequired, setBsRequired] = useState([]);
    const [courses, setCourses] = useState([]);
    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const result = await Axios.get("http://localhost:9000/courses");
            const data = result.data.sort((a, b) => (a.code > b.code) ? 1 : -1);
            setCourses(data);
        }
        fetchData();
    }, []);
    
    function validateForm() {
        return email.length > 0 && password.length > 5;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const displayName = email.substring(0, email.indexOf('@'));
        const newUser = {email, password, passwordCheck, displayName, majorType, coursesTaken, bsRequired};
        console.log(coursesTaken);
        console.log(majorType);
        console.log(bsRequired);
        (async()=>{
            await Axios.post("http://localhost:9000/users/register", newUser);
            const loginRes = await Axios.post("http://localhost:9000/users/login", {email, password});
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("");})();
        
    }

    return (
        <>
            <div className="jumbotron" style={{ textAlign: "center" }}>
                <h1 className="display-4">- Create an account - </h1>
                <p className="lead">
                    Creating an account allows you to save progress and keep track of your courses.
          </p>
            </div>
            <div className="Signup">
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
                        <Form.Text id="passwordHelpBlock" muted>
                            Your password must be at least 5 characters long.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="majorType">
                        <Form.Label>Select your major:</Form.Label>
                        <Form.Control 
                            as="select"
                            value={majorType}
                            onChange={(e) => setMajorType(e.target.value)}
                            >
                        <option value="ba">Computer Science, BA</option>
                        <option value="bs">Computer Science, BS</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="coursesTaken">
                        <Form.Label>COMP Courses Taken</Form.Label>
                        <Form.Control 
                            as="select"
                            value={coursesTaken}
                            onChange={(e) => setCoursesTaken(Array.prototype.slice.call(e.target.selectedOptions).map(o => {return o.value;}))}
                            multiple>
                        {courses.map(({code}, index) =>
                        <option value={code}>COMP{code}</option>)}
                        </Form.Control>
                        <Form.Text muted>
                            Hold CMD or CTRL to select multiple courses.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="bsRequired">
                        <Form.Label>Additional BS requirements:</Form.Label>
                        <Form.Control 
                            as="select" multiple
                            value={bsRequired}
                            onChange={(e) => setBsRequired(Array.prototype.slice.call(e.target.selectedOptions).map(o => {return o.value;}))}
                        >
                            <option value="m231">MATH 231</option>
                            <option value="m232">MATH 232</option>
                            <option value="m233">MATH 233</option>
                            <option value="m347">MATH 347</option>
                            <option value="s435">STOR 435</option>
                            <option value="p1168">PHYS 116 OR PHYS 118</option>
                            <option value="sci">Second science requirement</option>
                        </Form.Control>
                        <Form.Text muted>
                            If you are a BA student, do not select any option.  Hold CMD or CTRL to select multiple courses.
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