import React from 'react';
import { useLocation } from 'react-router-dom';

export const Thx = () => {
const location = useLocation();
const orderId = location.state && location.state.orderId;

return (
<div>
    <h1>¡Gracias por tu compra!</h1>
    <p>Su compra con ID: {orderId} ha sido procesada con éxito.</p>
    {/* Otros elementos o estilos para mostrar */}
</div>
);
};

