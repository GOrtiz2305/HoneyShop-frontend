import {Navigate, Outlet} from 'react-router-dom'

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
}

const ProtectedRoutes = () => {

    let isLogged = false;

    if (localStorage.getItem('token')) {
        isLogged = (parseJwt(localStorage.getItem('token')).exp * 1000 > Date.now());
    }

    if (!isLogged) {
        return <Navigate to='/' />
    }

  return (
    <Outlet />
  )
}

export default ProtectedRoutes
