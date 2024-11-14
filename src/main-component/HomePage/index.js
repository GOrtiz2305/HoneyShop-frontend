import React, { Fragment } from "react";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import Hero from "../../components/hero";
import Service from "../../components/Service";
import Testimonial from "../../components/Testimonial";
import Client from "../../components/Client";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import { addToCart } from "../../store/actions/action";

const HomePage = ({ addToCart }) => {

  const addToCartProduct = (product, qty = 1) => {
    addToCart(product, qty);
  };

  return (
    <Fragment>
      <Navbar hClass={"header-style-1"} />
      <Hero />
      <Service />
      <Testimonial />
      <Client />
      <br/><br/><br/><br/>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default connect(null, { addToCart })(HomePage);
