import React from 'react';

const Home = () => {

    return (
        <>
        <div class='page-content'>
            <h1 class='page-title'>UNC Course Tracker</h1>
            <img src='../src/images/unc-logo.png' alt='unc logo'></img>
            <h4>How you can use this app</h4>
            <ul>
                <li>
                    Organize your schedule for your remaining time at Carolina
                </li>
                <li>
                    Check your progress within a major or gen ed category:
                    <ul>
                        <li>COMP</li>
                        </ul>
                </li>
                <li>Find classes that satisfy given requirements</li>
                <li>Discover major-specific electives</li>
            </ul>
        </div>
        </>
    )
}

export default Home;