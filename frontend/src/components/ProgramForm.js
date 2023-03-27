import {useEffect, useState} from 'react'
import CustomInput from './CustomInput'

function ProgramForm({changeState, program, sendForm}){
  const pName = program?.productName ?? "";
  const pStart = program?.startDate?.split('/').join('-') ?? "";
  const pMet = program?.methodology ?? "";
  const pOwner = program?.productOwnerName ?? "";
  const scrum = program?.scrumMasterName ?? "";
  const dev1 = program?.developers?.[0] ?? "";
  const dev2 = program?.developers?.[1] ?? "";
  const dev3 = program?.developers?.[2] ?? "";
  const dev4 = program?.developers?.[3] ?? "";
  const dev5 = program?.developers?.[4] ?? "";

  const [productName, setProductName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [methodology, setMethodology] = useState("");
  const [productOwnerName, setProductOwnerName] = useState("");
  const [scrumMasterName, setscrumMasterName] = useState("");
  const [developer1, setDeveloper1] = useState("");
  const [developer2, setDeveloper2] = useState("");
  const [developer3, setDeveloper3] = useState("");
  const [developer4, setDeveloper4] = useState("");
  const [developer5, setDeveloper5] = useState("");

  useEffect(()=>{
    (() => {
      setProductName(pName)
      setStartDate(pStart)
      setMethodology(pMet)
      setProductOwnerName(pOwner)
      setscrumMasterName(scrum)
      setDeveloper1(dev1)
      setDeveloper2(dev2)
      setDeveloper3(dev3)
      setDeveloper4(dev4)
      setDeveloper5(dev5)
    })();
  },[
    pName,
    pStart,
    pMet,
    pOwner,
    scrum,
    dev1,
    dev2,
    dev3,
    dev4,
    dev5
  ])

  async function handleSubmit(evt){
    evt.preventDefault()
    if(!productName 
      || !startDate 
      || !methodology
      || !productOwnerName 
      || !scrumMasterName 
      || !developer1
      ){ 
      console.log('incomplete required field')
      return
    }

    const developers = [developer1];
    if(developer2){developers.push(developer2)}
    if(developer3){developers.push(developer3)}
    if(developer4){developers.push(developer4)}
    if(developer5){developers.push(developer5)}

    // create object to be passed
    const body = {
      productName,
      startDate,
      methodology,
      productOwnerName,
      scrumMasterName,
      developers
    }

    // network call
    const data = await sendForm(body);
    // let react know changing state
    changeState(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput 
        label="Program Name" 
        type="text" 
        value={productName} 
        onChange={(e) => setProductName(e.target.value)}
      
        />
      <CustomInput 
        label="Start Date" 
        type="date" 
        value={startDate} 
        onChange={(e) => setStartDate(e.target.value)}
        />
      
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
        onChange={(e) => setProductOwnerName(e.target.value)}
        />
      <CustomInput 
        label="Scrum Master" 
        type="text" 
        value={scrumMasterName} 
        onChange={(e) => setscrumMasterName(e.target.value)}
        />
      <CustomInput 
        label="Developer 1" 
        type="text" 
        value={developer1} 
        onChange={(e) => setDeveloper1(e.target.value)}
        />
      <CustomInput 
        label="Developer 2" 
        type="text" 
        value={developer2} 
        onChange={(e) => setDeveloper2(e.target.value)} 
        />
      <CustomInput 
        label="Developer 3" 
        type="text" 
        value={developer3} 
        onChange={(e) => setDeveloper3(e.target.value)}
        />
      <CustomInput 
        label="Developer 4" 
        type="text" 
        value={developer4} 
        onChange={(e) => setDeveloper4(e.target.value)}
        />
      <CustomInput 
        label="Developer 5" 
        type="text" 
        value={developer5} 
        onChange={(e) => setDeveloper5(e.target.value)}
       
        />
    <button type='submit'>Save</button>
    </form>
  )
}

export default ProgramForm;

