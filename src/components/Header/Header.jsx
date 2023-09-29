import React, { useContext } from 'react';
import './header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom'
import Authcontext from '../../context/AuthContext';


const Header = () => {

    let {user, logoutUser, userdata } = useContext(Authcontext)
    console.log(user)
  return (
        <Navbar expand="lg" className="nav-bar fixed-top ">
            
            <Container className='nav-container p-2 mt-3'>
                <Navbar.Brand className='nav-header text-white' href="#home">User-authentication</Navbar.Brand>
                
                <Navbar.Collapse id="basic-navbar-nav">

                    
                <Nav className="mr-auto">
                    {user ? (
                        
                        <Link className='nav-text-link text-white' to='/userprofile'>User profile</Link>
                    ) : (
                        <Link className='nav-text-link text-white' to='/login'>Login</Link>
                    )}
                    {user ? (
                        <Link className='nav-text-link text-white' onClick={logoutUser} >Logout</Link>
                    ) : (
                        <Link className='nav-text-link text-white' to='/signup'>Signup</Link>
                    )}
                    {
                        user && userdata?.superuser ? (
                            <Link className='nav-text-link text-white' to='/adminpanel'>
                                Admin Panel
                            </Link>
                        ) : (
                            <Link className='nav-text-link text-white' to='/'>
                                Home
                            </Link>
                        )
                    }


                </Nav>
                
                </Navbar.Collapse>
                
            </Container>
            
           
        </Navbar>
        

  )
}

export default Header



// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Nav } from 'react-bootstrap';

// function Navbar() {
//     return (
//         <Nav className="mr-auto">
//             <Link className='nav-text-link text-white' to='/'>Home</Link>
//             <Link className='nav-text-link text-white' to='/signup'>Signup</Link>
//             <Link className='nav-text-link text-white' to='/login'>Login</Link>
//         </Nav>
//     );
// }

// export default Navbar;
