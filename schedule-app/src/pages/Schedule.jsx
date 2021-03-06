import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext.js";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../styles/Schedule.css";
import Course from "../components/Course";
import Card from "react-bootstrap/Card";

const Schedule = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const coursesData = require("../compclasses.json");
  const coursesArr = coursesData.courses.sort((a, b) =>
    a.code > b.code ? 1 : -1
  );

  useEffect(() => {
    async function fetchData() {
      const result = await Axios.get("http://localhost:9000/courses");
      const data = result.data.sort((a, b) => (a.code > b.code ? 1 : -1));
      setCourses(data);
    }
    fetchData();
  }, []);

  const oldBSReq = ["401", "410", "411", "455", "550"];
  const bsReq = ["m231", "m232", "m233", "m347", "s435", "p1168", "sci"];
  const newBSReq = ["210", "211", "301", "311", "455", "550"];

  const oldBAReq = ["401", "410", "411"];
  const baReq = ["m231", "s435"];
  const newBAReq = ["210", "211", "301", "311"];

  function majorReqLeft() {
    let userCourses = userData.user.coursesTaken;
    let result = [];
    if (userData.user.major == "bs") {
      if (userCourses.includes("401")) {
        oldBSReq.forEach((course) => {
          if (!userCourses.includes(course)) {
            result.push(getCourse(course)[0]);
          }
        });
      } else {
        newBSReq.forEach((course) => {
          if (!userCourses.includes(course)) {
            result.push(getCourse(course)[0]);
          }
        });
      }
    } else {
      if (userCourses.includes("401")) {
        oldBAReq.forEach((course) => {
          if (!userCourses.includes(course)) {
            result.push(getCourse(course)[0]);
          }
        });
      } else {
        newBAReq.forEach((course) => {
          if (!userCourses.includes(course)) {
            result.push(getCourse(course)[0]);
          }
        });
      }
    }
    return result;
  }

  function baOtherReq() {
    let result = 2;
    if (userData.user.bsRequired.includes("m231")) {
      result--;
    }
    if (userData.user.bsRequired.includes("s435")) {
      result--;
    }
    return result;
  }

  function electivesLeft(taken) {
    let userCourses = userData.user.coursesTaken;
    let result = [];
    let output = 0;
    if (userData.user.major == "bs") {
      userCourses.forEach((course) => {
        if (!oldBSReq.includes(course)) {
          if (parseInt(course) > 420) {
            result.push(getCourse(course)[0]);
          }
        }
      });
      if (result.length >= 5) {
        output = 0;
      } else {
        output = 5 - result.length;
      }
    } else {
      userCourses.forEach((course) => {
        if (!oldBAReq.includes(course)) {
          if (parseInt(course) > 420) {
            result.push(getCourse(course)[0]);
          }
        }
      });
      if (result.length >= 2) {
        output = 0;
      } else {
        output = 2 - result.length;
      }
    }
    if (taken) {
      return result;
    } else {
      return output;
    }
  }

  function getCourse(num) {
    return coursesArr.filter((course) => course.code == num);
  }

  function getSuggCourseTitle(course) {
    if (course.code == 581) {
      return "COMP 581: Introduction to Robotics";
    }
    return course.dept + " " + course.code + ": " + course.name;
  }

  function havePreReqs(input) {
    let hasPreReqs = [];
    let userCourses = userData.user.coursesTaken;
    let preReq = input.prereq;
    if (preReq.length == 0) {
      return true;
    }
    for (let i = 0; i < preReq.length; i++) {
      let splitOr = preReq[0].split("|");
      let splitAnd = [];
      splitOr.forEach((element) => {
        splitAnd.push(element.split("&"));
      });
      for (let i = 0; i < splitAnd.length; i++) {
        for (let j = 0; j < splitAnd[i].length; j++) {
          splitAnd[i][j] = splitAnd[i][j].substring(4);
        }
      }
      for (let i = 0; i < splitAnd.length; i++) {
        if (userCourses.includes(splitAnd[i][splitAnd[i].length - 1])) {
          hasPreReqs.push(true);
        }
      }
    }
    if (hasPreReqs.includes(false) | (hasPreReqs.length == 0)) {
      return false;
    } else {
      return true;
    }
  }

  function getSuggestions(first) {
    let userCourses = userData.user.coursesTaken;
    let notTaken = coursesArr.filter(
      (course) => !userCourses.includes(JSON.stringify(course.code))
    );
    let notTakenHasPR = [];
    notTaken.forEach((course) => {
      if (havePreReqs(course)) {
        if ((course.code > 200) & (course.code < 600)) {
          notTakenHasPR.push(course);
        }
      }
    });
    let suggArr = [];
    if (first) {
      suggArr.push(notTakenHasPR[0]);
    } else {
      for (let i = 1; i < notTakenHasPR.length; i++) {
        suggArr.push(notTakenHasPR[i]);
      }
    }
    return suggArr;
  }

  return (
    <>
      <div className="container">
        <div className="row screen">
          <div className="col-md-7">
            <div>
              {userData.user ? (
                <>
                  <div className="row">
                    <div className="card-deck">
                      <div className="top card text-white bg-dark mb-3">
                        <div className="card-header">
                          Major Requirements Remaining
                        </div>
                        <div className="card-body top-bar">
                          {userData.user ? (
                            <>
                              <h2 className="card-text">
                                {userData.user.major == "bs" && (
                                  <>
                                    {7 -
                                      userData.user.bsRequired.length +
                                      majorReqLeft().length}
                                  </>
                                )}
                                {userData.user.major == "ba" && (
                                  <>{majorReqLeft().length + baOtherReq()}</>
                                )}
                              </h2>
                              <h2></h2>
                            </>
                          ) : (
                            <>
                              <h2 className="card-text">0</h2>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="top card text-white bg-dark mb-3">
                        <div className="card-header">
                          Major Electives Remaining
                        </div>
                        <div className="card-body top-bar">
                          {userData.user ? (
                            <>
                              <h2 className="card-text">
                                {electivesLeft(false)}
                              </h2>
                              <h2></h2>
                            </>
                          ) : (
                            <>
                              <h2 className="card-text">0</h2>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card text-white bg-dark mb-3">
                    <div className="card-header">
                      <h5>All the courses you qualify for:</h5>
                      <p className="desc">
                        These are all courses that you have the necessary
                        prerequisites for, but have not taken yet.
                      </p>
                    </div>
                    <div className="card-body top-bar">
                      <div
                        id="carouselIndicators"
                        className="carousel slide"
                        data-ride="carousel"
                      >
                        <div className="carousel-inner">
                          <>
                            {getSuggestions(true).map((course) => (
                              <div className="carousel-item active">
                                <img
                                  src={require("../images/UNC_logo_RGB.png")}
                                  alt="course1"
                                />
                                <div className="text-center">
                                  <h5>{getSuggCourseTitle(course)}</h5>
                                  <p>{course.description}</p>
                                </div>
                              </div>
                            ))}
                            {getSuggestions(false).map((course) => (
                              <div className="carousel-item">
                                <img
                                  src={require("../images/UNC_logo_RGB.png")}
                                  alt="course1"
                                />
                                <div className="text-center">
                                  <h5>{getSuggCourseTitle(course)}</h5>
                                  <p>{course.description}</p>
                                </div>
                              </div>
                            ))}
                          </>
                        </div>

                        <a
                          className="carousel-control-prev"
                          href="#carouselIndicators"
                          role="button"
                          data-slide="prev"
                        >
                          <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="sr-only">Previous</span>
                        </a>
                        <a
                          className="carousel-control-next"
                          href="#carouselIndicators"
                          role="button"
                          data-slide="next"
                        >
                          <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="sr-only">Next</span>
                        </a>
                      </div>
                    </div>
                    <div className="card-footer bg-dark">
                      <Link to="/catalog">
                        <Button block size="med">
                          View All Courses
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="card-header">Suggestions for you:</div>
                  <div className="card-body top-bar">
                    <div
                      id="carouselIndicators"
                      className="carousel slide"
                      data-ride="carousel"
                    >
                      <ol className="carousel-indicators">
                        <li
                          data-target="#carouselIndicators"
                          data-slide-to="0"
                          className="active"
                        ></li>
                        <li
                          data-target="#carouselIndicators"
                          data-slide-to="1"
                        ></li>
                        <li
                          data-target="#carouselIndicators"
                          data-slide-to="2"
                        ></li>
                      </ol>
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <img
                            src={require("../images/UNC_logo_RGB.png")}
                            alt="course1"
                          />
                          <div className="text-center">
                            <h5>COMP 110: Introduction to Programming</h5>
                            <p>
                              An introduction to programming. Fundamental
                              programming skills, typically using Java or
                              JavaScript. Problem analysis and algorithm design.
                              Students may not receive credit for both COMP 110
                              and COMP 116. Students may not receive credit for
                              this course after receiving credit for COMP 116 or
                              higher. Honors version available
                            </p>
                          </div>
                        </div>
                        <div className="carousel-item">
                          <img
                            src={require("../images/UNC_logo_RGB.png")}
                            alt="course2"
                          />
                          <div className="text-center">
                            <h5>COMP 210: Data Structures and Analysis</h5>
                            <p>
                              This course will teach you how to organize the
                              data used in computer programs so that
                              manipulation of that data can be done efficiently
                              on large problems and large data instances. Rather
                              than learning to use the data structures found in
                              the libraries of programming languages, you will
                              be learning how those libraries are constructed,
                              and why the items that are included in them are
                              there(and why some are excluded).
                            </p>
                          </div>
                        </div>
                        <div className="carousel-item">
                          <img
                            src={require("../images/UNC_logo_RGB.png")}
                            alt="course3"
                          />
                          <div className="text-center">
                            <h5>COMP 211: Systems Fundamentals</h5>
                            <p>
                              This is the first course in the introductory
                              systems sequence. Students enter the course having
                              taken an introductory programming course in a high
                              - level programming language(COMP 110) and a
                              course in discrete structures.The overarching goal
                              is to bridge the gap between a students' knowledge
                              of a high-level programming language (COMP 110)
                              and computer organization (COMP 311).
                            </p>
                          </div>
                        </div>
                      </div>
                      <a
                        className="carousel-control-prev"
                        href="#carouselIndicators"
                        role="button"
                        data-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="sr-only">Previous</span>
                      </a>
                      <a
                        className="carousel-control-next"
                        href="#carouselIndicators"
                        role="button"
                        data-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="sr-only">Next</span>
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-md-5">
            <div className="rightPanel">
              <ul
                class="nav nav-pills mb-3 justify-content-center"
                id="pills-tab"
                role="tablist"
              >
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link active"
                    id="pills-home-tab"
                    data-toggle="pill"
                    href="#pills-home"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    Major
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link"
                    id="pills-profile-tab"
                    data-toggle="pill"
                    href="#pills-profile"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Electives
                  </a>
                </li>
              </ul>
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div>
                    <h4>Major Requirements Remaining:</h4>{" "}
                    {userData.user ? (
                      <>
                        {majorReqLeft().map((course) => (
                          <Course course={course} />
                        ))}
                        {majorReqLeft().length != 0 && (
                          <Card>
                            <Card.Body>
                              <Card.Subtitle className="mb-2 text-muted">
                                Don't forget about your additional requirements.
                              </Card.Subtitle>
                              <Card.Text>
                                {userData.user.major == "bs" && (
                                  <>
                                    <ul>
                                      {!userData.user.bsRequired.includes(
                                        "m231"
                                      ) && (
                                        <>
                                          <li>MATH 231</li>
                                        </>
                                      )}
                                      {!userData.user.bsRequired.includes(
                                        "m232"
                                      ) && (
                                        <>
                                          <li>MATH 232</li>
                                        </>
                                      )}
                                      {!userData.user.bsRequired.includes(
                                        "m233"
                                      ) && (
                                        <>
                                          <li>MATH 233</li>
                                        </>
                                      )}
                                      {!userData.user.bsRequired.includes(
                                        "m347"
                                      ) && (
                                        <>
                                          <li>MATH 347/547</li>
                                        </>
                                      )}
                                      {!userData.user.bsRequired.includes(
                                        "s435"
                                      ) && (
                                        <>
                                          <li>STOR 435</li>
                                        </>
                                      )}
                                      {!userData.user.bsRequired.includes(
                                        "p1168"
                                      ) && (
                                        <>
                                          <li>PHYS 116/118</li>
                                        </>
                                      )}
                                      {!userData.user.bsRequired.includes(
                                        "sci"
                                      ) && (
                                        <>
                                          <li>Second Science Course</li>
                                        </>
                                      )}
                                    </ul>
                                  </>
                                )}
                                {userData.user.major == "ba" && (
                                  <>
                                    <ul>
                                      {!userData.user.bsRequired.includes(
                                        "m231"
                                      ) && (
                                        <>
                                          <li>MATH 231</li>
                                        </>
                                      )}
                                      {!userData.user.bsRequired.includes(
                                        "s435"
                                      ) && (
                                        <>
                                          <li>STOR 435</li>
                                        </>
                                      )}
                                      <li>
                                        Four Additional Electives - see
                                        registrars website for details
                                      </li>
                                    </ul>
                                  </>
                                )}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        )}
                        {majorReqLeft().length == 0 && (
                          <Card>
                            <Card.Body>
                              <Card.Title>
                                No CS Requirements remaining
                              </Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">
                                Don't forget about your additional requirements.
                              </Card.Subtitle>
                              <Card.Text>
                                {userData.user.major == "bs" && (
                                  <>
                                    <ul>
                                      {!userData.user.bsRequired.includes(
                                        "m231"
                                      ) && (
                                        <>
                                          <li>MATH 231</li>
                                        </>
                                      )}
                                      {!userData.user.bsRequired.includes(
                                        "m232"
                                      ) && (
                                        <>
                                          <li>MATH 232</li>
                                        </>
                                      )}
                                      {!userData.user.bsRequired.includes(
                                        "m233"
                                      ) && (
                                        <>
                                          <li>MATH 233</li>
                                        </>
                                      )}
                                      {!userData.user.bsRequired.includes(
                                        "m347"
                                      ) && (
                                        <>
                                          <li>MATH 347/547</li>
                                        </>
                                      )}
                                      {!userData.user.bsRequired.includes(
                                        "s435"
                                      ) && (
                                        <>
                                          <li>STOR 435</li>
                                        </>
                                      )}
                                      {!userData.user.bsRequired.includes(
                                        "p1168"
                                      ) && (
                                        <>
                                          <li>PHYS 116/118</li>
                                        </>
                                      )}
                                      {!userData.user.bsRequired.includes(
                                        "sci"
                                      ) && (
                                        <>
                                          <li>Second Science Course</li>
                                        </>
                                      )}
                                    </ul>
                                  </>
                                )}
                                {userData.user.major == "ba" && (
                                  <>
                                    <ul>
                                      {!userData.user.bsRequired.includes(
                                        "m231"
                                      ) && (
                                        <>
                                          <li>MATH 231</li>
                                        </>
                                      )}
                                      {!userData.user.bsRequired.includes(
                                        "s435"
                                      ) && (
                                        <>
                                          <li>STOR 435</li>
                                        </>
                                      )}
                                      <li>
                                        Four Additional Electives - see
                                        registrars website for details
                                      </li>
                                    </ul>
                                  </>
                                )}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        )}
                      </>
                    ) : (
                      <>
                        <h5>LOADING...</h5>
                      </>
                    )}
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <div>
                    <h4>Electives Taken:</h4>{" "}
                    {userData.user ? (
                      <>
                        {electivesLeft(true).map((course) => (
                          <Course course={course} />
                        ))}
                      </>
                    ) : (
                      <>
                        <h5>LOADING...</h5>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;
