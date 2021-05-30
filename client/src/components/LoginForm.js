import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider'

function LoginForm(props) {
    const { login } = useContext(UserContext)

    const initInputs = {
        email: "",
        password: ""
    }
    const [inputs , setInputs] = useState(initInputs)
    const { email, password } = inputs

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }

    function handleSubmit(e) {
        e.preventDefault()
        login(inputs)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email..."
            />
            <input 
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password..."
            />
            <button>Log In</button>
        </form>
    );
}

export default LoginForm;