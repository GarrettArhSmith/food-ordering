import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider'
import styled from 'styled-components'

const Form = styled.form`
    display: flex;
    flex-direction: column;
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
        <Form onSubmit={handleSubmit}>
            <Input 
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email..."
            />
            <Input 
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password..."
            />
            <SubmitBtn>Log In</SubmitBtn>
        </Form>
    );
}

export default LoginForm;