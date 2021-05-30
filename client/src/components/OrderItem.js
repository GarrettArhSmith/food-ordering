import React from 'react';
import { RiSubtractLine } from 'react-icons/ri'

function OrderItem(props) {
    const { _id, item: { name, price, description }, deleteFromCart } = props

    return (
        <div className="orderItem">
            <h3 style={{gridColumn: "1 / 4"}}>{name} - ${price}</h3>
            <p style={{marginTop: 16, gridColumn: "1 / 4"}}>{description}</p>
            <div className="actions">
                <button className="red btn" onClick={() => deleteFromCart(_id)}>
                    <RiSubtractLine />
                </button>
            </div>
        </div>
    );
}

export default OrderItem;