import React, { Component } from "react";
import { connect } from "react-redux";
import Logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import MobileMenu from "../../components/MobileMenu";
import min3 from "../../images/shop/mini-cart/bee2.png";
import { totalPrice } from "../../utils";
import { removeFromCart } from "../../store/actions/action";

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

class Header extends Component {
  state = {
    isCartShow: false,
  };

  cartHandler = () => {
    this.setState({
      isCartShow: !this.state.isCartShow,
    });
  };

  profileHandler = () => {
    this.setState({
      isprofileShow: !this.state.isprofileShow,
    });
  };

  logoutHandler = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
  }

  render() {
    const { isCartShow, isprofileShow } = this.state;

    const ClickHandler = () => {
      window.scrollTo(10, 0);
    }

    const { carts } = this.props;

    let tokenExistAndStillValid = false;

    if (localStorage.getItem('token')) {
      tokenExistAndStillValid = (parseJwt(localStorage.getItem('token')).exp * 1000 > Date.now());
    } else {
      tokenExistAndStillValid = false;
    }

    // const isUserAuthenticated = () => {
    //   Axios.get(URL + 'isUserAuth', {
    //     headers: {
    //       "x-access-token": localStorage.getItem('token')
    //     }
    //   }).then((response) => {
    //     console.log(response.data.auth);
    //     return response.data.auth;
    //   }).catch((error) => {
    //     console.log(error);
    //   });
    // }

    return (
      <header id="header" className={`site-header ${this.props.hClass}`}>
        <nav className="navigation navbar navbar-expand-lg">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="navbar-header">
                  <Link onClick={ClickHandler} className="navbar-brand" to="/home">
                    <img src={Logo} alt="icon" /> Ortiz
                  </Link>
                </div>
              </div>
              <div className="col-lg-7">
                <div
                  id="navbar"
                  className="collapse navbar-collapse navigation-holder"
                >
                  <Link onClick={ClickHandler} className="menu-close" to="/">
                    <i className="fi flaticon-cancel"></i>
                  </Link>
                  <ul className="nav navbar-nav me-auto mb-2 mb-lg-0">
                    <li>
                      <Link onClick={ClickHandler} className="active" to="/">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/shop">Shop</Link>
                    </li>
                    { tokenExistAndStillValid && parseJwt(localStorage.getItem('token')).role === 2 ?
                      <li className="menu-item-has-children">
                        <Link onClick={ClickHandler} to="/inventory">Inventory</Link>
                      </li>
                      : null
                    }
                    { tokenExistAndStillValid && parseJwt(localStorage.getItem('token')).role === 2 ?
                      <li className="menu-item-has-children">
                        <Link onClick={ClickHandler} to="/orders">Orders</Link>
                      </li>
                      : null
                    }
                    <li>
                      <Link onClick={ClickHandler} to="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="header-right d-flex">
                  <div className="header-profile-form-wrapper">
                    <button
                      onClick={this.profileHandler}
                      className="profile-toggle-btn"
                    >
                      <i className={`${isprofileShow ? 'fi ti-close' : 'fi flaticon-user'}`}></i>
                      
                    </button>
                    <div
                      className={`header-profile-content ${isprofileShow ? "header-profile-content-toggle" : ""
                        }`}
                    >
                      {tokenExistAndStillValid ?
                        <ul>
                          <li>
                            <Link onClick={this.logoutHandler} to="/login">Log out</Link>
                          </li>
                          <li>
                            <Link to="/profile">Orders History</Link>
                          </li>
                        </ul>
                        :
                        <ul>
                          <li>
                            <Link onClick={ClickHandler} to="/login">Login</Link>
                          </li>
                          <li>
                            <Link onClick={ClickHandler} to="/register">Register</Link>
                          </li>
                          <li>
                            <Link onClick={ClickHandler} to="/cart">Cart</Link>
                          </li>
                          <li>
                            <Link onClick={ClickHandler} to="/checkout">Checkout</Link>
                          </li>
                        </ul>
                      }
                    </div>
                    <div>
                      {tokenExistAndStillValid ? <label>Welcome!</label> : null}
                    </div>
                  </div>
                  <div className="mini-cart">
                    <button
                      onClick={this.cartHandler}
                      className="cart-toggle-btn"
                    >
                      {" "}
                      <i className="fi flaticon-bag"></i>{" "}
                      <span className="cart-count">{carts.length}</span>
                    </button>
                    <div
                      className={`mini-cart-content ${isCartShow ? "mini-cart-content-toggle" : ""
                        }`}
                    >
                      <button
                        onClick={this.cartHandler}
                        className="mini-cart-close"
                      >
                        <i className="ti-close"></i>
                      </button>
                      <div className="mini-cart-items">
                        {carts &&
                          carts.length > 0 &&
                          carts.map((cart, crt) => (
                            <div className="mini-cart-item clearfix" key={crt}>
                              <div className="mini-cart-item-image">
                                <span>
                                  <img src={cart.proImg} alt="icon" />
                                </span>
                              </div>
                              <div className="mini-cart-item-des">
                                <p>{cart.product_name} </p>
                                <span className="mini-cart-item-price">
                                  ${cart.price} x {" "} {cart.qty}
                                </span>
                                <span className="mini-cart-item-quantity">
                                  <button
                                    onClick={() =>
                                      this.props.removeFromCart(cart.id)
                                    }
                                    className="btn btn-sm btn-danger"
                                  >
                                    <i className="ti-close"></i>
                                  </button>{" "}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="mini-cart-action clearfix">
                        <span className="mini-checkout-price">
                          Total: ${totalPrice(carts)}
                        </span>
                        <div className="mini-btn">
                          <Link onClick={ClickHandler} to="/checkout" className="view-cart-btn s1">
                            Checkout
                          </Link>
                          <Link onClick={ClickHandler} to="/cart" className="view-cart-btn">
                            View Cart
                          </Link>
                        </div>
                      </div>
                      <div className="visible-icon">
                        <img src={min3} alt="icon" />
                      </div>
                    </div>
                  </div>
                  <MobileMenu />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    carts: state.cartList.cart,
  };
};


export default connect(mapStateToProps, { removeFromCart })(Header);
