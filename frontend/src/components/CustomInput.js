
function CustomInput(props){
  return(
    <div>
      <label>
        <span className="form-label">{props.label}</span>
        <input 
          className="form-input"
          type={props.type} 
          value={props.value} 
          onChange={props.onChange} 
          placeholder={props.placeholder}
          />{props.isRequired && <small className="form-required">*</small>}
      </label>
    </div>
  )
}

export default CustomInput;