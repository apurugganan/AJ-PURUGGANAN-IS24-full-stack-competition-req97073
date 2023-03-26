import {useState} from 'react'
import CustomInput from './CustomInput'

function ProgramForm(){

  const [productName, setProductName] = useState("");
  const [productOwner, setProductOwner] = useState("");
  const [scrumMaster, setscrumMaster] = useState("");
  const [startDate, setStartDate] = useState("");
  const [methodology, setMethodology] = useState("");
  const [developer1, setDeveloper1] = useState([]);
  const [developer2, setDeveloper2] = useState([]);
  const [developer3, setDeveloper3] = useState([]);
  const [developer4, setDeveloper4] = useState([]);
  const [developer5, setDeveloper5] = useState([]);

  function handleSubmit(evt){
    evt.preventDefault()
    console.log('submit')
    console.log({
      productName,
      startDate,
      methodology,
      productOwner,
      scrumMaster,
      developer1,
      developer2,
      developer3,
      developer4,
      developer5,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
       {/* <CustomInput 
        label="Program Name" 
        type="text" 
        value={productName} 
        onChange={(e) => setProductName(e.target.value)}/> */}
      <div>
       
        <label>
          Program Name
          <input 
            type="text" 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Start Date
          <input 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Methodology
          <select 
            value={methodology}
            onChange={(e) => setMethodology(e.target.value)}
          >
            <option>Agile</option>
            <option>Waterfall</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Scrum Master
          <input 
            type="text" 
            value={scrumMaster}
            onChange={(e) => setscrumMaster(e.target.value)}  
          />
        </label>
      </div>
      <div>
        <label>
          Product Owner
          <input 
            type="text" 
            value={productOwner}
            onChange={(e) => setProductOwner(e.target.value)}  
          />
        </label>
      </div>
      {/* Developers */}
      <div>
        <div>
          <label>
            Developer 1
            <input 
              type="text" 
              value={developer1}
              onChange={(e) => setDeveloper1(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Developer 2
            <input 
              type="text" 
              value={developer2}
              onChange={(e) => setDeveloper2(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Developer 3
            <input 
              type="text" 
              value={developer3}
              onChange={(e) => setDeveloper3(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Developer 4
            <input 
              type="text" 
              value={developer4}
              onChange={(e) => setDeveloper4(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Developer 5
            <input 
              type="text" 
              value={developer5}
              onChange={(e) => setDeveloper5(e.target.value)}
            />
          </label>
        </div>  
      </div>
    
    <button type='submit'>Save</button>
    </form>
  )
}

export default ProgramForm;