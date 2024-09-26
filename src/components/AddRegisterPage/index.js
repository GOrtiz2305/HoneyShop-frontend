import React from 'react';
import AddProductForm from '../AddProductForm';
import AddBrandForm from '../AddBrandForm';
import AddPresentationForm from '../AddPresentationForm';

const RegisterPage = () => {

    return(
        <section className="contact-pg-contact-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="col col-12">
                        <div className="contact-form-area">
                            <div className="section-title-s3 section-title-s5">
                                <h2>New Product</h2>
                            </div>
                            <div className="contact-form">
                                <AddProductForm/>
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-6 col-12">
                        <div className="contact-form-area">
                            <div className="section-title-s3 section-title-s5">
                                <h2>New Brand</h2>
                            </div>
                            <div className="contact-form">
                                <AddBrandForm/>
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-6 col-12">
                        <div className="contact-form-area">
                            <div className="section-title-s3 section-title-s5">
                                <h2>New Presentation</h2>
                            </div>
                            <div className="contact-form">
                                <AddPresentationForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     )
        
}

export default RegisterPage;
