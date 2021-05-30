import React, { useContext, useEffect } from 'react';
import { RestaurantContext } from '../context/RestaurantProvider'
import Restaurant from './Restaurant';

function Home(props) {
    const { restaurants, getAllRestaurants } = useContext(RestaurantContext)

    useEffect(() => {
        getAllRestaurants()
    }, [])

    return (
        <div>
            <h1>Home</h1>
            <div className="list">
                {restaurants?.map(restaurant => {
                        return <Restaurant 
                            {...restaurant} 
                            key={restaurant._id} 
                        />
                    })}
            </div>
        </div>
    );
}

export default Home;