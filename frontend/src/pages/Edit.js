import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import ProgramForm from "../components/ProgramForm";

function Edit({changeState}){
  const { productId } = useParams();
  const [program, setProgram] = useState({});

  useEffect( () => {
    (async () => {
      const response = await fetch(`http://localhost:3000/api/edit/${productId}`);
      const data = await response.json();    
      setProgram(data)
    })();
  }, [productId]);

  async function editProgram(body){
    const response = await fetch(`http://localhost:3000/api/edit/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }});
    const data = await response.json();
    return data;
  }
  return (
    <div>
      <h4>Edit Product {productId}</h4>
        <ProgramForm 
          changeState={changeState} 
          program={program} 
          sendForm={editProgram}
          formType="edit"
        />
    </div>
  )
}
export default Edit;