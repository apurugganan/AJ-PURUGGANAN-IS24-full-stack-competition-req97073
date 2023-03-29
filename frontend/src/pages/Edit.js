import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";

function Edit({changeState}){
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const formType = "edit";

  useEffect( () => {
    (async () => {
      const response = await fetch(`http://localhost:3000/api/edit/${productId}`);
      const data = await response.json();    
      setProduct(data)
    })();
  }, [productId]);

  async function editProduct(body){
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
        <ProductForm 
          changeState={changeState} 
          product={product} 
          sendForm={editProduct}
          formType={formType}
        />
    </div>
  )
}
export default Edit;