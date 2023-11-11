import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';

import { products } from '../data/products';
import { ItemDetail } from './ItemDetail';
import loadingGif from '../assets/loading.gif';  // Asegúrate de que la ruta sea correcta

export const ItemDetailContainer =() =>{
    const [item, setItem]=useState(null);

    const {id}=useParams();

    useEffect(()=>{
        const mypromise=new Promise((resolve,reject)=> {
        setTimeout(()=>{resolve(products);
        },2000);
        });

    mypromise.then((response)=>{
    const findByID=response.find(
        (item) =>item.id ===Number(id)
    );
    setItem(findByID);

    });
    },[id]);

    return (
      <Container className='mt-4 text-center'>
        {item ? (
          <ItemDetail item={item} />
        ) : (
          <img src={loadingGif} alt='Loading...' width={60} />
        )}
      </Container>
    );
    
};