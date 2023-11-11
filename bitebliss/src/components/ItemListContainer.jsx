import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';

import { products } from '../data/products';
import { ItemList } from './ItemList';
import loadingGif from '../assets/loading.gif';


export const ItemListContainer = () => {
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);

const { id } = useParams();

// Lógica para determinar el greeting según la categoría
let greeting;
if (id === 'cakes') {
greeting = 'Pasteles';
} else if (id === 'cupcakes') {
greeting = 'Cupcakes';
} else {
greeting = 'Home';
}

useEffect(() => {
const fetchData = async () => {
    try {
    setLoading(true); // Inicia el estado de carga

    const response = await new Promise((resolve) => {
        setTimeout(() => {
        resolve(products);
        }, 2000);
    });

    if (!id) {
        setItems(response);
    } else {
        const filterByCategory = response.filter((item) => item.category === id);
        setItems(filterByCategory);
    }

    setLoading(false); // Cambia el estado a false cuando la promesa se resuelve
    } catch (error) {
    console.error('Error al obtener datos:', error);
    setLoading(false); // En caso de error, también cambia el estado a false
    }
};

fetchData();
}, [id]);

return (
<Container className='mt-4'>
    <Container className='mt-4 d-flex align-items-center justify-content-center'>
    <h1>{greeting}</h1>
    </Container>
    {loading ? (
    <Container className='mt-4 d-flex align-items-center justify-content-center'>
    <img src={loadingGif} alt='Loading...' width={60}/>
    </Container>
    ) : (
    // Muestra los productos cuando la promesa se resuelve
    <ItemList items={items} />
    )}
</Container>
);
};
