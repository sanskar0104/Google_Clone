const initialState = {
    recentSearches: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_SEARCH':
        const newSearch = action.payload;
        const existingSearchIndex = state.recentSearches.indexOf(newSearch);
        let updatedSearches;
  
        if (existingSearchIndex !== -1) {
          // If search already exists, move it to the top
          updatedSearches = [
            newSearch,
            ...state.recentSearches.filter((_, index) => index !== existingSearchIndex),
          ];
        } else {
          updatedSearches = [newSearch, ...state.recentSearches];
        }
  
        return {
          ...state,
          recentSearches: updatedSearches.slice(0, 10), // Limit recent searches to top 10
        };
      case 'DELETE_SEARCH':
        const searchToDelete = action.payload;
        const filteredSearches = state.recentSearches.filter(search => search !== searchToDelete);
  
        return {
          ...state,
          recentSearches: filteredSearches,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  