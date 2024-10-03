import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar'
import PageTitle from '../../components/pagetitle'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import ProfileInfo from '../../components/ProfileInfo'


const ProfilePage =() => {
    return(
        <Fragment>
            <Navbar hClass={"header-style-2"} />
            <PageTitle pageTitle={'Profile'} pagesub={'Profile'}/> 
            <ProfileInfo/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default ProfilePage;

