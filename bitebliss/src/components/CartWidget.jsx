import React, { useContext } from 'react';
import cart from '../assets/carrito.png';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom'; // Importa el componente Link

export const CartWidget = () => {
  const { items } = useContext(CartContext);

  // Calcular el valor total de la cantidad de items
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Utiliza el componente Link y asigna la ruta a tu componente Cart.jsx */}
      <Link to='/cart' style={{ color: 'white', textDecoration: 'none' }}>
        <img src={cart} alt='Carrito de compras' width={30}/> 
        <span  className="link-style" >{totalQuantity}</span>
      </Link>
    </>
  );
};
