import { useEffect, useState } from 'react';
import MediaContent from './MediaContent';
import SearchBar from './SearchBar';
import { ReactComponent as Up } from "../assets/chevron-up.svg";
import './App.css';
function App() {
  const [content, setContent] = useState({});
  const [showScroll, setShowScroll] = useState(false)
  
  const toggleScrollButton = () => {
    if (window.scrollY >= 250) {
      if (!showScroll) setShowScroll(true);
    } else {
      if (showScroll) setShowScroll(false);
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  
  useEffect(() => {
    document.addEventListener('scroll', toggleScrollButton);
    return () => {
      document.removeEventListener('scroll', toggleScrollButton);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showScroll]);


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
      {showScroll && <button id="scroll-btn" onClick={scrollToTop}><Up /></button> }
    </div>
  );
}

export default App;
