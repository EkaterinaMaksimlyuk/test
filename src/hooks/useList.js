import React from 'react';

const initialState = {
  items: [],
  isLoading: false,
  page: 1,
  perPage: 6,
  query: '',
  path: '',
  init: false,
};

const init = (props = {}) => (state) => {
  const { query, path } = props;
  return {
    ...state,
    query: query || '',
    path: path || '',
    init: true,
  };
};

const reducer = (state, action) => {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case 'ADD_ITEMS': {
      if (!action.value) {
        return state;
      }
      const page = state.page + 1;
      if (!state.items.length) {
        return { ...state, items: [...action.value], page };
      }
      return { ...state, items: [...state.items, ...action.value], page };
    }
    case 'SET_LOADING': {
      return { ...state, isLoading: action.value };
    }
    case 'SET_QUERY': {
      return { ...state, query: action.value, items: [], page: 1 };
    }
    default:
      return state;
  }
};

const useList = (props) => {
  const [list, dispatchList] = React.useReducer(reducer, initialState, init(props));
  return [list, dispatchList];
};

export default useList;
