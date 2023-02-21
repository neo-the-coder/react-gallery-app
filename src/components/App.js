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
      <footer>
        <div id="footer-wrapper">
          <p id="author">
            Made with <span id="footer-heart">❤</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/neo-the-coder"
            >
              Kamran Zeynalov
            </a>
          </p>
          <p>
            Content provided by{" "}
            <a target="_blank" rel="noreferrer" href="https://www.pexels.com/">
              <img
                id="pexels-logo"
                src="https://images.pexels.com/lib/api/pexels.png"
                alt="pexels logo"
              />
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
