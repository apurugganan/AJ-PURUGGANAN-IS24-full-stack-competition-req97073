import { useState, useEffect} from 'react';
import Table from "./Table";

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
    <div className="App">
      <h1>List of Programs</h1>
      <Table programs={programs}/>  
    </div>
  );
}
export default App;
