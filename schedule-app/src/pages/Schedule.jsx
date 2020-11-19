import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext.js";
import Axios from "axios";

const Schedule = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [courses, setCourses] = useState([]);

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
            result.push(course);
          }
        });
      } else {
        newBSReq.forEach((course) => {
          if (!userCourses.includes(course)) {
            result.push(course);
          }
        });
      }
    } else {
      if (userCourses.includes("401")) {
        oldBAReq.forEach((course) => {
          if (!userCourses.includes(course)) {
            result.push(course);
          }
        });
      } else {
        newBAReq.forEach((course) => {
          if (!userCourses.includes(course)) {
            result.push(course);
          }
        });
      }
    }
    return result;
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
    }
    return result;
  }

  function getCourseTitle(num) {
    let obj = courses.filter((course) => course.code == num);
    if (obj[0]) {
      return obj[0].dept + " " + obj[0].code + ": " + obj[0].name;
    }
  }

  function getCourseDes(num) {
    let obj = courses.filter((course) => course.code == num);
    if (obj[0]) {
      return obj[0].description;
    }
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

  function getSuggestions() {
    let userCourses = userData.user.coursesTaken;
    let notTaken = courses.filter(
      (course) => !userCourses.includes(JSON.stringify(course.code))
    );
    console.log(notTaken);
    let notTakenHasPR = [];
    notTaken.forEach((course) => {
      if (havePreReqs(course)) {
        notTakenHasPR.push(course);
      }
    });
    console.log(notTakenHasPR);
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h3>Major Requirements Remaining:</h3>
            <div className="accordion" id="accordionExample">
              {userData.user && courses ? (
                <>
                  {majorReqLeft().map((num) => (
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
                            {getCourseTitle(num)}
                          </button>
                        </h5>
                      </div>
                      <div
                        id="collapseOne"
                        className="collapse show"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">{getCourseDes(num)}</div>
                      </div>
                    </div>
                  ))}
                  {getSuggestions()}
                </>
              ) : (
                <>
                  <h5>LOADING...</h5>
                </>
              )}
            </div>
          </div>
          <div className="col-6">
            <h3>Electives Remaining:</h3>
            <div className="accordion" id="accordionExample">
              {userData.user && courses ? (
                <>
                  {electivesLeft().map((num) => (
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
                            {getCourseTitle(num)}
                          </button>
                        </h5>
                      </div>
                      <div
                        id="collapseOne"
                        className="collapse show"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">{getCourseDes(num)}</div>
                      </div>
                    </div>
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
        <div className="row">
          <div className="col"></div>
        </div>
      </div>
    </>
  );
};

export default Schedule;
