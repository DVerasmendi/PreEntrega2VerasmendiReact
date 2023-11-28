import React, { createContext, useState } from 'react';
import Swal from 'sweetalert2';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const clear = () => setItems([]);

  const addToCart = (item, quantity) => {
    const existingItemIndex = items.findIndex((cartItem) => cartItem.id === item.id);
    const updatedItems = [...items];

    if (existingItemIndex !== -1) {
      const updatedQuantity = updatedItems[existingItemIndex].quantity + quantity;

      if (updatedQuantity <= item.stock) {
        updatedItems[existingItemIndex].quantity = updatedQuantity;
      } else {
        updatedItems[existingItemIndex].quantity = item.stock;
        /*console.log('No se puede agregar más stock del disponible.');*/
        Swal.fire({
          icon: 'warning',
          title: '¡No hay suficiente stock!',
          text: 'La cantidad seleccionada excede el stock disponible.',
        });
      }
    } else {
      if (quantity <= item.stock) {
        updatedItems.push({ ...item, quantity });
      } else {
        updatedItems.push({ ...item, quantity: item.stock });
        /*console.log('No se puede agregar más stock del disponible.');*/
        Swal.fire({
          icon: 'warning',
          title: '¡No hay suficiente stock!',
          text: 'La cantidad seleccionada excede el stock disponible.',
        });
      }
    }

    setItems(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <CartContext.Provider value={{ items, clear, addToCart, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
