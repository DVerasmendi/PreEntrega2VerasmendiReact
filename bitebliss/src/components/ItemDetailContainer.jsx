import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import { ItemDetail } from './ItemDetail';
import loadingGif from '../assets/loading.gif';

export const ItemDetailContainer = () => {
  const [itemData, setItemData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const firestore = getFirestore();
      const docRef = doc(firestore, 'products', id);

      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setItemData({ id, ...data });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container className='mt-4 text-center'>
      {itemData ? (
        <ItemDetail item={itemData} />
      ) : (
        <img src={loadingGif} alt='Loading...' width={60} />
      )}
    </Container>
  );
};
