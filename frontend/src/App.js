import { useState, useEffect} from 'react';

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
      {programs.length > 0 ? (
        <ul>
          {programs.map((program) => (
            <li key={program.productId}>{program.productName}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
