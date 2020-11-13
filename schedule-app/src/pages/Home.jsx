import React from "react";
import "../styles/Home.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/js/bootstrap.min.js";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="card-deck">
            <div className="card text-white bg-dark mb-3">
              <div className="card-header">Major Requirements Remaining</div>
              <div className="card-body top-bar">
                <h1 className="card-text">0</h1>
              </div>
              <div className="card-footer bg-dark">
                <Button block size="med">
                  Details
                </Button>
              </div>
            </div>
            <div className="card text-white bg-dark mb-3">
              <div className="card-header">Major Electives Remaining</div>
              <div className="card-body top-bar">
                <h1 className="card-text">0</h1>
              </div>
              <div className="card-footer bg-dark">
                <Button block size="med">
                  Details
                </Button>
              </div>
            </div>
            <div className="card text-white bg-dark mb-3">
              <div className="card-header">INSERT USER NAME</div>
              <div className="card-body top-bar">
                <h5 className="card-text">MAJOR</h5>
                <h5 className="card-text">GRAD DATE</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <h3>Suggestions for you:</h3>
            <div className="accordion" id="accordionExample">
              <div className="card z-depth-0 bordered">
                <div className="card-header bg-dark" id="headingOne">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      COMP 110: Introduction to Programming
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div className="card-body">
                    An introduction to programming. Fundamental programming
                    skills, typically using Java or JavaScript. Problem analysis
                    and algorithm design. Students may not receive credit for
                    both COMP 110 and COMP 116. Students may not receive credit
                    for this course after receiving credit for COMP 116 or
                    higher. Honors version available
                  </div>
                </div>
              </div>
              <div className="card z-depth-0 bordered">
                <div className="card-header bg-dark" id="headingTwo">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      COMP 210: Data Structures and Analysis
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionExample"
                >
                  <div className="card-body">
                    This course will teach you how to organize the data used in
                    computer programs so that manipulation of that data can be
                    done efficiently on large problems and large data
                    instances.Rather than learning to use the data structures
                    found in the libraries of programming languages, you will be
                    learning how those libraries are constructed, and why the
                    items that are included in them are there(and why some are
                    excluded).
                  </div>
                </div>
              </div>
              <div className="card z-depth-0 bordered">
                <div className="card-header bg-dark" id="headingThree">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      COMP 211: Systems Fundamentals
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseThree"
                  className="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordionExample"
                >
                  <div className="card-body">
                    This is the first course in the introductory systems
                    sequence.Students enter the course having taken an
                    introductory programming course in a high - level
                    programming language(COMP 110) and a course in discrete
                    structures.The overarching goal is to bridge the gap between
                    a students ' knowledge of a high-level programming language
                    (COMP 110) and computer organization (COMP 311).
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card text-white bg-dark mb-3">
              <div className="card-header">Current Schedule</div>
              <div className="card-body top-bar">
                <h5>COMP 426</h5>
                <h5>COMP 426</h5>
                <h5>COMP 426</h5>
              </div>
              <div className="card-footer bg-dark">
                <Button block size="med">
                  Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
