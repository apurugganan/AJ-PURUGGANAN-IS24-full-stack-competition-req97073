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
  return (
    <div>
      <h4>Edit Program {productId}</h4>
        <ProgramForm changeState={changeState} program={program}/>
    </div>
  )
}
export default Edit;