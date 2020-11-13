import React from 'react';

const About = () => {

    return(
        <>
        <div class='page-content'>
            <h1 class='page-title'>About UNC Course Tracker</h1>
            <img src='../images/unc-logo.png' alt='unc logo'></img>
            <h4>About us</h4>
            <ul>
                <li>
                    Info on creators
                </li>
                <li>
                    MERN full-stack approach:
                    <ul>
                        <li>MongoDB, Express.js, React, Node</li>
                        </ul>
                </li>
                <li>How to customize experience</li>
            </ul>
        </div>
        <ul> TODO:
            <li>
                who made it, what is it for
            </li>
            <li>
                describe the full-stack approach we took
            </li>
            <li>
                how you can add to the db
            </li>
        </ul>
        </>
    )
}

export default About;