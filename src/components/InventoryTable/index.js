import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import ProductList from "../ProductList";
import InventoryProductList from "../InventoryProductList";

const InventoryTable = ({ products, addToCartProduct,addToWishListProduct }) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="col-lg-8">
      <InventoryProductList
            addToCartProduct={addToCartProduct}
            addToWishListProduct={addToWishListProduct}
            products={products}
          />
    </div>
  );
};

export default InventoryTable;
