import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartProvider'
import { OrderContext } from '../context/OrderProvider'
import { RiSendPlaneLine } from 'react-icons/ri'

import OrderItem from './OrderItem';

function Cart(props) {
    const { orderItems, getCart, deleteFromCart, clearCart } = useContext(CartContext)
    const { createOrder } = useContext(OrderContext)

    function submitOrder() {
        const restaurantId = orderItems[0]?.restaurant
        const items = []
        orderItems.forEach(orderItem => {
            items.push(orderItem.item._id)
        })
        const newOrder = {
            items: items
        }
        console.log(newOrder)
        createOrder(restaurantId, newOrder)
    }

    useEffect(() => {
        getCart()
    }, [])

    return (
        <div>
            <h1>Cart</h1>
            {orderItems.length > 0 ? [...orderItems].reverse().map(orderItem => {
                return <OrderItem 
                    key={orderItem._id}
                    {...orderItem}
                    deleteFromCart={deleteFromCart}
                />
            }): <p>Your cart is empty...</p>}
            {orderItems.length > 0 && <div style={{display: "grid", margin: "30px 0"}}>
                <button 
                    className="orange btn" 
                    style={{justifySelf: "flex-end"}}
                    onClick={submitOrder}
                >
                    <RiSendPlaneLine style={{fontSize: "1.1em", marginRight: 5}} /> SUBMIT ORDER
                </button>
            </div>}
        </div>
    );
}

export default Cart;