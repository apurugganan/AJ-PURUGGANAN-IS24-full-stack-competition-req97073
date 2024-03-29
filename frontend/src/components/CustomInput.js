
function CustomInput(props){
  return(
    <div>
      <label>
        <span className="form-label">{props.label}</span>
        { 
          props.formType === "edit"
          ? <input 
              className="form-input"
              type={props.type} 
              value={props.value} 
              onChange={props.onChange} 
              placeholder={props.placeholder}  
              readOnly
              id="input-readonly"
            />

          : <input 
              className="form-input"
              type={props.type} 
              value={props.value} 
              onChange={props.onChange} 
              placeholder={props.placeholder}  
            />
        }
        
        {
          props.formType === "edit" 
          ? props.isRequired && <small className="form-required" id="readonly"> readonly </small>
          : props.isRequired && <small className="form-required"> * </small>
        }
      </label>
    </div>
  )
}

export default CustomInput;