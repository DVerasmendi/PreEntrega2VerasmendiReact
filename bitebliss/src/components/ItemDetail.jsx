export const ItemDetail=({item})=>{
    return (
        <>
          <h1 className="display-4">{item.title}</h1>
          <img
            src={item.pictureUrl}
            alt={item.title}
            className="img-fluid rounded"
            style={{ maxWidth: '50%', maxHeight: '500px',borderRadius: '10px' }}
          />
          <p className="lead mt-3">{item.description}</p>
        </>
      );
};

