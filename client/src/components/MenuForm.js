import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider'
import { RiAddLine, RiCloseLine } from 'react-icons/ri'

function MenuForm(props) {
    const { user } = useContext(UserContext)
    const { addMenu, currentRestaurant } = props

    const [toggle, setToggle] = useState(false)
    const [inputs, setInputs] = useState({title: ""})
    const { title } = inputs
    const isEnabled = toggle ? title.length > 0 : true

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prev => ({...prev, [name]: value}))
    }

    function handleSubmit(e) {
        e.preventDefault()
        const { name } = e.target
        if(name === "newMenu") {
            toggle ?
            addMenu(currentRestaurant._id, inputs, setToggle) :
            setToggle(prev => !prev)
            setInputs({title: ""})
        }
        if(name === "closeMenuForm") {
            setToggle(prev => !prev)
            setInputs({title: ""})
        }
    }

    const menuStyle = toggle ? {
        backgroundColor: "#f8f8f8",
        borderBottom: "6px solid yellowgreen",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)"
    } : {}

    return (
        <form className="menuForm" style={menuStyle}>
            {toggle && 
            <>
                <label htmlFor="title">Title</label>
                <input 
                    name="title"
                    value={title}
                    placeholder="Title..."
                    onChange={handleChange}
                    style={{gridColumn: "1 / 5", width: "100%", height: 30}}
                />
            </>}
            {user._id === currentRestaurant?.user?._id && 
            <>
                {toggle && <button 
                    className="red btn"
                    name="closeMenuForm"
                    style={{gridColumn: "1 / 3"}}
                    onClick={handleSubmit}
                >
                    <RiCloseLine style={{fontSize: "1.1em", marginRight: 3}} /> CANCEL
                </button>}
                <button 
                    className={`${toggle ? "green" : "orange"} btn`}
                    name="newMenu"
                    style={toggle ? {gridColumn: "3 / 5"} : {gridColumn: "2 / 4"}}
                    onClick={handleSubmit}
                    disabled={!isEnabled}
                >
                    <RiAddLine style={{fontSize: "1.1em", marginRight: 3}} /> {toggle ? "ADD" : "NEW"} MENU
                </button>
            </>
            }
        </form>
    );
}

export default MenuForm;