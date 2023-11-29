import React, { useContext } from 'react';
import cart from '../assets/carrito.png';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export const CartWidget = () => {
  const { items } = useContext(CartContext);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Link to='/cart' style={{ color: 'white', textDecoration: 'none' }}>
        <img src={cart} alt='Carrito de compras' width={30}/> 
        <span  className="link-style" >{totalQuantity}</span>
      </Link>
    </>
  );
};
