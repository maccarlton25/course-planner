import React, { useState, useEffect } from "react";
import Axios from "axios";
import CourseContainer from "../components/CourseContainer";
const Catalog = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        async function fetchData() {
            const result = await Axios.get("http://localhost:9000/courses");
            const data = result.data.sort((a, b) => (a.code > b.code) ? 1 : -1);
            setCourses(data);
        }
        fetchData();
    }, []);
    const editSearchTerm = (e) => {
        var val = e.target.value;
        // console.log("change");
        setTimeout(()=> {setSearchTerm(val);}, 100);
    }
    const dynamicSearch = (e) => {
        return courses.filter(function(course) {
            return course.code.toString().includes(searchTerm.toString());
        })
    }
    return (
        <>
        <div className="container-fluid">
            <div className="jumbotron" style={{ textAlign: "center" }}>
                <h1 className="display-4">- UNC Course Catalog - </h1>
                <p className="lead">
                    Explore the currently offered Computer Science courses at UNC Chapel Hill.
                </p>
            </div>
            <div className="row">
                <div class="md-form active-cyan-2 mb-3">                    
                    <input className="form-control" type="text" 
                            placeholder="Search" aria-label="Search" value={searchTerm} 
                            onChange={editSearchTerm}>
                    </input>
                    <p class="text-muted">Type a course code here</p>
                </div>
            </div>
                <CourseContainer courses={dynamicSearch()}/>
            <div class="row">
                
            </div>
        </div>
        </>
    )
}

export default Catalog;
