import React, { useState } from 'react';
import { RiAddLine, RiCloseLine } from 'react-icons/ri'

function Item(props) {
    const { addItem, menuId, setToggle } = props
    const initInputs = {
        name: "",
        price: 0,
        description: ""
    }
    const [inputs, setInputs] = useState(initInputs)
    const { name, price, description } = inputs
    const isEnabled = name.length > 0 && description.length > 0

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prev => ({...prev, [name]: value}))
    }

    function handleSubmit(e) {
        e.preventDefault()
        const { name } = e.target
        if(name === "newItem") {
            addItem(menuId, inputs)
        }
        if(name === "closeItemForm") setToggle(prev => !prev)
    }

    return (
        <form className="item">
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Name..."
                required
            />
            <label htmlFor="price">Price</label>
            <input
                type="number"
                name="price"
                value={price}
                onChange={handleChange}
                placeholder="Price..."
                required
            />
            <label htmlFor="description">Description</label>
            <input
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Description..."
                required
            />
            <p style={{color: "red"}}></p>
            <button
                className="red btn"
                style={{gridColumn: "1 / 3"}}
                onClick={handleSubmit}
                name="closeItemForm"
            >
                <RiCloseLine style={{fontSize: "1.1em", marginRight: 3}} /> CANCEL
            </button>
            <button 
                className="green btn" 
                style={{gridColumn: "3 / 5"}}
                onClick={handleSubmit}
                name="newItem"
                disabled={!isEnabled}
            >
                <RiAddLine style={{fontSize: "1.1em", marginRight: 3}} /> ADD ITEM
            </button>
        </form>
    );
}

export default Item;