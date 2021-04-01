import React from 'react';
import Rating from '@material-ui/lab/Rating';

const Product = React.memo((
  { item = {} }) => {
  const rating = React.useMemo(() => {
    return item.rating / 10;
  }, [item.rating]);

  return (
    <div className="product">
      <div className="product-background" style={{ backgroundImage: `url(${item.poster})` }} />
      <div className="product-content">
        <Rating name="read-only" value={rating} readOnly/>
        <span className="product-name">{item.title}</span>
      </div>
    </div>
  );
});

export default Product;
