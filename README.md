# UNC Schedule Tracker

## Project Overview

UNC Schedule Planner is a tool aimed to simplify the course selection process for Computer Science students at UNC Chapel Hill.
This project was built on a MERN (MongoDB, Express, React, Node.js) stack. Below we will document the components of this project:

Backend (found in API folder)

## Key Features

User account saves major type, estimated graduation date, and previous courses taken.

Application keeps track of remaining major and elective requirements

Based on previous classes taken and remaining requirements, users are presented with suggestions for future courses.

Users can update their settings at anytime, ensuring the tool is helpful throughout their entire UNC career.

## How to Run Locally

Within the API directory, run `npm start` to initialize the back-end

Within the Schedule-App directory, run `npm start` to initialize the front-end

## Schedule-App Available Scripts (Front-End)

## Course-planner API

Course Data Access:

- Get a list of all courses:
  > url: http://localhost:9000/courses
  > type: GET
  > Returns: JSON Array of all courses
- Get course by course code
  > url: http://localhost:9000/courses/{courseCode}
  > type: GET
  > Returns: JSON Object of requested course

User API:

- Add a user:
  > url:http://localhost:9000/users
  > type: POST
  > CURL ex.: curl -X POST -H "Content-Type: application/json" --data
  > '{"name": "Mac Carlton", "username": "maccarlton", "password": "mac123", "courses_taken": ["110", "410", "411", "426"]}' http://localhost:9000/users
  > Returns: updated list of all users
- Update a users courses taken:
  > url: http://localhost:9000/users
  > type PUT
  > CURL ex.: curl -X PUT -H "Content-Type: application/json" --data
  > '{"courses_taken": {updatedArray}]' http://localhost:9000/users
  > Returns a updated JSON array of all users
- Get a list of all users:
  > url:http://localhost:9000/users
  > type GET
  > Returns: JSON Array of all users
- Get a specific user:
  > url:http://localhost:9000/users/{username}
  > type GET
  > Returns: JSON Object of user
- Delete a user:
  > url:http://localhost:9000/users/{username}
  > type DELETE
  > Returns: Updated array of users

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.
