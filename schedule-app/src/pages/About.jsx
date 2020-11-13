import React from "react";

const About = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="jumbotron" style={{ textAlign: "center" }}>
          <h1 className="display-4">- UNC Course Tracker - </h1>
          <p className="lead">
            This is a tool aimed to simplify the course selection process while
            studying at UNC Chapel Hill.
          </p>
        </div>
        <div className="row">
          <div className="col-8">
            <h2 className="page-title">How to use the tool:</h2>
            <p className="lead">
              INSERT INSTRUCTIONS AFTER THE HOME/SCHEDULING PAGES ARE DEVELOPED
            </p>
          </div>
          <div className="col-4" style={{ width: "25%" }}>
            <div>
              <h4>About the Creators</h4>
              <ul>
                <li>Stephen Allen</li>
                <li>Mac Carlton</li>
                <li>Jack Hebert</li>
                <li>Rushil Shah</li>
              </ul>
            </div>
            <div>
              <h4>Our Approach: MERN Stack</h4>
              <ul>
                <li>MongoDB</li>
                <li>Express.js</li>
                <li>React</li>
                <li>Node</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
