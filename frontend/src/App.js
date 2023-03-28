import { useState, useEffect} from 'react';
import {Link, Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import "./App.css";


// mockurl
const url = process.env.URL || "http://localhost:3000";

function App() {
  const [programs, setPrograms] = useState([]);

  // get data
  useEffect( () => {
    (async () => {
      const response = await fetch(`${url}/api/programs`);
      const data = await response.json();    
      setPrograms(data);
    })();
  }, []);

  // methods
  function changeState(data){
    setPrograms(data)
  }
  return (
    <div className='container'>
      <h1>IMB Products</h1>
      <Link to="/"><span>Home</span></Link>
      <Link to="/new"><span>Add Products</span></Link>
      
      <Routes>
        <Route exact path="/" element={<Home programs={programs}/>} />
        <Route exact path="/new" element={<New changeState={changeState}/>} />
        <Route exact path="/edit/:productId" element={<Edit changeState={changeState}/>} />
      </Routes>
    </div>

  );
}
export default App;
