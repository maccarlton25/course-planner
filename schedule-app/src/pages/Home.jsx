import React, { useContext } from "react";
import UserContext from "../context/UserContext.js";
import "../styles/Home.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.min.js";

const Home = () => {
  const { userData } = useContext(UserContext);

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
    "bs": "BS, Computer Science",
    "ba": "BA, Computer Science",
  };

  let getMajor = function () {
    return majorConv[userData.user.major];
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="card-deck">
            <div className="card text-white bg-dark mb-3">
              <div className="card-header">Major Requirements Remaining</div>
              <div className="card-body top-bar">
                <h2 className="card-text">0</h2>
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
                <h2 className="card-text">0</h2>
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
              {userData.user ? (<>
                <div className="card-header">{userData.user.displayName}</div>
                <div className="card-body top-bar">
                  <h5 className="card-text">{getMajor()}</h5>
                  <br></br>
                  <h5 className="card-text">{getGradTerm()}</h5>
                </div> </>) : (
                  (<>
                    <div className="card-header">Name</div>
                    <div className="card-body top-bar">
                      <h5 className="card-text">Major</h5>
                      <br></br>
                      <h5 className="card-text">Graduation Term</h5>
                    </div> </>)
                )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <div className="card text-white bg-dark mb-3">
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
                          Students may not receive credit for both COMP 110 and
                          COMP 116. Students may not receive credit for this
                          course after receiving credit for COMP 116 or higher.
                          Honors version available
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
                          This course will teach you how to organize the data
                          used in computer programs so that manipulation of that
                          data can be done efficiently on large problems and
                          large data instances. Rather than learning to use the
                          data structures found in the libraries of programming
                          languages, you will be learning how those libraries
                          are constructed, and why the items that are included
                          in them are there(and why some are excluded).
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
                          This is the first course in the introductory systems
                          sequence. Students enter the course having taken an
                          introductory programming course in a high - level
                          programming language(COMP 110) and a course in
                          discrete structures.The overarching goal is to bridge
                          the gap between a students' knowledge of a high-level
                          programming language (COMP 110) and computer
                          organization (COMP 311).
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
            </div>
          </div>

          <div className="col-3">
            <div className="card text-white bg-dark mb-3">
              <div className="card-header">Recent Courses</div>
              <div className="card-body top-bar">
                <h5>COMP 426</h5>
                <h5>COMP 426</h5>
                <h5>COMP 426</h5>
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
