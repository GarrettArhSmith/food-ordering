import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { RiFileList3Fill } from 'react-icons/ri'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import { MenuContext } from '../context/MenuProvider'
import { RestaurantContext } from '../context/RestaurantProvider'

import Menu from './Menu'
import MenuForm from './MenuForm'

function RestaurantPage(props) {
    const { restaurantId } = useParams()
    const { currentRestaurant, getOneRestaurant } = useContext(RestaurantContext)
    const { menus, getMenus, addMenu, deleteMenu } = useContext(MenuContext)
    const { user } = useContext(UserContext)

    const { name, description } = currentRestaurant

    useEffect(() => {
        getOneRestaurant(restaurantId)
        getMenus(restaurantId)
    }, [])

    return (
        <div>
            <h1>{name}</h1>
            <h4>{description}</h4>
            {currentRestaurant?.user?._id === user._id && <Link className="orange btn" style={{width: 140}} to={`/restaurant/orders/${restaurantId}`}>
                <p style={{margin: "auto", display: "flex", placeItems: "center"}}><RiFileList3Fill style={{margin: 3}} /> VIEW ORDERS</p>
            </Link>}
            {menus.map(menu => <Menu
                key={menu._id} 
                {...menu} 
                owner={currentRestaurant?.user?._id} 
                deleteMenu={deleteMenu}
            />)}
            <MenuForm addMenu={addMenu} currentRestaurant={currentRestaurant} />
        </div>
    );
}

export default RestaurantPage;