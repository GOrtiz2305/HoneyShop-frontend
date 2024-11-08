import React from 'react';
import {Link} from 'react-router-dom'
import './style.scss'

const OrderRecivedSec = () => {
    return(
        <section className="cart-recived-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="order-top">
                        <h2>Thank You For Your Order! <span>Your order has been recived</span></h2>
                        <Link to='/home' className="theme-btn">Back Home</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OrderRecivedSec;