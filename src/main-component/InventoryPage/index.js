import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import InventoryTable from "../../components/InventoryTable";
import axios from 'axios';
import { URL } from "../../config";

const InventoryPage = () => {
  const [productsArray, setProductsArray] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${URL}products`); // Cambia esto a tu URL de API
        setProductsArray(response.data); // Ajusta según la estructura de tu API
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Fragment>
      <Navbar hClass={"header-style-2"} />
      <PageTitle pageTitle={"Inventory"} pagesub={"Stock"} />
      <div className="shop-section">
        <div className="container">
          <div className="row">
            <InventoryTable
              products={productsArray}
            />
          </div>
        </div>
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default InventoryPage;
