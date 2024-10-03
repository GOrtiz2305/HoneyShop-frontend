import React, { Component } from 'react'
import { Collapse, CardBody, Card } from 'reactstrap';
import { Link } from 'react-router-dom'
import './style.css';

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const menus = [
    {
        id: 1,
        title: 'Home',
        link: '/home',
    },

    {
        id: 2,
        title: 'Shop',
        link: '/shop',
    },

    {
        id: 3,
        title: 'Inventory',
        link: '/inventory',
    },

    {
        id: 4,
        title: 'Login',
        link: '/login'
    },

    {
        id: 5,
        title: 'Register',
        link: '/register'
    },

    {
        id: 6,
        title: 'Contact',
        link: '/contact',
    }
]

export default class MobileMenu extends Component {

    state = {
        isMenuShow: false,
        isOpen: 0,
    }

    isLoggedIn = () => {
        // Example using localStorage (replace with your approach)
        const token = localStorage.getItem('authToken');
        if (!token) {
          return false; // Not logged in if no token
        }
    
        try {
          const decodedToken = parseJwt(token);
          // Check token expiration (adjust expiration logic as needed)
          if (decodedToken.exp < Date.now() / 1000) {
            return false; // Expired token
          }
          return true; // Valid token
        } catch (error) {
          console.error('Error parsing token:', error);
          return false; // Handle parsing errors
        }
      };

    menuHandler = () => {
        this.setState({
            isMenuShow: !this.state.isMenuShow
        })
    }

    setIsOpen = id => () => {
        this.setState({
            isOpen: id === this.state.isOpen ? 0 : id
        })
    }

    render() {

        const { isMenuShow, isOpen } = this.state;

        return (
            <div>
                <div className={`mobileMenu ${isMenuShow ? 'show' : ''}`}>
                    <div className="menu-close">
                        <div className="clox" onClick={this.menuHandler}><i className="ti-close"></i></div>
                    </div>
                    <ul className="responsivemenu">
                        {menus.map(item => {
                            return (
                                <li key={item.id}>
                                    {item.submenu ? <p onClick={this.setIsOpen(item.id)}>
                                        {item.title}
                                        {item.submenu ? <i className="fa fa-angle-right" aria-hidden="true"></i> : ''}
                                    </p> :
                                        (this.isLoggedIn() && item.title === 'Inventory' ? (
                                            <Link to={item.link}>{item.title}</Link>
                                        ) : (
                                            // Otherwise, render other menu items
                                            item.title !== 'Inventory' && <Link to={item.link}>{item.title}</Link>
                                        ))}
                                    {item.submenu ?
                                        <Collapse isOpen={item.id === isOpen}>
                                            <Card>
                                                <CardBody>
                                                    <ul>
                                                        {item.submenu.map(submenu => (
                                                            <li key={submenu.id}><Link className="active" to={submenu.link}>{submenu.title}</Link></li>
                                                        ))}
                                                    </ul>
                                                </CardBody>
                                            </Card>
                                        </Collapse>
                                        : ''}
                                </li>
                            )
                        })}
                    </ul>

                </div>

                <div className="showmenu" onClick={this.menuHandler}>
                    <button type="button" className="navbar-toggler open-btn">
                        <span className="icon-bar first-angle"></span>
                        <span className="icon-bar middle-angle"></span>
                        <span className="icon-bar last-angle"></span>
                    </button>
                </div>
            </div>
        )
    }
}
