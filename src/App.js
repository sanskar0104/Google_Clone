import React from 'react';
import SearchComponent from './components/SearchComponent';
import SearchPage from './components/SearchPage';
import SearchPage2 from './components/SearchPage2';
import SearchPage3 from './components/SearchPage3';
import SearchPage4 from './components/SearchPage4';
import SearchPage5 from './components/SearchPage5';
import SearchPage6 from './components/SearchPage6';
import SearchPage7 from './components/SearchPage7';
import SearchPage8 from './components/SearchPage8';
import SearchPage9 from './components/SearchPage9';
import SearchPage10 from './components/SearchPage10';
import SearchPageImage from './components/SearchPageImage';
import SearchPageImage2 from './components/SearchPageImage2';
import SearchPageImage3 from './components/SearchPageImage3';
import SearchPageImage4 from './components/SearchPageImage4';
import SearchPageImage5 from './components/SearchPageImage5';
import SearchPageImage6 from './components/SearchPageImage6';
import SearchPageImage7 from './components/SearchPageImage7';
import SearchPageImage8 from './components/SearchPageImage8';
import SearchPageImage9 from './components/SearchPageImage9';
import SearchPageImage10 from './components/SearchPageImage10';
import Landing from './components/Landing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
      <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/SearchComponent' element={<SearchComponent />} />
        <Route path='/SearchPage' element={<SearchPage />} />
        <Route path='/SearchPage2' element={<SearchPage2 />} />
        <Route path='/SearchPage3' element={<SearchPage3 />} />
        <Route path='/SearchPage4' element={<SearchPage4 />} />
        <Route path='/SearchPage5' element={<SearchPage5 />} />
        <Route path='/SearchPage6' element={<SearchPage6 />} />
        <Route path='/SearchPage7' element={<SearchPage7 />} />
        <Route path='/SearchPage8' element={<SearchPage8 />} />
        <Route path='/SearchPage9' element={<SearchPage9 />} />
        <Route path='/SearchPage10' element={<SearchPage10 />} />
        <Route path='/SearchPageImage' element={<SearchPageImage />} />
        <Route path='/SearchPageImage2' element={<SearchPageImage2 />} />
        <Route path='/SearchPageImage3' element={<SearchPageImage3 />} />
        <Route path='/SearchPageImage4' element={<SearchPageImage4 />} />
        <Route path='/SearchPageImage5' element={<SearchPageImage5 />} />
        <Route path='/SearchPageImage6' element={<SearchPageImage6 />} />
        <Route path='/SearchPageImage7' element={<SearchPageImage7 />} />
        <Route path='/SearchPageImage8' element={<SearchPageImage8 />} />
        <Route path='/SearchPageImage9' element={<SearchPageImage9 />} />
        <Route path='/SearchPageImage10' element={<SearchPageImage10 />} />
      </Routes>
    </Router>
    );
  }
  
  export default App;