import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../config";

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const PersonalOrdersList = () => {
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtain token from localStorage
      const userId = parseJwt(token).id;
      const client = await axios.get(`${URL}clients/user/`+userId);
      const url = `${URL}orders/client/`+client.data.id;
      console.log(url);
      const response = await axios.get(url, {
        headers: {
          'x-access-token': token, // Incluye el token en los headers
        },
      });
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch active products on initial render
  }, []);

  return (
    <div className="product-list">
      <div className="product-wrap">
        <div className="row align-items-center">
          {orders.length > 0 ? (
            orders.map((order, pitem) => (
              <div className="col-xl-12 col-12" key={pitem}>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Client</th>
                      <th>Date</th>
                      <th>Payment method</th>
                      <th>Total</th>  
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{order.id}</td>
                      <td>{order.client.names} {order.client.last_names}</td>
                      <td>{order.date}</td>
                      <td>{order.paymentMethod}</td>
                      <td>{order.totalAmount}</td>
                      <td>{order.status}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p>No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalOrdersList;


