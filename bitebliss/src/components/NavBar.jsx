import { NavLink } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { CartWidget } from "./CartWidget";
import biteblisslogo from '../assets/biteblisslogo.png'


export const NavBar =() =>{
return (
    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
        <Navbar.Brand>
        <NavLink to="/" style={{ textDecoration: 'none', color: 'white' , marginRight:'2rem'}}><img src={biteblisslogo} alt='Bite Bliss Logo' width={30} style={{ marginRight: '10px', marginBottom: '10px' }} />
        BiteBliss</NavLink>
        </Navbar.Brand>
        <Nav className="me-auto">
        <NavLink to="category/cakes" style={{ textDecoration: 'none', color: 'white' , marginRight:'2rem'}}>Pasteles</NavLink>
        <NavLink to="category/cupcakes" style={{ textDecoration: 'none', color: 'white' }}>Cupcakes</NavLink>
        </Nav>
        <CartWidget/>
    </Container>
    </Navbar>
);
};