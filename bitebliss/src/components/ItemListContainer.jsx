import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';


import { ItemList } from './ItemList';
import loadingGif from '../assets/loading.gif';


export const ItemListContainer = () => {
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);
const { id } = useParams();


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
setLoading(true);

// Configura Firestore
const db = getFirestore();

try {
let querySnapshot;


if (id) {
    const q = query(collection(db, 'products'), where('categoryId', '==', id));
    querySnapshot = await getDocs(q);
} else {
    querySnapshot = await getDocs(collection(db, 'products'));
}

const fetchedItems = [];
querySnapshot.forEach((doc) => {
    fetchedItems.push({ id: doc.id, ...doc.data() });
});

setItems(fetchedItems);
setLoading(false);
} catch (error) {
console.error('Error al obtener datos:', error);
setLoading(false);
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
    <img src={loadingGif} alt='Loading...' width={60} />
</Container>
) : (
<ItemList items={items} />
)}
</Container>
);
};