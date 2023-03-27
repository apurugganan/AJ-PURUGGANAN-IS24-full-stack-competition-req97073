import ProgramForm from "../components/ProgramForm";


function New({changeState}){
  return (
    <div>
      <h4>Add New Program</h4>
        <ProgramForm changeState={changeState}/>
    </div>
  )
}
export default New;