import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FiMenu, FiArrowUp, FiShoppingCart } from 'react-icons/fi'
import { CgLogOut } from 'react-icons/cg'

function Navbar(props) {
    const { logout, userRoles } = props
    const [toggle, setToggle] = useState(false)

    const nav = {
        height: !toggle ? 50 : "50vh",
        gridTemplateColumns: !toggle ? "1fr 1fr" : "1fr"
    }

    function handleToggle() {
        setToggle(prev => !prev)
    }

    return (
            <nav style={nav}>
                {
                    !toggle ? 
                    <>
                        <FiMenu 
                            className="icon navItem" 
                            onClick={handleToggle}
                            style={{justifySelf:"left", marginLeft:"8%"}}
                        />
                        <Link to="/cart" 
                            className="navItem" 
                            style={{
                                display: "flex",
                                gridGap: 5,
                                justifySelf:"right",
                                marginRight:"8%"
                            }}
                        >
                            <FiShoppingCart style={{alignSelf:"center"}} /> MY CART
                        </Link>
                    </> :
                    <>
                        <Link to="/" 
                            onClick={handleToggle}
                            className="navItem"
                        >
                            HOME
                        </Link>
                        <Link to="/profile" onClick={handleToggle} className="navItem">PROFILE</Link>
                        { userRoles.includes("restaurant") &&
                            <Link to="/my-restaurants" onClick={handleToggle} className="navItem">MANAGE</Link> 
                        }
                        { userRoles.includes("admin") &&
                            <Link to="/admin" onClick={handleToggle} className="navItem">ADMIN</Link>
                        }
                        <Link to="/cart" 
                            onClick={handleToggle}
                            className="navItem" 
                            style={{
                                display: "flex",
                                gridGap: 5
                            }}
                        >
                            <FiShoppingCart style={{alignSelf:"center"}} /> MY CART
                        </Link>
                        <p className="navItem" onClick={logout} style={{display: "flex", gridGap: 5}}>
                        <CgLogOut style={{alignSelf:"center"}} /> LOGOUT
                        </p>
                        <FiArrowUp className="icon navItem" onClick={handleToggle} style={{color: "maroon"}} />
                    </>
                }
            </nav>
    );
}

export default Navbar;