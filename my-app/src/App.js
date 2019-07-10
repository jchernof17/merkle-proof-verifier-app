import React from 'react';
import logo from './Treum.svg';
import './App.css';
import SearchForm from './components/SearchForm.js';
function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <FetchPerson></FetchPerson> */}
        {/* <SearchResult></SearchResult> */}

        <SearchForm bg-color="black" />
      </header>
    </div>
  );
}

export default App;
