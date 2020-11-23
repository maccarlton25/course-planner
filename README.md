# UNC Schedule Tracker

## Project Overview

UNC Schedule Planner is a tool aimed to simplify the course selection process for Computer Science students at UNC Chapel Hill.
This project was built on a MERN (MongoDB, Express, React, Node.js) stack. Below we will document the components of this project:

## Key Features

User account saves major type, estimated graduation date, and previous courses taken.

Application keeps track of remaining major and elective requirements

Based on previous classes taken and remaining requirements, users are presented with suggestions for future courses.

Users can update their settings at anytime, ensuring the tool is helpful throughout their entire UNC career.

## How to Run Locally

Within the API directory, run `npm start` to initialize the back-end

Within the Schedule-App directory, run `npm start` to initialize the front-end

## API Documentation

Course Data Access:

- Get a list of all courses:
  - url: https://unc-schedule-backend.herokuapp.com/courses
  - type: GET
  - Returns: JSON Array of all courses
- Get course by course code
  - url: https://unc-schedule-backend.herokuapp.com/courses/{courseCode}
  - type: GET
  - Returns: JSON Object of requested course

User API:

- Add a user:
  - url: https://unc-schedule-backend.herokuapp.com//users
  - type: POST
  - CURL ex.: curl -X POST -H "Content-Type: application/json" --data
  - '{"name": "Mac Carlton", "username": "maccarlton", "password": "mac123", "courses_taken": ["110", "410", "411", "426"]}' https://unc-schedule-backend.herokuapp.com/users
  - Returns: updated list of all users
- Update a users courses taken:
  - url: https://unc-schedule-backend.herokuapp.com/users
  - type PUT
  - CURL ex.: curl -X PUT -H "Content-Type: application/json" --data
  - '{"courses_taken": {updatedArray}]' https://unc-schedule-backend.herokuapp.com/users
  - Returns a updated JSON array of all users
- Get a list of all users:
  - url: https://unc-schedule-backend.herokuapp.com/users
  - type GET
  - Returns: JSON Array of all users
- Get a specific user:
  - url: https://unc-schedule-backend.herokuapp.com/users/{username}
  - type GET
  - Returns: JSON Object of user
- Delete a user:
  - url: https://unc-schedule-backend.herokuapp.com/users/{username}
  - type DELETE
  - Returns: Updated array of users
