import {Item} from './Item'

export const ItemList = ({ items }) => {
    return (
        <>
        <div className='d-flex flex-wrap justify-content-around p-2'>
          {items.slice(0, 3).map((item) => (
            <Item key={item.id} item={item} />
          ))}
          </div>
          <div className='d-flex flex-wrap justify-content-around p-2'>
          {items.slice(3).map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </div>
        </>
      );
  };
  