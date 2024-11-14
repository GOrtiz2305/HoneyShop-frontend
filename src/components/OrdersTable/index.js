import React from "react";
import OrdersList from "../OrdersList";

const OrdersTable = ({ orders}) => {

  return (
    <div>
      <OrdersList
            orders={orders}
          />
    </div>
  );
};

export default OrdersTable;
