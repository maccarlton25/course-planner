import React from 'react';
import Card from "react-bootstrap/Card";

const Course = (props) => {
    return(
        <>
        <Card style={{ width: '70vw' }}>
            <Card.Body>
            <Card.Title>COMP {props.course.code}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{props.course.name}</Card.Subtitle>
            <Card.Text>
                {props.course.description}
            </Card.Text>
            
            </Card.Body>
        </Card>
        </>
    )
}

export default Course;