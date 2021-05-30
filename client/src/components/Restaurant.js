import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { RiDeleteBinLine } from 'react-icons/ri'
import { RestaurantContext } from '../context/RestaurantProvider'
import { MenuContext } from '../context/MenuProvider'
import { ItemContext } from '../context/ItemProvider'
import ConfirmationModal from './ConfirmationModal'

function Restaurant(props) {
    const { deleteRestaurant } = useContext(RestaurantContext)
    const { deleteMenus } = useContext(MenuContext)
    const { deleteItemsByRestaurant } = useContext(ItemContext)
    const { name, description, _id, owner } = props

    const [toggle, setToggle] = useState(false)

    function handleToggle(e) {
        e.preventDefault()
        setToggle(prev => !prev)
    }

    function handleDelete(_id) {
        deleteItemsByRestaurant(_id)
        deleteMenus(_id)
        deleteRestaurant(_id)
    }

    return (
        <>
        {toggle && <ConfirmationModal 
            msg={`This will permanently delete the "${name}" restaurant and all of it's data.`}
            no={() => setToggle(prev => !prev)}
            yes={() => handleDelete(_id)} 
        />}
        <Link to={`/restaurant/${_id}`}>
            <div className="restaurant" style={{marginBottom: "3%"}}>
                <h3 style={{gridColumn: "1 / 4"}}>{name}</h3>
                <p style={{gridColumn: "1 / 4"}}>{description}</p>
                <div className="actions">
                    {owner && <button 
                            className="red btn"
                            onClick={handleToggle}
                        >
                            <RiDeleteBinLine />
                    </button>}
                </div>
            </div>
        </Link>
        </>
    );
}

export default Restaurant;