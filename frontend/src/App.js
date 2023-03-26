import { useState, useEffect} from 'react';
import {Link, Route, Routes} from 'react-router-dom';

import Home from './pages/Home'
import New from './pages/New'


// mockurl
const url = process.env.URL || "http://localhost:3000/";

function App() {
  const [programs, setPrograms] = useState([]);

  // use
  useEffect( () => {
    (async () => {
      const response = await fetch(url);
      const data = await response.json();    
      setPrograms(data);
    })();
  }, []);

  return (
    <div>
      <h1>IMB Products</h1>
      <Link to="/">Home</Link>
      <Link to="/new">New</Link>
      
      <Routes>
        <Route exact path="/" element={<Home programs={programs}/>} />
        <Route path="/new" element={<New/>} />
      </Routes>
    </div>

  );
}
export default App;
