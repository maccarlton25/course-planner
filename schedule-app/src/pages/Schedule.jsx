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

  const oldMajorReq = [
    "401",
    "410",
    "411",
    "455",
    "550",
    // "m231",
    // "m232",
    // "m233",
    // "m347",
    // "s435",
    // "p1168",
    // "sci",
  ];
  const newMajorReq = [
    "210",
    "211",
    "301",
    "311",
    "455",
    "550",
    "m231",
    "m232",
    "m233",
    "m347",
    "s435",
    "p1168",
    "sci",
  ];

  function majorReqLeft() {
    let userCourses = userData.user.coursesTaken;
    // let otherUserCourses = userData.user.bsRequired;
    let result = [];
    oldMajorReq.forEach((course) => {
      if (!userCourses.includes(course)) {
        result.push(course);
      }
    });
    // oldMajorReq.forEach((course) => {
    //   if (!otherUserCourses.includes(course)) {
    //     result.push(course);
    //   }
    // });
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

  function havePreReqs(course) {
    let userCourses = userData.user.coursesTaken;
    let preReqs = course.prereq;
    if (preReqs.length == 0) {
      return true;
    }
    let splitOr = preReqs.split("|");
    if (!splitOr.includes("&")) {
      splitOr.forEach((course) => {
        userCourses.forEach((ele) => {
          if (course.includes(JSON.stringify(ele.code))) {
            return true;
          }
        });
      });
    }
  }

  function getSuggestions() {
    let userCourses = userData.user.coursesTaken;
    let notTaken = courses.filter(
      (course) => !userCourses.includes(JSON.stringify(course.code))
    );
    console.log(notTaken);
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <h3>Major Requirements Remaining:</h3>
            <div className="accordion" id="accordionExample">
              {userData.user && courses ? (
                <>
                  {getSuggestions()}
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
                </>
              ) : (
                <>
                  <h5>LOADING...</h5>
                </>
              )}
            </div>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </>
  );
};

export default Schedule;
