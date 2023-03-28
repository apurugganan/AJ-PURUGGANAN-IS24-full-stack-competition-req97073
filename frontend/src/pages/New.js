import ProgramForm from "../components/ProgramForm";

function New({changeState}){

  async function addProgram(body){
    const response = await fetch(`http://localhost:3000/api/programs`, {
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
      <ProgramForm 
        changeState={changeState} 
        sendForm={addProgram} 
        formType="new"
      />
    </div>
  )
}
export default New;