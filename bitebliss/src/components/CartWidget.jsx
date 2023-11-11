import cart from '../assets/carrito.png'

export const CartWidget =() =>{
    return (
    <>
    <img src={cart} alt='Carrito de compras' width={30}/> <span>0</span>
    </>
    );
};