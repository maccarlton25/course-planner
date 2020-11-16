import React, { useState, useEffect } from "react";
import Axios from "axios";
import Card from "react-bootstrap/Card";
const Catalog = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await Axios.get("http://localhost:9000/courses");
            const data = result.data.sort((a, b) => (a.code > b.code) ? 1 : -1);
            setCourses(data);
        }
        fetchData();
    }, []);

    return (
        <>
        <div className="container-fluid">
            <div className="jumbotron" style={{ textAlign: "center" }}>
                <h1 className="display-4">- UNC Course Catalog - </h1>
                <p className="lead">
                    Explore the currently offered Computer Science courses at UNC Chapel Hill.
                </p>
            </div>
            <div className="row">
                <div className="md-form mt-0">
                    <input className="form-control" type="text" placeholder="Search" aria-label="Search"></input>
                </div>
            </div>
            
            <div class="row">
                {courses.map(({code, name, description}, index) =>
                    <Card style={{ width: '70vw' }}>
                    <Card.Body>
                      <Card.Title>COMP {code}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{name}</Card.Subtitle>
                      <Card.Text>
                        {description}
                      </Card.Text>
                      
                    </Card.Body>
                  </Card>
                )}
            </div>
        </div>
        </>
    )
}

export default Catalog;