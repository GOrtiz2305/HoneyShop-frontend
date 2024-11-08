import React from "react";
import InventoryProductList from "../InventoryProductList";

const InventoryTable = ({ products, addToCartProduct }) => {
  // const [activeTab, setActiveTab] = useState("1");

  // const toggle = (tab) => {
  //   if (activeTab !== tab) setActiveTab(tab);
  // };

  return (
    <div className="col-lg-8">
      <InventoryProductList
            addToCartProduct={addToCartProduct}
            products={products}
          />
    </div>
  );
};

export default InventoryTable;
