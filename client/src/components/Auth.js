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
    width: 100vw;
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
    padding: 1rem 2rem;
    border-radius: 10px;
    box-shadow: 0 0 10px 3px rgba(0,0,0,0.1);
    color: #444;
    transition: 0.2s ease;
    display: grid;
`

const ToggleBtn = styled.button`
    border: none;
    border-radius: 3px;
    margin: 1rem;
    ${'' /* padding: 0.3rem; */}
    font-size: 1em;
    background: transparent;
    transition: 0.3s ease;
    &:hover {
        transform: scale(1.1);
        cursor: pointer;
        color: rgba(71,158,150,1);
    }
`

const GuestInfo = styled.p`
    color: #999;
    max-width: 70%;
    place-self: center;
    margin: 0 0 0.5rem 0;
    font-size: 0.8em;
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
                    <GuestInfo>Use email: "guest@madeupemail.com" and password: "123" to try it out!</GuestInfo>
                </Card> :
                <Card>
                    <h1>Sign Up</h1>
                    <SignupForm />
                    <ToggleBtn onClick={handleToggle}>Already a member?</ToggleBtn>
                    <GuestInfo>Use email: "guest@madeupemail.com" <br/> and password: "123" to try it out!</GuestInfo>
                </Card>
            }
        </Container>
    );
}

export default Auth;