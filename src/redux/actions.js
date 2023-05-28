export const addSearch = search => {
    return {
      type: 'ADD_SEARCH',
      payload: search,
    };
  };
  
  export const deleteSearch = search => {
    return {
      type: 'DELETE_SEARCH',
      payload: search,
    };
  };
  