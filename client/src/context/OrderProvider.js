import React, { useState } from 'react'
import axios from 'axios'

export const OrderContext = React.createContext()

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function OrderProvider({children}) {
    const [orders, setOrders] = useState([])

    function createOrder(restuarantId, newOrder) {
        userAxios.post(`/api/order/${restuarantId}`, newOrder)
            .then(res => setOrders(prev => [...prev, res.data]))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getRestaurantOrders(restaurantId, setRestaurantOrders) {
        userAxios.get(`/api/order/restaurant/${restaurantId}`)
            .then(res => setRestaurantOrders(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <OrderContext.Provider
            value={{
                orders,
                createOrder,
                getRestaurantOrders
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export default OrderProvider;