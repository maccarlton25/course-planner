import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext.js";
import "../styles/Home.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.min.js";
import Axios from "axios";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const { userData, setUserData } = useContext(UserContext);

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

  let semToTerm = {
    1: "Spring 2021",
    2: "Fall 2021",
    3: "Spring 2022",
    4: "Fall 2022",
    5: "Spring 2023",
    6: "Fall 2023",
    7: "Spring 2024",
    8: "Fall 2024",
  };
  let getGradTerm = function () {
    return semToTerm[userData.user.semRem];
  };

  let majorConv = {
    bs: "BS, Computer Science",
    ba: "BA, Computer Science",
  };
  let getMajor = function () {
    return majorConv[userData.user.major];
  };

  function majorReqLeft() {
    let userCourses = userData.user.coursesTaken;
    let result = [];
    if (userData.user.major == "bs") {
      let otherUserCourses = userData.user.bsRequired;

      if (userCourses.includes("401")) {
        oldBSReq.forEach((course) => {
          if (!userCourses.includes(course)) {
            result.push(course);
          }
        });
        bsReq.forEach((course) => {
          if (!otherUserCourses.includes(course)) {
            result.push(course);
          }
        });
      } else {
        newBSReq.forEach((course) => {
          if (!userCourses.includes(course)) {
            result.push(course);
          }
        });
        bsReq.forEach((course) => {
          if (!otherUserCourses.includes(course)) {
            result.push(course);
          }
        });
      }
    } else {
      let otherUserCourses = userData.user.bsRequired;
      if (userCourses.includes("401")) {
        oldBAReq.forEach((course) => {
          if (!userCourses.includes(course)) {
            result.push(course);
          }
        });
        baReq.forEach((course) => {
          if (!otherUserCourses.includes(course)) {
            result.push(course);
          }
        });
      } else {
        newBAReq.forEach((course) => {
          if (!userCourses.includes(course)) {
            result.push(course);
          }
        });
        baReq.forEach((course) => {
          if (!otherUserCourses.includes(course)) {
            result.push(course);
          }
        });
      }
    }
    return result.length;
  }

  function electivesLeft() {
    let userCourses = userData.user.coursesTaken;
    let result = [];
    let output = 0;
    if (userData.user.major == "bs") {
      userCourses.forEach((course) => {
        if (!oldBSReq.includes(course)) {
          if (parseInt(course) > 420) {
            result.push(course);
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
            result.push(course);
          }
        }
      });
      if (result.length >= 2) {
        output = 0;
      } else {
        output = 2 - result.length;
      }
    }
    return output;
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

  function getSuggestions(index) {
    let userCourses = userData.user.coursesTaken;
    if (courses) {
      let notTaken = courses.filter(
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
      for (let i = 0; i < index; i++) {
        suggArr.push(notTakenHasPR[getRandomInt(notTakenHasPR.length)]);
      }
      console.log(suggArr);
      return suggArr;
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function getCourseTitle(course) {
    console.log(course);
    return (course.code == 581) ? "COMP 581: Introduction to Robotics" : course.dept + " " + course.code + ": " + course.name;
  }

  function getRecentClasses() {
    let codes = [];
    if (userData.user.coursesTaken.length > 3) {
      for (let i = 0; i < 3; i++) {
        codes.push(
          userData.user.coursesTaken[userData.user.coursesTaken.length - 1 - i]
        );
      }
    } else {
      userData.user.coursesTaken.forEach((element) => {
        codes.push(element);
      });
    }
    let output = [];
    codes.forEach((num) => {
      let obj = courses.filter((course) => course.code == parseInt(num));
      if (obj[0]) {
        output.push(obj[0].dept + " " + obj[0].code + ": " + obj[0].name);
      }
    });
    return output;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="card-deck">
            <div className="card text-white bg-dark mb-3">
              <div className="card-header">Major Requirements Remaining</div>
              <div className="card-body top-bar">
                {userData.user ? (
                  <>
                    <h2 className="card-text">{majorReqLeft()}</h2>
                  </>
                ) : (
                  <>
                    <h2 className="card-text">0</h2>
                  </>
                )}
              </div>
              <div className="card-footer bg-dark">
                <Link to="/schedule">
                  <Button block size="med">
                    Details
                  </Button>
                </Link>
              </div>
            </div>
            <div className="card text-white bg-dark mb-3">
              <div className="card-header">Major Electives Remaining</div>
              <div className="card-body top-bar">
                {userData.user ? (
                  <>
                    <h2 className="card-text">{electivesLeft()}</h2>
                  </>
                ) : (
                  <>
                    <h2 className="card-text">0</h2>
                  </>
                )}
              </div>
              <div className="card-footer bg-dark">
                <Link to="/schedule">
                  <Button block size="med">
                    Details
                  </Button>
                </Link>
              </div>
            </div>
            <div className="card text-white bg-dark mb-3">
              {userData.user ? (
                <>
                  <div className="card-header">{userData.user.displayName}</div>
                  <div className="card-body top-bar">
                    <h5 className="card-text">{getMajor()}</h5>
                    <br></br>
                    <h5 className="card-text">{getGradTerm()}</h5>
                  </div>{" "}
                </>
              ) : (
                <>
                  <div className="card-header">Name</div>
                  <div className="card-body top-bar">
                    <h5 className="card-text">Major</h5>
                    <br></br>
                    <h5 className="card-text">Graduation Term</h5>
                  </div>{" "}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <div className="card text-white bg-dark mb-3">
              {userData.user && courses ? (
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
                        <>
                          {getSuggestions(1).map((course) => (
                            <div className="carousel-item active">
                              <img
                                src={require("../images/UNC_logo_RGB.png")}
                                alt="course1"
                              />
                              <div className="text-center">
                                <h5>{getCourseTitle(course)}</h5>
                                <p>{course.description}</p>
                              </div>
                            </div>
                          ))}
                          {getSuggestions(2).map((course) => (
                            <div className="carousel-item">
                              <img
                                src={require("../images/UNC_logo_RGB.png")}
                                alt="course1"
                              />
                              <div className="text-center">
                                <h5>{getCourseTitle(course)}</h5>
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

          <div className="col-3">
            <div className="card text-white bg-dark mb-3">
              <div className="card-header">Recent Courses</div>
              <div className="card-body top-bar">
                {userData.user ? (
                  <>
                    {getRecentClasses().map((course) => (
                      <h6 className="recent-classes">{course}</h6>
                    ))}
                  </>
                ) : (
                  <>
                    <h5>COMP 426</h5>
                    <h5>COMP 426</h5>
                    <h5>COMP 426</h5>
                  </>
                )}
              </div>
              <div className="card-footer bg-dark">
                <Link to="/schedule">
                  <Button block size="med">
                    Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
