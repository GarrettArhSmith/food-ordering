import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider'


function Profile(props) {
    const { user: { firstName, lastName, email, phone, memberSince } } = useContext(UserContext)

    const header = { margin: 0 }

    return (
        <div>
            <h1>Profile</h1>
            <div className="list" style={{gridGap: 0}}>
                <span className="profileDetail">
                    <h5 style={header}>First Name</h5>
                    <p>{firstName[0].toUpperCase() + firstName.substring(1)}</p>
                </span>
                <span className="profileDetail">
                    <h5 style={header}>Last Name</h5>
                    <p>{lastName[0].toUpperCase() + lastName.substring(1)}</p>
                </span>
                <span className="profileDetail">
                    <h5 style={header}>Email</h5>
                    <p>{email}</p>
                </span>
                <span className="profileDetail">
                    <h5 style={header}>Phone</h5>
                    <p>{phone}</p>
                </span>
                <span className="profileDetail">
                    <h5 style={header}>Member Since</h5>
                    <p>{new Date(memberSince).toLocaleString()}</p>
                </span>
            </div>
        </div>
    );
}

export default Profile;