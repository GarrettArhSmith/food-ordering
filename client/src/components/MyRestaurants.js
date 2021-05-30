import React, { useContext, useState, useEffect } from 'react';
import { RestaurantContext } from '../context/RestaurantProvider'
import { UserContext } from '../context/UserProvider'
import Restaurant from './Restaurant';
import RestaurantForm from './RestaurantForm';
import { RiAddLine } from 'react-icons/ri'

function MyRestaurants(props) {
    const { user: { _id } } = useContext(UserContext)
    const { myRestaurants, getUserRestaurants } = useContext(RestaurantContext)
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        getUserRestaurants(_id)
    }, [])

    return (
        <div>
            <h1>My Restaurants</h1>
            <button 
                className="orange btn" 
                style={{marginBottom: "3%"}}
                onClick={() => setToggle(prev => !prev)}
            > 
                <RiAddLine /> NEW RESTAURANT
            </button>
            <div className="list">
                {toggle && <RestaurantForm setToggle={setToggle} />}
                {[...myRestaurants]?.reverse().map(restaurant => <Restaurant {...restaurant} key={restaurant._id} owner />)}
            </div>
        </div>
    );
}

export default MyRestaurants;