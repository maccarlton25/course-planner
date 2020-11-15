import React, { useState, useEffect } from "react";
import "./App.css";
import NavbarContainer from "./components/NavbarContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "./context/UserContext.js";
import Axios from "axios";

function App() {
    // constructor(props) {
    //     super(props);
    //     this.state = { apiResponse: "" };
    // }

    // callAPI() {
    //     fetch("http://localhost:9000/testAPI")
    //         .then((res) => res.text())
    //         .then((res) => this.setState({ apiResponse: res }));
    // }

    // componentWillMount() {
    //     this.callAPI();
    // }

    const [userData, setUserData] = useState({ token: undefined, user: undefined });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            if (token == null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            const tokenRes = await Axios.post(
                "http://localhost:9000/users/tokenIsValid",
                null, {
                headers: { "x-auth-token": token }
            }
            );
            if (tokenRes.data) {
                const userRes = await Axios.get("http://localhost:9000/users/", 
                { headers: 
                    { "x-auth-token": token }, 
                });
                setUserData({
                    token,
                    user: userRes.data,
                });
            }
        }
        checkLoggedIn();
    }, []);

    return (
        <UserContext.Provider value={{ userData, setUserData }} >
            <NavbarContainer>
            </NavbarContainer>
            { /* <p>{this.state.apiResponse.item}</p> */}
        </UserContext.Provider>
    );

}
export default App;