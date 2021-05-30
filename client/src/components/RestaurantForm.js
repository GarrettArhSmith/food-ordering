import React, { useState, useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantProvider'
import { RiCloseLine, RiAddLine } from 'react-icons/ri'

function RestaurantForm(props) {
    const { createRestaurant } = useContext(RestaurantContext)
    const { setToggle } = props

    const initInputs = {
        name: "",
        description: ""
    }
    const [inputs, setInputs] = useState(initInputs)
    const { name, description } = inputs
    const isEnabled = name.length > 0 && description.length > 0

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prev => ({...prev, [name]: value}))
    }

    function handleSubmit(e) {
        e.preventDefault()
        const { name } = e.target
        if(name === "closeRestaurantForm") {
            setToggle(prev => !prev)
        }
        if(name === "newRestaurant") {
            createRestaurant(inputs)
            setToggle(prev => !prev)
        }
    }

    return (
        <form className="restaurant">
            <label htmlFor="name">Name</label>
            <input 
                type="text" 
                name="name"
                value={name}
                onChange={handleChange}
            />
            <label htmlFor="description">Description</label>
            <input 
                type="text" 
                name="description"
                value={description}
                onChange={handleChange}
            />
            <button 
                    className="red btn"
                    name="closeRestaurantForm"
                    style={{gridColumn: "1 / 3"}}
                    onClick={handleSubmit}
                >
                    <RiCloseLine style={{fontSize: "1.1em", marginRight: 3}} /> CANCEL
                </button>
                <button 
                    className="green btn"
                    name="newRestaurant"
                    style={{gridColumn: "3 / 5"}}
                    onClick={handleSubmit}
                    disabled={!isEnabled}
                >
                    <RiAddLine style={{fontSize: "1.1em", marginRight: 3}} /> CREATE RESTAURANT
                </button>
        </form>
    );
}

export default RestaurantForm;