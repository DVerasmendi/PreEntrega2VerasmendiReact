import React, { useContext } from 'react';
import { ItemCounter } from './ItemCounter';
import { CartContext } from '../contexts/CartContext';

export const ItemDetail = ({ item }) => {
const { addToCart } = useContext(CartContext);

const handleAddToCart = (item, quantity) => {
  addToCart(item, quantity);
};

const stockColor = item.stock <= 3 ? 'red' : 'inherit';

return (
  <>
    <h1 className="display-4">{item.title}</h1>
    <img
      src={item.pictureUrl}
      alt={item.title}
      className="img-fluid rounded elegant-image"
      style={{ width: '30%', maxWidth: '50%', maxHeight: '500px', borderRadius: '10px' }}
    />
    <p className="lead mt-4">{item.description}</p>
    <p className="lead mt-4">Precio: {item.price} USD</p>
    <p className="lead mt-4" style={{ color: stockColor }}>
      Stock disponible: {item.stock}
    </p>

    <ItemCounter item={item} onAdd={handleAddToCart} />
  </>
);
};
