import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import "../styles/LoginSignup.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext.js";

const Signup = () => {
    const [majorType, setMajorType] = useState("");
    const [semRem, setSemRem] = useState(0);
    const [coursesTaken, setCoursesTaken] = useState([]);
    const [bsRequired, setBsRequired] = useState([]);
    const [courses, setCourses] = useState([]);
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const result = await Axios.get("http://localhost:9000/courses");
            const data = result.data.sort((a, b) => (a.code > b.code) ? 1 : -1);
            setCourses(data);
        }
        fetchData();
    }, []);

    function handleSubmit(e) {
        /* e.preventDefault();
        const user = { email, password, passwordCheck, displayName, majorType, coursesTaken, bsRequired, semRem };
        console.log(coursesTaken);
        console.log(majorType);
        console.log(semRem);
        (async () => {
            await Axios.post("http://localhost:9000/users/profile", user);
            const loginRes = await Axios.post("http://localhost:9000/users/login", { email, password });
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            console.log(loginRes.data);
            history.push("/");
        })(); */
    }

    return (
        <>
            <div className="jumbotron" style={{ textAlign: "center" }}>
                <h1 className="display-4">- Create your profile -</h1>
                <p className="lead">
                    Set up your profile so we can recommend relevant courses for you.
                </p>
            </div>
            <div className="Signup">
                <Container>
                    <Row>
                        <Form onSubmit={handleSubmit}>
                            <Col>
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
                                <Form.Group controlId="semRem">
                                    <Form.Label>Expected graduation:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={semRem}
                                        onChange={(e) => setSemRem(e.target.value)}
                                    >
                                        <option value={1}>2021 Spring</option>
                                        <option value={2}>2021 Fall</option>
                                        <option value={3}>2022 Spring</option>
                                        <option value={4}>2022 Fall</option>
                                        <option value={5}>2023 Spring</option>
                                        <option value={6}>2023 Fall</option>
                                        <option value={7}>2024 Spring</option>
                                        <option value={8}>2024 Fall</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="coursesTaken">
                                    <Form.Label>COMP Courses Taken</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={coursesTaken}
                                        onChange={(e) => setCoursesTaken(Array.prototype.slice.call(e.target.selectedOptions).map(o => { return o.value; }))}
                                        multiple>
                                        {courses.map(({ code }, index) =>
                                            <option value={code}>COMP{code}</option>)}
                                    </Form.Control>
                                    <Form.Text muted>
                                        Hold CMD or CTRL to select multiple courses.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="bsRequired">
                                    <Form.Label>Additional BS requirements:</Form.Label>
                                    <Form.Control
                                        as="select" multiple
                                        value={bsRequired}
                                        onChange={(e) => setBsRequired(Array.prototype.slice.call(e.target.selectedOptions).map(o => { return o.value; }))}
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
                                <Button block size="lg" type="submit">
                                    Create Account
                                </Button>
                            </Col>
                        </Form>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Signup;