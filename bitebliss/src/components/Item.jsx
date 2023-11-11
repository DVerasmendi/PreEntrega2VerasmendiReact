import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export const Item=({item})=>{
    return(
<Card style={{ width: '19rem' }} className="text-center">
  <Card.Img variant="top" src={item.pictureUrl} style={{ height: '250px', objectFit: 'cover' }} />
  <Card.Body style={{ width: '19rem' }}>
    <Card.Title style={{ width: '10rem', height: '3rem', margin: 'auto' }}>{item.title}</Card.Title>
    <Card.Text className="text-muted" style={{ width: '12rem', height: '100px', textAlign: 'center', margin: 'auto' }}>
      {item.description}
    </Card.Text>
    <Link to={`/items/${item.id}`}>
      <Button variant="dark" className="text-white">
        Detalle
      </Button>
    </Link>
  </Card.Body>
</Card>

);
}



