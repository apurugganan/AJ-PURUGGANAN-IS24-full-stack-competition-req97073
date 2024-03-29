import {useEffect, useState} from 'react'
import CustomInput from './CustomInput'

function ProductForm({changeState, product, sendForm, formType}){
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const pName = product?.productName ?? "";
  const pStart = product?.startDate?.split('/').join('-') ?? "";
  const pMet = product?.methodology ?? "";
  const pOwner = product?.productOwnerName ?? "";
  const scrum = product?.scrumMasterName ?? "";
  const dev1 = product?.developers?.[0] ?? "";
  const dev2 = product?.developers?.[1] ?? "";
  const dev3 = product?.developers?.[2] ?? "";
  const dev4 = product?.developers?.[3] ?? "";
  const dev5 = product?.developers?.[4] ?? "";

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
      setError({message : "Please make sure all necessary fields are filled. Required *"});
      setSuccess("");

      return
    }

    // build developers data
    const developers = [developer1];
    if(developer2){developers.push(developer2)};
    if(developer3){developers.push(developer3)};
    if(developer4){developers.push(developer4)};
    if(developer5){developers.push(developer5)};

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
    // update data
    changeState(data);

    setSuccess({message : "product saved"});
    setError("");

    if(formType === "new"){
      // reset form
      setProductName("");
      setStartDate("");
      setMethodology("");
      setProductOwnerName("");
      setscrumMasterName("");
      setDeveloper1("");
      setDeveloper2("");
      setDeveloper3("");
      setDeveloper4("");
      setDeveloper5("");
    }
     // hide save button
     setIsSaved(true)
  }

  return (
    <form onSubmit={handleSubmit}>
      { error && <small className='error-message'>{error.message}</small>}
      { success && isSaved &&<small className='success-message'>{success.message}</small>}

      <CustomInput 
        label="Product Name" 
        type="text" 
        value={productName} 
        onChange={(e) => setProductName(e.target.value)}
        isRequired="true"
        />
      { error && !productName && <small className='error-message'>field is required</small>}
      
      <CustomInput 
        label="Start Date" 
        type="date" 
        value={startDate} 
        onChange={(e) => setStartDate(e.target.value)}
        isRequired="true"
        formType={formType}
        />
      { error && !startDate && <small className='error-message'>field is required</small>}

      <div>
        <label >
          <span className='form-label'>Methodology</span>
          <select  className='form-input' value={methodology} onChange={(e) => setMethodology(e.target.value)}>
            <option value=""></option>
            <option value="agile">Agile</option>
            <option value="waterfall">Waterfall</option>
          </select><small className="form-required">*</small>
        </label>
      </div>
      { error && !methodology && <small className='error-message'>field is required</small>}

      <CustomInput 
        label="Product Owner" 
        type="text" 
        value={productOwnerName} 
        onChange={(e) => setProductOwnerName(e.target.value)}
        isRequired="true"
      />
      { error && !productOwnerName && <small className='error-message'>field is required</small>}

      <CustomInput 
        label="Scrum Master" 
        type="text" 
        value={scrumMasterName} 
        onChange={(e) => setscrumMasterName(e.target.value)}
        isRequired="true"
      />
      { error && !scrumMasterName && <small className='error-message'>field is required</small>}

      <CustomInput 
        label="Developer 1" 
        type="text" 
        value={developer1} 
        onChange={(e) => setDeveloper1(e.target.value)}
        isRequired="true"
      />
      { error && !developer1 && <small className='error-message'>field is required</small>}

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

      { 
        !isSaved 
        ? <button className="form-button" type='submit'>Save</button>
        : <button 
            className="form-button" 
            onClick={(e) => {
              e.preventDefault();
              setIsSaved(false);
            }}
          > { formType === "new" ? "Add New Product Again" : "Edit Product Again"} </button>
      }  
    </form>
  )
}

export default ProductForm;

