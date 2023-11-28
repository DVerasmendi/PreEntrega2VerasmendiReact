import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { Container, Table, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Swal from 'sweetalert2';

import 'bootstrap/dist/css/bootstrap.min.css';

export const Cart = () => {
const { clear, removeItem, items } = useContext(CartContext);
const navigate = useNavigate();
const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

const handleRemoveItem = (id) => {
    removeItem(id);
};

const handleClearCart = () => {
    clear();
};

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const firestore = getFirestore();
    const ordersRef = collection(firestore, 'orders');

    try {
        const newOrderRef = await addDoc(ordersRef, {
            formData,
            items,
            timestamp: serverTimestamp()
        });

        Swal.fire({
            icon: 'success',
            title: '¡Compra exitosa!',
            text: `Su compra ID: ${newOrderRef.id} ha sido procesada con éxito`,
            });

        clear();
        navigate("/");
    } catch (error) {
        console.error("Error al procesar la compra:", error);
        // Manejar el error aquí
    }
};

if (!items.length) {
    return (
        <Container className="mt-4">
            <h2 className="text-center font-weight-bold pt-5 mb-5">Su carrito aún está vacío</h2>
            <p  className="text-center align-middle">Por favor, seleccione algún producto</p>
            <div className="text-center align-middle">
            <Button className="btn btn-dark btn-lg mt-4 fw-bold" onClick={() => navigate("/")} variant="primary">
                Volver al home
            </Button>
            </div>
        </Container>
    );
} else {
    const totalPerItem = items.map((item) => item.price * item.quantity);
    const grandTotal = totalPerItem.reduce((acc, total) => acc + total, 0);

    return (
<Container className="mt-4">
<h2 className="text-center font-weight-bold mt-4 mb-5">Productos en tu carrito</h2>
<Table className="cart-table dark" hover>
<thead className="bg-dark text-white">
<tr>
    <th className="text-center align-middle fw-bold fs-5">Producto</th>
    <th className="text-center align-middle fw-bold fs-5">Imagen</th>
    <th className="text-center align-middle fw-bold fs-5">Cantidad</th>
    <th className="text-center align-middle fw-bold fs-5">Precio</th>
    <th className="text-center align-middle fw-bold fs-5">Total</th>
    <th className="text-center align-middle fw-bold fs-5"></th>
</tr>
</thead>

    <tbody>
    {items.map((item, index) => (
        <tr key={index}>
        <td className="text-center align-middle fw-bold fs-5">{item.title}</td>
        <td className="text-center align-middle" width={"150px"}>
            <img
                src={item.pictureUrl}
                alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
        </td>
        <td className="text-center align-middle fw-bold fs-5">{item.quantity}</td>
        <td className="text-center align-middle fw-bold fs-5">{item.price}</td>
        <td className="text-center align-middle fw-bold fs-5">{totalPerItem[index].toLocaleString().replace(",",".")}</td>
        <td className="text-center align-middle">
            <button className="btn btn-dark" onClick={() => handleRemoveItem(item.id)}>Eliminar</button>
        </td>
        </tr>
    ))}
    </tbody>
    <tfoot>
    <tr>
    <td colSpan="4" className="text-center align-middle fw-bold fs-5">Total USD</td>
        <td className="text-center align-middle fw-bold fs-5">{grandTotal.toLocaleString().replace(",",".")}</td>
    </tr>
    </tfoot>
</Table>
<div className="mt-2 mb-5">
<Button variant="danger" className="btn" onClick={handleClearCart}>
Limpiar Carrito
</Button>
</div>
<Form onSubmit={handleSubmit} className="checkout-form">
<div className="text-center align-middle"> 
<h3 className="font-weight-bold mb-3 mt-5">Formulario de compra</h3>
</div>
    <Form.Group controlId="formName">
    <Form.Control
        type="text"
        placeholder="Nombre"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
        className="mb-3"
    />
    </Form.Group>
    <Form.Group controlId="formPhone">
    <Form.Control
        type="text"
        placeholder="Teléfono"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        required
        className="mb-3"
    />
    </Form.Group>
    <Form.Group controlId="formEmail">
    <Form.Control
        type="email"
        placeholder="Correo electrónico"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
    />
    </Form.Group>
    <div className="text-center align-middle">
    <Button className="btn btn-dark btn-lg mt-4 fw-bold" type="submit">
    Completar Orden
    </Button>
    </div>
</Form>
</Container>
);
}
};
