import React from 'react';
import ProfileForm from '../ProfileForm';
import PersonalOrdersList from '../PersonalOrdersList';

const ProfileInfo = () => {

    return(
        <section className="contact-pg-contact-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="contact-form-area">
                            <div className="section-title-s3 section-title-s5">
                                <h2>Your Info</h2>
                            </div>
                            <div className="contact-form">
                                <ProfileForm/>
                            </div>
                            <div className="section-title-s3 section-title-s5">
                                <h2>Your Orders</h2>
                            </div>
                            <div className="contact-form">
                                <PersonalOrdersList/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     )
        
}

export default ProfileInfo;
