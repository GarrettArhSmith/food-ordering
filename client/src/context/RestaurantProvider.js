import React, { useState } from 'react'
import axios from 'axios'

export const RestaurantContext = React.createContext()

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function RestaurantProvider(props) {
    const [myRestaurants, setMyRestaurants] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [currentRestaurant, setCurrentRestaurant] = useState([])

    function getAllRestaurants() {
        userAxios.get("/api/restaurant")
            .then(res => {
                setRestaurants(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getUserRestaurants(userId) {
        userAxios.get(`/api/restaurant/user/${userId}`)
            .then(res => {
                setMyRestaurants(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getOneRestaurant(restaurantId) {
        userAxios.get(`/api/restaurant/${restaurantId}`)
            .then(res => {
                setCurrentRestaurant(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function createRestaurant(newRestaurant) {
        userAxios.post("/api/restaurant", newRestaurant)
            .then(res => setMyRestaurants(prev => [...prev, res.data]))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function deleteRestaurant(restaurantId) {
        userAxios.delete(`/api/restaurant/${restaurantId}`)
            .then(res => setMyRestaurants(prev => prev.filter(restaurant => restaurant._id !== restaurantId)))
            .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <RestaurantContext.Provider
            value={{
                restaurants,
                getAllRestaurants,
                myRestaurants,
                getUserRestaurants,
                currentRestaurant,
                getOneRestaurant,
                createRestaurant,
                deleteRestaurant
            }}
        >
            {props.children}
        </RestaurantContext.Provider>
    )
}

export default RestaurantProvider