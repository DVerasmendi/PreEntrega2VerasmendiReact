import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap en tu archivo

export const ItemCounter = ({ item, onAdd }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => (prevQuantity < item.stock ? prevQuantity + 1 : prevQuantity));
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };

  return (
    <div className="text-center">
      <div className="row align-items-center justify-content-center mt-5">
        <div className="col-auto">
          <div className="btn btn-outline-dark" onClick={handleDecrement}>-</div>
        </div>
        <div className="col-auto">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
            className="form-control text-center"
            style={{ maxWidth: '70px' }}
          />
        </div>
        <div className="col-auto">
          <div className="btn btn-outline-dark" onClick={handleIncrement}>+</div>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-auto">
          <button
            onClick={() => onAdd(item, quantity)}
            className="btn btn-dark btn-lg"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};
