import ProductForm from "../components/ProductForm";

function New({changeState}){
  const formType = "new"
  // method
  async function addProduct(body){
    const response = await fetch(`http://localhost:3000/api/products`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }});
    const data = await response.json();
    return data;
  }

  return (
    <div>
      <h4>Add New Product</h4>
      <ProductForm 
        changeState={changeState} 
        sendForm={addProduct} 
        formType={formType}
      />
    </div>
  )
}
export default New;