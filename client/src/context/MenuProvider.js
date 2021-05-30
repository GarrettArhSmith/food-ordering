import React, { useState } from 'react'
import axios from 'axios'

export const MenuContext = React.createContext()

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function MenuProvider(props) {
    const [menus, setMenus] = useState([])

    function getMenus(restaurantId) {
        userAxios.get(`/api/menu/${restaurantId}`)
            .then(res => {
                setMenus(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addMenu(restaurantId, newMenu, setToggle) {
        userAxios.post(`/api/menu/${restaurantId}`, newMenu)
            .then(res => {
                setMenus(prev => [...prev, res.data])
                setToggle(prev => !prev)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function deleteMenu(menuId) {
        userAxios.delete(`/api/menu/${menuId}`)
            .then(res => {
                setMenus(prev => prev.filter(menu => menu._id !== menuId))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function deleteMenus(restaurantId) {
        userAxios.delete(`/api/menu/restaurant/${restaurantId}`)
            .then(res => {
                setMenus(prev => prev.filter(menu => menu._id !== res.data._id))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <MenuContext.Provider
            value={{
                menus,
                getMenus,
                addMenu,
                deleteMenu,
                deleteMenus
            }}
        >
            {props.children}
        </MenuContext.Provider>
    )
}

export default MenuProvider