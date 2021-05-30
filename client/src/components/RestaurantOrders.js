import React, { useState, useContext, useEffect } from 'react';
import { OrderContext } from '../context/OrderProvider'
import { RestaurantContext } from '../context/RestaurantProvider'
import { useParams } from 'react-router-dom'
import Order from './Order'

function RestaurantOrders(props) {
    const { restaurantId } = useParams()
    const { getRestaurantOrders } = useContext(OrderContext)
    const { getOneRestaurant, currentRestaurant: {name, description} } = useContext(RestaurantContext)
    const [restaurantOrders, setRestaurantOrders] = useState([])

    useEffect(() => {
        getOneRestaurant(restaurantId)
        getRestaurantOrders(restaurantId, setRestaurantOrders)
    }, [])

    return (
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <div className="list">
                {restaurantOrders.map(order => <Order key={order._id} {...order} />)}
            </div>
        </div>
    );
}

export default RestaurantOrders;