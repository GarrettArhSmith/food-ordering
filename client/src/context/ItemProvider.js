import React, { useState } from 'react'
import axios from 'axios'

export const ItemContext = React.createContext()

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function ItemProvider(props) {
    const [items, setItems] = useState([])

    function getItems(menuId) {
        userAxios.get(`/api/item/${menuId}`)
            .then(res => {
                setItems(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function deleteItemsByMenu(menuId) {
        userAxios.delete(`/api/item/menu/${menuId}`)
            .then(res => setItems(prev => prev.filter(item => item.menu !== menuId)))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function deleteItemsByRestaurant(restaurantId) {
        userAxios.delete(`/api/item/restaurant/${restaurantId}`)
            .then(res => setItems(prev => prev.filter(item => item.restaurant !== restaurantId)))
            .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <ItemContext.Provider
            value={{
                items,
                getItems,
                deleteItemsByMenu,
                deleteItemsByRestaurant
            }}
        >
            {props.children}
        </ItemContext.Provider>
    )
}

export default ItemProvider