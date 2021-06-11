import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import styled from 'styled-components'

const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    gap: 1rem;
    min-width: 20rem;
`

const Input = styled.input`
    grid-column: 1 / 3;
    width: 100%;
    height: 2rem;
    font-size: 1.1em;
    border: 1px solid #777;
    border-radius: 3px;
    color: #444;
`

const SubmitBtn = styled.button`
    grid-column: 1 / 3;
    border: 2px solid #444;
    border-radius: 3px;
    padding: 0.2rem 0.3rem;
    transition: 0.3s ease;
    color: #444;
    font-weight: bold;
    font-size: 1em;
    &:hover {
        color: whitesmoke;
        background: #444;
        transform: scale(1.1);
        cursor: pointer;
    }
`

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
        <Form onSubmit={handleSubmit}>
            <Input 
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                placeholder="First Name..."
                style={{gridColumn: "1/2"}}
            />
            <Input 
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                placeholder="Last Name..."
                style={{gridColumn: "2/3"}}
            />
            <Input 
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email..."
            />
            <Input 
                type="tel"
                name="phone"
                value={phone}
                onChange={handleChange}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="Phone... (111-111-1111)"
            />
            <Input 
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password..."
            />
            <SubmitBtn>Sign Up</SubmitBtn>
        </Form>
    );
}

export default SignupForm;