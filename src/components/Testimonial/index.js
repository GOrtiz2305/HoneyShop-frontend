import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import test1 from '../../images/CEO.jpg'
import test2 from '../../images/testimonial/3.jpg'
import test3 from '../../images/testimonial/2.jpg'




class Testimonial extends Component {

    
    render() {
        var settings = {
            dots: false,
            arrows: true,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2500,
            fade: true
        };

        return (
            <section className="testimonial-area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="section-title">
                                <h2>Client <span>Testimonial</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-wrap">
                        <div className="testimonial-active">
                            <Slider {...settings}>
                                <div className="testimonial-item">
                                    <div className="testimonial-img">
                                        <img src={test1} alt=""/>
                                        <div className="t-quote">
                                            <i className="fi flaticon-left-quote"></i>
                                        </div>
                                    </div>
                                    <div className="testimonial-content">
                                        <p>I've been searching for the perfect honey for years, and I finally 
                                            found it at Ortiz Honey Shop! Their organic honey is absolutely incredible. 
                                            The flavor is rich and natural, and it's so much sweeter than any other 
                                            honey I've tried. I love knowing that it's produced locally and sustainably. 
                                            It's the perfect addition to my tea, toast, or just straight from the jar! If 
                                            you're looking for the best honey in town, I highly recommend giving 
                                            Ortiz Honey Shop a try.</p>
                                        <div className="testimonial-author">
                                            <h3>Rachel Matthews</h3>
                                            <span>CEO, Deixfes</span>
                                        </div>
                                        <div className="t-content-quote">
                                            <i className="fi flaticon-left-quote"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonial-item">
                                    <div className="testimonial-img">
                                        <img src={test2} alt=""/>
                                        <div className="t-quote">
                                            <i className="fi flaticon-left-quote"></i>
                                        </div>
                                    </div>
                                    <div className="testimonial-content">
                                        <p>As a beekeeper myself, I'm always on the lookout for high-quality honey. 
                                            Ortiz Honey Shop has consistently exceeded my expectations. Their organic 
                                            honey is pure, unfiltered, and has a wonderful, natural taste. I've tried 
                                            their different varieties, and each one has its own unique flavor profile. 
                                            It's clear that they care about the bees and the environment, and it shows 
                                            in the quality of their product.</p>
                                        <div className="testimonial-author">
                                            <h3>David Warner</h3>
                                            <span>CEO, TBR</span>
                                        </div>
                                        <div className="t-content-quote">
                                            <i className="fi flaticon-left-quote"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonial-item">
                                    <div className="testimonial-img">
                                        <img src={test3} alt=""/>
                                        <div className="t-quote">
                                            <i className="fi flaticon-left-quote"></i>
                                        </div>
                                    </div>
                                    <div className="testimonial-content">
                                        <p>I recently purchased a jar of Ortiz Honey Shop's organic honey as a gift 
                                            for my friend, and she absolutely loved it! She said it was the best 
                                            honey she's ever tasted. I was so impressed that I decided to try it for 
                                            myself, and I'm now a loyal customer. The honey is thick, creamy, and has 
                                            a delicious flavor. It's perfect for adding a touch of sweetness to my 
                                            favorite recipes.</p>
                                        <div className="testimonial-author">
                                            <h3>Ken Williamson</h3>
                                            <span>CEO, Bexim</span>
                                        </div>
                                        <div className="t-content-quote">
                                            <i className="fi flaticon-left-quote"></i>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Testimonial;