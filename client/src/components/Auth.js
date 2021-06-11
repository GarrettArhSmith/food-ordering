import React, { useState } from 'react';
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import styled from 'styled-components'
import { GiBananaBunch } from 'react-icons/gi'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(320deg, rgba(71,158,150,1) 0%, rgba(173,219,143,1) 100%);
`

const Logo = styled.h1`
    color: whitesmoke;
    text-shadow: 0 0 10px 3px rgba(0,0,0,0.1);
    font-family: 'Staatliches';
    display: flex;
    place-items: center;
    gap: 1rem;
    font-size: 3em;
    margin-top: -5rem;
`

const Card = styled.div`
    background: whitesmoke;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 0 10px 3px rgba(0,0,0,0.1);
    color: #444;
    transition: 0.2s ease;
`

const ToggleBtn = styled.button`
    border: none;
    border-radius: 3px;
    margin: 1rem;
    padding: 0.3rem;
    background: transparent;
    transition: 0.3s ease;
    &:hover {
        transform: scale(1.1);
        cursor: pointer;
        color: rgba(71,158,150,1);
    }
`

function Auth(props) {
    const [toggle, setToggle] = useState(false)

    function handleToggle() {
        setToggle(prev => !prev)
    }

    return (
        <Container>
            <Logo><GiBananaBunch />MealMonkey</Logo>
            {toggle ? 
                <Card>
                    <h1>Log In</h1>
                    <LoginForm />
                    <ToggleBtn onClick={handleToggle}>Not a member?</ToggleBtn>
                </Card> :
                <Card>
                    <h1>Sign Up</h1>
                    <SignupForm />
                    <ToggleBtn onClick={handleToggle}>Already a member?</ToggleBtn>
                </Card>
            }
        </Container>
    );
}

export default Auth;