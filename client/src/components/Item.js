import React, { useContext, useEffect, useState } from 'react';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri'
import { CartContext } from '../context/CartProvider'

const inCartStyle ={
    backgroundColor: "#f3f3f3",
    borderLeft: "6px solid cornflowerblue",
}
const normStyle ={
    backgroundColor: "#f8f8f8",
    borderLeft: "6px solid yellowgreen"
}

function Item(props) {
    const { addToCart, deleteFromCart, getOrderItem } = useContext(CartContext)
    const { _id } = props

    const [orderItem, setOrderItem] = useState("")

    function handleClick(e) {
        e.preventDefault()
        const { name } = e.currentTarget
        if(name === "add") addToCart(_id, setOrderItem)
        if(name === "delete") deleteFromCart(orderItem._id, setOrderItem)
    }

    useEffect(() => {
        getOrderItem(_id, setOrderItem)
        return () => {
            setOrderItem("")
        }
    }, [])

    return (
        <div className="item" style={orderItem ? inCartStyle : normStyle}>
            <h4 style={{gridColumn: "1 / 4"}}>{props.name} - ${props.price}</h4>
            <p style={{gridColumn: "1 / 4"}}>{props.description}</p>
            <div className="actions">
                {!orderItem ?
                    <button className="blue btn" onClick={handleClick} name="add">
                        <RiAddLine />
                    </button> :
                    <button className="red btn" onClick={handleClick} name="delete">
                        <RiSubtractLine />
                    </button>
                }
            </div>
        </div>
    );
}

export default Item;