import { useState } from 'react';
import './App.css';
import MediaContent from './MediaContent';
import SearchBar from './SearchBar';

function App() {
  const[content, setContent] = useState({});

  return (
    <div className="App">
      <h1 id="app-title">React Gallery App</h1>
      <SearchBar setContent={setContent} />
      <MediaContent content={content} setContent={setContent} />
      <footer>React Gallery App</footer>
    </div>
  );
}

export default App;
