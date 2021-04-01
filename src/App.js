import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import useList from './hooks/useList';
import List from './components/List';
import Product from './components/cards/ProductCard';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'oldlace',
    width: '40%',
    minHeight: '28.5vH',
  },
});

const App = () => {
  const [list, dispatchList] = useList({ path: 'https://60648d37f0919700177860e9.mockapi.io/api/test/products' });
  const [showResult, setShowResult] = React.useState(false);
  const anchorRef = React.useRef(null);

  const classes = useStyles();

  const onSearch = React.useCallback((e) => {
    const value = e?.target?.value ?? e;
    dispatchList({
      type: 'SET_QUERY',
      value,
    });
    if (!showResult) {
      setShowResult(true);
    }
  }, [showResult, dispatchList]);

  React.useEffect(() => {
    if (list?.query?.length < 1 && showResult) {
      setShowResult(false);
    }
  }, [list?.query, showResult]);

  return (
    <div className="App">
      <div className="toolbar-container">
        <div className="search-container">
          <button className="reset" onClick={() => { onSearch(''); }}>&times;</button>
          <DebounceInput
            className="search-input"
            minLength={1}
            debounceTimeout={500}
            inputRef={anchorRef}
            value={list?.query || ''}
            onChange={onSearch}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>
      <Popper
        open={showResult}
        anchorEl={anchorRef?.current}
        onClose={() => setShowResult(false)}
        className={classes.root}
      >
        <div className="list">
          <div className="list-container">
            {list.init && (
              <List
                list={list}
                dispatchList={dispatchList}
                Element={Product}
              />
            )}
          </div>
        </div>
      </Popper>
    </div>
  );
};

export default App;
