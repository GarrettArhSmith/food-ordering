import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';

function SignupForm(props) {
    const { signup } = useContext(UserContext)

    const initInputs = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: ""
    }
    const [inputs, setInputs] = useState(initInputs)
    const { firstName, lastName, email, phone, password } = inputs

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }

    function handleSubmit(e) {
        e.preventDefault()
        signup(inputs)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                placeholder="First Name..."
            />
            <input 
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                placeholder="Last Name..."
            />
            <input 
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email..."
            />
            <input 
                type="tel"
                name="phone"
                value={phone}
                onChange={handleChange}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="Phone... (111-111-1111)"
            />
            <input 
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password..."
            />
            <button>Sign Up</button>
        </form>
    );
}

export default SignupForm;