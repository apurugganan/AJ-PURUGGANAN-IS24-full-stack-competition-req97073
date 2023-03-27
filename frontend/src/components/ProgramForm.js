import {useState} from 'react'
import CustomInput from './CustomInput'

function ProgramForm({changeState}){
  const [productName, setProductName] = useState("");
  const [productOwnerName, setProductOwnerName] = useState("");
  const [scrumMasterName, setscrumMasterName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [methodology, setMethodology] = useState("");
  const [developer1, setDeveloper1] = useState("");
  const [developer2, setDeveloper2] = useState("");
  const [developer3, setDeveloper3] = useState("");
  const [developer4, setDeveloper4] = useState("");
  const [developer5, setDeveloper5] = useState("");
  
  const [error, setError] = useState("")

  async function handleSubmit(evt){
    console.log("handle submit fired")
    evt.preventDefault()
    if(!productName || !startDate || !productOwnerName || 
      !scrumMasterName || !developer1 || !methodology){ 
      console.log('incomplete required field')
      return
    }

    const developers = [developer1];

    if(developer2){
      developers.push(developer2)
    }
    if(developer3){
      developers.push(developer3)
    }
    if(developer4){
      developers.push(developer4)
    }
    if(developer5){
      developers.push(developer5)
    }

    const body = {
      productName,
      startDate,
      methodology,
      productOwnerName,
      scrumMasterName,
      developers
    }

    const response = await fetch(`http://localhost:3000/api/programs`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }});
    
    const data = await response.json();
    
    changeState(data)
      
  }

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput 
        label="Program Name" 
        type="text" 
        value={productName} 
        onChange={(e) => setProductName(e.target.value)}/>
      <CustomInput 
        label="Start Date" 
        type="date" 
        value={startDate} 
        onChange={(e) => setStartDate(e.target.value)}/>
      
      <div>
        <label>
          Methodology
          <select 
            value={methodology}
            onChange={(e) => setMethodology(e.target.value)}
          >
            <option value=""></option>
            <option value="agile">Agile</option>
            <option value="waterfall">Waterfall</option>
          </select>
        </label>
      </div>

      <CustomInput 
        label="Product Owner" 
        type="text" 
        value={productOwnerName} 
        onChange={(e) => setProductOwnerName(e.target.value)}/>

      <CustomInput 
        label="Scrum Master" 
        type="text" 
        value={scrumMasterName} 
        onChange={(e) => setscrumMasterName(e.target.value)}/>


      <CustomInput 
        label="Developer 1" 
        type="text" 
        value={developer1} 
        onChange={(e) => setDeveloper1(e.target.value)}/>
      <CustomInput 
        label="Developer 2" 
        type="text" 
        value={developer2} 
        onChange={(e) => setDeveloper2(e.target.value)}/>
      <CustomInput 
        label="Developer 3" 
        type="text" 
        value={developer3} 
        onChange={(e) => setDeveloper3(e.target.value)}/>
      <CustomInput 
        label="Developer 4" 
        type="text" 
        value={developer4} 
        onChange={(e) => setDeveloper4(e.target.value)}/>
      <CustomInput 
        label="Developer 5" 
        type="text" 
        value={developer5} 
        onChange={(e) => setDeveloper5(e.target.value)}/>
    <button type='submit'>Save</button>
    </form>
  )
}

export default ProgramForm;