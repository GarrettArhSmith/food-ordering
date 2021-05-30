import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './context/UserProvider'
import RestaurantProvider from './context/RestaurantProvider'
import MenuProvider from './context/MenuProvider'
import ItemProvider from './context/ItemProvider'
import CartProvider from './context/CartProvider'
import OrderProvider from './context/OrderProvider'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <UserProvider>
            <RestaurantProvider>
                <MenuProvider>
                    <ItemProvider>
                        <CartProvider>
                            <OrderProvider>
                                <App />
                            </OrderProvider>
                        </CartProvider>
                    </ItemProvider>
                </MenuProvider>
            </RestaurantProvider>
        </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
