import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import DefaultModal from "../Modal";
import RegisterPage from "../AddRegisterPage";
import { URL } from "../../config";


const InventoryProductList = ({ products, addToCartProduct, addToWishListProduct }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [activeProducts, setActiveProducts] = useState([]);
  const [inactiveProducts, setInactiveProducts] = useState([]);

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
        ? `${URL}products/inventory/active`
        : `${URL}products/inventory/inactive`;

      const response = await axios.get(url, {
        headers: {
          'x-access-token': token, // Incluye el token en los headers
        },
      });
      
      if (tab === "1") {
        setActiveProducts(response.data);
      } else {
        setInactiveProducts(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData("1"); // Fetch active products on initial render
  }, []);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const [open, setOpen] = React.useState(false);

  function handleClose() {
    setOpen(false);
  }

  const [state, setState] = useState({});

  const handleClickOpen
    = (item) => {
      setOpen(true);
      setState(item);

    };

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token'); // Obtain token from localStorage

      await axios.put(
        URL + `products/delete/${productId}`,
        {},
        {
          headers: {
            'x-access-token': token,
          },
        }
      );

      // Update data after successful deletion
      const updatedActiveProducts = activeProducts.filter(
        (product) => product.id !== productId
      );
      const updatedInactiveProducts = inactiveProducts.filter(
        (product) => product.id !== productId
      );

      setActiveProducts(updatedActiveProducts);
      setInactiveProducts(updatedInactiveProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleReactivateProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token'); // Obtain token from localStorage
      await axios.put(
        URL + `products/activate/${productId}`,
        {},
        {
          headers: {
            'x-access-token': token,
          },
        }
      );

      // Update data after successful deletion
      const updatedActiveProducts = activeProducts.filter(
        (product) => product.id !== productId
      );
      const updatedInactiveProducts = inactiveProducts.filter(
        (product) => product.id !== productId
      );

      setActiveProducts(updatedActiveProducts);
      setInactiveProducts(updatedInactiveProducts);
    } catch (error) {
      console.error("Error reactivating product:", error);
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
                  <i>Active</i>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  <i>Discontinued</i>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "3" })}
                  onClick={() => {
                    toggle("3");
                  }}
                >
                  <i>New</i>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </div>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="row align-items-center">
              {activeProducts.length > 0 &&
                activeProducts.map((product, pitem) => (
                  <div className="col-xl-12 col-12" key={pitem}>
                    <div className="product-item">
                      <div className="product-img">
                        <img src='https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png' alt="" />
                        <ul>
                          <li>
                            <button
                              data-bs-toggle="tooltip"
                              data-bs-html="true"
                              title="Quick View"
                              onClick={() => handleClickOpen(product)}
                            >
                              <i>Edit</i>
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="product-content">
                        <h3>
                          <Link onClick={ClickHandler} to={`/product-single/${product.id}`}>
                            {product.product_name}
                          </Link>
                        </h3>
                        <div className="product-btm">
                          <div>
                            <ul>
                              <li><b>Price:</b> ${product.price}</li>
                              <li><b>Discount Price:</b> ${product.discount_price}</li>
                              <li><b>On discount:</b> {product.discount == 1 ? 'Yes' : 'No'}</li>
                              <li><b>Stock:</b> {product.stock}</li>
                            </ul>
                          </div>
                          <ul>
                            <li>
                              <button className="btn theme-btn" onClick={() => handleDeleteProduct(product.id)}>
                                Delete
                              </button></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="row align-items-center">
              {inactiveProducts.length > 0 &&
                inactiveProducts.map((product, pitem) => (
                  <div className="col-xl-12 col-12" key={pitem}>
                    <div className="product-item">
                      <div className="product-img">
                        <img src='https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png' alt="" />
                        <ul>
                          <li>
                            <button
                              data-bs-toggle="tooltip"
                              data-bs-html="true"
                              title="Quick View"
                              onClick={() => handleClickOpen(product)}
                            >
                              <i>Edit</i>
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="product-content">
                        <h3>
                          <Link onClick={ClickHandler} to={`/product-single/${product.id}`}>
                            {product.product_name}
                          </Link>
                        </h3>
                        <div className="product-btm">
                          <div>
                            <ul>
                              <li><b>Price:</b> ${product.price}</li>
                              <li><b>Discount Price:</b> ${product.discount_price}</li>
                              <li><b>On discount:</b> {product.discount == 1 ? 'Yes' : 'No'}</li>
                              <li><b>Stock:</b> {product.stock}</li>
                            </ul>
                          </div>
                          <ul>
                            <li>
                              <button className="btn theme-btn" onClick={() => handleReactivateProduct(product.id)}>
                                Reactivate
                              </button></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabPane>
          <TabPane tabId="3">
            <RegisterPage />
          </TabPane>
        </TabContent>

        <DefaultModal
          open={open}
          onClose={handleClose}
          product={state}
        />
      </div>
    </div>
  );
};

export default InventoryProductList;


