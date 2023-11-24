import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { Container, Table, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const Cart = () => {
    const { clear, removeItem, items } = useContext(CartContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

    const handleRemoveItem = (id) => {
        removeItem(id);
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

            alert(`Su compra ID: ${newOrderRef.id}, ha sido procesada con éxito`);

            clear();
            navigate("/gracias");
        } catch (error) {
            console.error("Error al procesar la compra:", error);
            // Manejar el error aquí
        }
    };

    if (!items.length) {
        return (
            <Container className="mt-4">
                <h2>Compra algo weon</h2>
                <button onClick={() => navigate("/")}>Volver al home</button>
            </Container>
        );
    } else {
        const totalPerItem = items.map((item) => item.price * item.quantity);
        const grandTotal = totalPerItem.reduce((acc, total) => acc + total, 0);

        return (
    <Container className="mt-4">
    <h2>Elementos del carrito:</h2>
    <Table striped bordered hover>
        <thead>
        <tr>
            <th>Nombre</th>
            <th>Imagen</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Eliminar</th>
        </tr>
        </thead>
        <tbody>
        {items.map((item, index) => (
            <tr key={index}>
            <td>{item.title}</td>
            <td>
                <img src={item.pictureUrl} alt={item.title} style={{ width: "50px" }} />
            </td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            <td>{totalPerItem[index]}</td>
            <td>
                <button onClick={() => handleRemoveItem(item.id)}>Eliminar</button>
            </td>
            </tr>
        ))}
        </tbody>
        <tfoot>
        <tr>
            <td colSpan="4">Total:</td>
            <td>{grandTotal}</td>
        </tr>
        </tfoot>
    </Table>
    <Form onSubmit={handleSubmit}>
    <h3>Formulario de compra</h3>
        <Form.Group controlId="formName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
            type="text"
            placeholder="Ingresa tu nombre"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
        />
        </Form.Group>
        <Form.Group controlId="formPhone">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
            type="text"
            placeholder="Ingresa tu teléfono"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
        />
        </Form.Group>
        <Form.Group controlId="formEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
            type="email"
            placeholder="Ingresa tu correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
        />
        </Form.Group>
        <Button variant="primary" type="submit">
        Completar Orden
        </Button>
    </Form>
    </Container>
);
}
};
