import React, { useEffect, useMemo } from 'react';
import Loader from 'react-loader-spinner';
import getList from '../helpers/request';


const List = React.memo((
  {
    list,
    dispatchList,
    Element,
  }) => {
  const getItems = async () => {
    if ((!list.isLoading) || (list.isLoading && list.page === 1)) {
      dispatchList({ type: 'SET_LOADING', value: true });
      let results;
      try {
        results = await getList({
          ...list,
        });
        dispatchList({ type: 'ADD_ITEMS', value: results });
      } catch (e) {
        console.error(e);
      } finally {
        dispatchList({ type: 'SET_LOADING', value: false });
      }
    }
  };

  useEffect(() => getItems(), [list.query]);

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
