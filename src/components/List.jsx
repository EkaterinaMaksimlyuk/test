import React, { useMemo } from 'react';
import Loader from 'react-loader-spinner';

const List = React.memo((
  {
    list,
    Element,
  }) => {

  const notFound = useMemo(() => {
    if (list.isLoading || !list.query) {
      return null;
    }
    return (<span className="empty-search">Nothing found</span>);
  }, [list.isLoading, list.query]);

  return (
    <>
      {list.items && list.items.length ? (
        <>
          {list.items.map((item) => (
            <Element item={item} key={item.id} />
          ))}
        </>
      ) : notFound}
      {list.isLoading && <Loader type="BallTriangle" className="loader" color="#00BFFF" height={80} width={80} />}
    </>
  );
});

export default List;
