import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import InventoryTable from "../../components/InventoryTable";
import axios from 'axios';
import { URL } from "../../config";
import OrdersTable from "../../components/OrdersTable";

const OrdersPage = () => {
    const [ordersArray, setOrdersArray] = useState([]);

    useEffect(() => {
        const fetchPendingOrders = async () => {
            try {
                const response = await axios.get(`${URL}pending/orders`); // Cambia esto a tu URL de API
                setOrdersArray(response.data); // Ajusta según la estructura de tu API
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchDeliveredOrders = async () => {
            try {
                const response = await axios.get(`${URL}delivered/orders`); // Cambia esto a tu URL de API
                setOrdersArray(response.data); // Ajusta según la estructura de tu API
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchDeliveredOrders();
        fetchPendingOrders();
    }, []);

    return (
        <Fragment>
            <Navbar hClass={"header-style-2"} />
            <PageTitle pageTitle={"Orders"} pagesub={"Status"} />
            <div className="shop-section">
                <div className="container">
                    <div className="row">
                        <OrdersTable
                            orders={ordersArray}
                        />
                    </div>
                </div>
            </div>
            <Footer />
            <Scrollbar />
        </Fragment>
    );
};

export default OrdersPage;
