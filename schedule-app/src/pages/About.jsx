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
          <div className="col-md-8">
            <h2 className="page-title">How to use the tool:</h2>
            <h5>Setting up your profile:</h5>
            <ul>
              <li>Navigate to the sign-up button found at the top corner of the page</li>
              <li>Create an account with your email</li>
              <li>After creating an account, you will be redirected to the profile tab</li>
              <li>Fill out the form with your major information and courses taken</li>
            </ul>
            <h5>Usage:</h5>
            <p>
              This app helps you manage your schedule. Based off of the courses you have taken so far, the app will help recommend classes to take and also track your remaining requirements.
              You will also enjoy our catalog feature which allows you to search course offerings for the upcoming semester. 
            </p>
            <h5>Account maintenance:</h5>
            <p>At any time, a logged in user can update their courses taken by navigating to the Profile page and resubmitting the form.  You may also delete your profile on this page as well.</p>
          </div>
          <div className="col-4-md" style={{ width: "25%" }}>
            <div>
              <h4>Creators</h4>
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
