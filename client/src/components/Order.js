import React, { useState } from 'react';

function Order(props) {
    const { items, user: { firstName, lastName, phone }, dateCreated } = props
    let total = 0

    return (
        <div className="order">
            <h3 style={{gridColumn: "1 / 5", margin: "15px 0 0 0"}}>{firstName} {lastName}</h3>
            <h5 style={{gridColumn: "1 / 5", margin: "0 0 15px 0"}}>{phone}</h5>
            {items.map((item, i) => {
                const { _id, name, price } = item
                if(!items.slice(0, i).map(item => item = item._id).includes(_id)) {
                    const quantity = items.reduce((acc, cur) => cur._id === _id ? acc + 1 : acc, 0)
                    total += price
                    return <div key={_id} className="orderedItem">
                        <>
                            <h5>{quantity}</h5>
                            <h4>x</h4>
                            <h5>{name}</h5>
                        </>
                        <h5 style={{gridColumn: "4 / 5", justifySelf: "flex-end"}}>${price}</h5>
                    </div>
                }
            })}
            <span style={{gridColumn: "1 / 5", display: "flex", justifyContent: "space-between"}}>
                <p style={{fontSize: "0.8em", alignSelf: "center"}}>{new Date(dateCreated).toLocaleString()}</p>
                <h3 style={{gridColumn: "4 / 5", justifySelf: "flex-end", paddingRight: "3%"}}>Total - ${total}</h3>
            </span>
        </div>
    );
}

export default Order;