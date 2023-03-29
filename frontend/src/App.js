import { useState, useEffect} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import "./App.css";

// url ibm 
const url = process.env.URL || "http://localhost:3000";

function App() {
  const [products, setProducts] = useState([]);

  // get products and set state
  useEffect( () => {
    (async () => {
      const response = await fetch(`${url}/api/products`);
      const data = await response.json();    
      setProducts(data);
    })();
  }, []);

  // method
  function changeState(data){
    setProducts(data);
  }

  return (
    <div className='container'>
      <h1>IMB Products</h1>
      <nav>
        <ul>
          <li><Link to="/" style={{ textDecoration: 'none' }}>Home</Link></li>
          <li><Link to="/new" style={{ textDecoration: 'none' }}>Add Product</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home products={products}/>} />
        <Route exact path="/new" element={<New changeState={changeState}/>} />
        <Route exact path="/edit/:productId" element={<Edit changeState={changeState}/>} />
      </Routes>
    </div>
  );
}
export default App;
