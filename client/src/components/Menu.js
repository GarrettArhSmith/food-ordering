import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserProvider'
import Item from './Item'
import ItemForm from './ItemForm'
import ConfirmationModal from './ConfirmationModal'
import axios from 'axios'

import { RiAddLine, RiDeleteBinLine } from 'react-icons/ri'

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function Menu(props) {
    const { title, _id, owner, deleteMenu } = props

    const { user } = useContext(UserContext)
    const [items, setItems] = useState([])
    const [toggle, setToggle] = useState(false)
    const [confirmToggle, setConfirmToggle] = useState(false)

    function getItems(menuId) {
        userAxios.get(`/api/item/${menuId}`)
            .then(res => {
                setItems(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addItem(menuId, newItem) {
        userAxios.post(`/api/item/${menuId}`, newItem)
            .then(res => {
                setItems(prev => [...prev, res.data])
                setToggle(prev => !prev)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function deleteItems(menuId) {
        userAxios.delete(`/api/item/menu/${menuId}`)
            .then(res => setItems(prev => prev.filter(item => item.menu !== menuId)))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function toggleConfirmaitonModal() {
        setConfirmToggle(prev => !prev)
    }

    function handleDeleteMenu(_id) {
        deleteItems(_id)
        deleteMenu(_id)
    }

    useEffect(() => {
        getItems(_id)
        return () => {
            setConfirmToggle(false)
            setToggle(false)
            setItems([])
        }
    }, [])

    return (
        <div className="menu">
            {confirmToggle && <ConfirmationModal 
                msg={`This will permanently delete the "${title}" menu and all of it's items.`}
                no={toggleConfirmaitonModal} 
                yes={() => handleDeleteMenu(_id)} 
            />}
            <div className="menuHeader">
                <h3>{title}</h3>
                <div className="menuActions">
                    {owner === user._id && <>
                        <button className="orange btn" onClick={() => setToggle(prev => !prev)}>
                            <RiAddLine /> <p className="btnText">NEW ITEM</p>
                        </button>
                        <button className="red btn" onClick={toggleConfirmaitonModal}>
                            <RiDeleteBinLine />
                        </button>
                    </>}
                </div>
            </div>
            { toggle && <ItemForm addItem={addItem} menuId={_id} setToggle={setToggle} /> }
            <div>
                {items.map(item => <Item key={item._id} {...item} />)}
            </div>
        </div>
    );
}

export default Menu;