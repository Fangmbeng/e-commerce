import React from 'react'
import { Link } from 'react-router-dom';
import DrawerExample from './Drawer';
import DrawerGoogle from './Drawer_google';
import CountChart from '../services/countChart';

export default function Navbar (props) {
  let username = localStorage.getItem("username")
  let email = localStorage.getItem('email')

  
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            {props.loggedIn ? (
                <>
                <Link className="navbar-brand text-dark-emphasis" to="/"> Welcome {username}</Link>
                <Link className='nav-link text-danger' to='/'>Home</Link>
                <Link className='nav-link text-primary' to='/rooms'>Articles</Link>
                <Link className='nav-link text-success' to='/search'>Search</Link>
                <Link className='nav-link text-info' to='/create'>Post Article</Link>
                <CountChart/>
                <Link className='nav-link text-danger-emphasis' to='/' onClick={props.logUserOut}>Log Out</Link>
                <DrawerExample flashMessage={props.flashMessage} username={username} loggedIn={props.loggedIn} value={props.value}/>
                </>
            ) : props.value ? (
                <>
                <Link className="navbar-brand text-dark-emphasis" to="/"> Welcome {email}</Link>
                <Link className='nav-link text-danger' to='/'>Home</Link>
                <Link className='nav-link text-primary' to='/rooms'>Articles</Link>
                <Link className='nav-link text-success' to='/search'>Search</Link>
                <Link className='nav-link text-info' to='/create'>Post Article</Link>
                <CountChart/>
                <Link className='nav-link text-dange-emphasis' to='/' onClick={props.logUserOut}>Log Out</Link>
                <DrawerGoogle deleteGoggle={props.deleteGoggle} logUserOut={props.logUserOut} flashMessage={props.flashMessage} loggedIn={props.loggedIn} value={props.value}/>
                </>
            ) : (
                <>
                <Link className="navbar-brand text-dark-emphasis" to="/"> Welcome</Link>
                <Link className='nav-link text-danger' to='/'>Home</Link>
                <Link className='nav-link text-primary' to='/rooms'>Articles</Link>
                <Link className='nav-link text-success' to='/search'>Search</Link>
                <CountChart/>
                <Link className='nav-link text-success-emphasis' to='/sign_up'>Sign Up</Link>
                <Link className='nav-link text-primary-emphasis' to='/login'>Log In</Link>              
                </>
            )}
            </div>
        </nav>
    </>
  )
}
