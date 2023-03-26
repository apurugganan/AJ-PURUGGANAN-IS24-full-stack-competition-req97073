function ProgramForm(){
  return (
    <form>
      <div>
        <label>
          Program Name
          <input type="text"/>
        </label>
      </div>
      <div>
        <label>
          Scrum Master
          <input type="text"/>
        </label>
      </div>
      <div>
        <label>
          Product Owner
          <input type="text"/>
        </label>
      </div>
      {/* Developers */}
      <div>

        <div>
          <label>
            Developer 1
            <input type="text"/>
          </label>
        </div>
        <div>
          <label>
            Developer 2
            <input type="text"/>
          </label>
        </div>
        <div>
          <label>
            Developer 3
            <input type="text"/>
          </label>
        </div>
        <div>
          <label>
            Developer 4
            <input type="text"/>
          </label>
        </div>
        <div>
          <label>
            Developer 5
            <input type="text"/>
          </label>
        </div>  
      </div>
      <div>
        <label>
          Start Date
          <input type="date"/>
        </label>
      </div>
      <div>
        <label>
          Methodology
          <select>
            <option>Agile</option>
            <option>Waterfall</option>
          </select>
        </label>
      </div>
    
    </form>
  )
}

export default ProgramForm;