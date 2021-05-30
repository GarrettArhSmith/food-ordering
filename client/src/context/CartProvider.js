import React, { useState } from 'react'
import axios from 'axios'

export const CartContext = React.createContext()

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function CartProvider({children}) {
    const [orderItems, setOrderItems] = useState([])

    function getCart() {
        userAxios.get("/api/order-item/")
            .then(res => {
                setOrderItems(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getOrderItem(itemId, setOrderItem) {
        userAxios.get(`/api/order-item/item/${itemId}`)
            .then(res => setOrderItem(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addToCart(itemId, setOrderItem) {
        userAxios.post(`/api/order-item/${itemId}`)
            .then(res => {
                setOrderItems(prev => [...prev, res.data])
                setOrderItem && setOrderItem(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function deleteFromCart(orderItemId, setOrderItem) {
        userAxios.delete(`/api/order-item/${orderItemId}`)
            .then(res => {
                setOrderItems(prev => prev.filter(orderItem => orderItem._id !== orderItemId))
                setOrderItem && setOrderItem("")
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function clearCart() {
        userAxios.delete("/api/order-item/")
            .then(res => setOrderItems([]))
            .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <CartContext.Provider
            value={{
                orderItems,
                getCart,
                getOrderItem,
                addToCart, 
                deleteFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;