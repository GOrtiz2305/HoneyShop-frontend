import React, { useEffect, useState } from "react";
import axios from "axios";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { URL } from "../../config";


const OrdersList = ({ orders }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      fetchData(tab); // Fetch data based on the selected tab
    }
  };

  const fetchData = async (tab) => {
    try {
      const token = localStorage.getItem('token'); // Obtain token from localStorage

      const url = tab === "1"
        ? `${URL}pending/orders`
        : `${URL}delivered/orders`;

      const response = await axios.get(url, {
        headers: {
          'x-access-token': token, // Incluye el token en los headers
        },
      });
      
      if (tab === "1") {
        setPendingOrders(response.data);
      } else {
        setDeliveredOrders(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData("1"); // Fetch active products on initial render
  }, []);

  const handleUpdateOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token'); // Obtain token from localStorage

      await axios.put(
        URL + `orders/${orderId}`,
        {},
        {
          headers: {
            'x-access-token': token,
          },
        }
      );

      // Update data after successful deletion
      const updatedDeliveredProducts = deliveredOrders.filter(
        (order) => order.id !== orderId
      );
      const updatedPendingOrders = pendingOrders.filter(
        (order) => order.id !== orderId
      );

      setDeliveredOrders(updatedDeliveredProducts);
      setPendingOrders(updatedPendingOrders);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="product-list">
      <div className="product-wrap">
        <div className="shop-section-top-inner">
          <div className="shoping-list">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  <i>Pending</i>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  <i>Delivered</i>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </div>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="row align-items-center">
              {pendingOrders.length > 0 &&
                pendingOrders.map((order, pitem) => (
                  <div className="col-xl-12 col-12" key={pitem}>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Client</th>
                          <th>Date</th>
                          <th>Payment method</th>
                          <th>Total</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{order.id}</td>
                          <td>{order.client.names} {order.client.last_names}</td>
                          <td>{order.date}</td>
                          <td>{order.paymentMethod}</td>
                          <td>{order.totalAmount}</td>
                          <td>
                            <button
                              className="btn theme-btn"
                              onClick={() => handleUpdateOrder(order.id)}
                            >
                              Mark as delivered
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="row align-items-center">
              {deliveredOrders.length > 0 &&
                deliveredOrders.map((order, pitem) => (
                  <div className="col-xl-12 col-12" key={pitem}>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Client</th>
                          <th>Date</th>
                          <th>Payment method</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{order.id}</td>
                          <td>{order.client.names} {order.client.last_names}</td>
                          <td>{order.date}</td>
                          <td>{order.paymentMethod}</td>
                          <td>{order.totalAmount}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
            </div>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default OrdersList;


