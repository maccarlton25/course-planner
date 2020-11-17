import React from 'react';
import Course from '../components/Course';

const CourseContainer = (props) => {
    return (
        <>
        <div className="centering">
            {props.courses.map(course => <Course course={course}/>)}
        </div>
        </>
    )
}

export default CourseContainer;