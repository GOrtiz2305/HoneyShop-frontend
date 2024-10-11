import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import { addToCart, addToWishList } from "../../store/actions/action";
import InventoryTable from "../../components/InventoryTable";
import axios from 'axios';
import { URL } from "../../config";

const InventoryPage = ({ addToCart, addToWishList }) => {
  const [productsArray, setProductsArray] = useState([]);
  const [filter, setFilter] = useState({
    price: "",
    size: "",
    color: "",
    brand: "",
  });

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

  const priceFIlter = (price) => {
    if (filter.price === "") {
      return true;
    } else if (filter.price.max && filter.price.min) {
      return price <= filter.price.max && price >= filter.price.min;
    } else if (filter.price.min) {
      return price >= filter.price.min;
    } else {
      return false;
    }
  };

  const products = productsArray
    .filter((el) => priceFIlter(el.price))
    .filter((el) => (filter.size ? el.size === filter.size : true))
    .filter((el) => (filter.color ? el.color === filter.color : true))
    .filter((el) => (filter.brand ? el.brand === filter.brand : true));

  return (
    <Fragment>
      <Navbar hClass={"header-style-2"} />
      <PageTitle pageTitle={"Inventory"} pagesub={"Stock"} />
      <div className="shop-section">
        <div className="container">
          <div className="row">
            {/*<FilterSidebar
              filter={filter}
              priceChangeHandler={priceChangeHandler}
              changeHandler={changeHandler}
            />*/}
            <InventoryTable
              products={products}
            />
          </div>
        </div>
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default connect(null, { addToCart, addToWishList })(InventoryPage);
