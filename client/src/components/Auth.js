import React, { useState } from 'react';
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

function Auth(props) {
    const [toggle, setToggle] = useState(false)

    function handleToggle() {
        setToggle(prev => !prev)
    }

    return (
        <div>
            {toggle ? 
                <>
                    <h1>Log In</h1>
                    <LoginForm />
                    <p onClick={handleToggle}>Not a member?</p>
                </> :
                <>
                    <h1>Sign Up</h1>
                    <SignupForm />
                    <p onClick={handleToggle}>Already a member?</p>
                </>
            }
        </div>
    );
}

export default Auth;