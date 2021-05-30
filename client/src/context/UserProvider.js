import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export const UserContext = React.createContext()

function UserProvider(props) {
    const history = useHistory();
    const initUserState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        errorMsg: ""
    }
    const [userState, setUserState] = useState(initUserState)

    function signup(credentials) {
        axios.post("auth/signup", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prev => ({...prev, token, user}))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }
    function login(credentials) {
        axios.post("auth/login", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prev => ({...prev, token, user}))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState(initUserState)
        history.push("/")
        window.location.reload()
    }

    return (
        <UserContext.Provider
            value={{
                ...userState,
                signup,
                login,
                logout
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider;