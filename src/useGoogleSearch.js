import { useState, useEffect } from "react";

function useGoogleSearch(term,searchnum) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      fetch(
        `https://www.googleapis.com/customsearch/v1?key=AIzaSyDUxBW_L_hvKXdK2L_gKPsA_de0Tll0yFg&cx=d0b5e6391e9b1484c&start=${searchnum}&q=${term}`
      )
        .then((response) => response.json()).then((result) => {setData(result);});
    };
    fetchData();
  }, [term]);

  return { data };
}

export default useGoogleSearch;

//https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${term}
