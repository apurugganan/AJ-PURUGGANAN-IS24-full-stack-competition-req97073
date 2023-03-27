import {useState} from 'react'
import TableRow from './TableRow'

function Table({programs}){
  const [searchTerm, setSearchTerm] = useState("")

  const tableHead = [
    "Product Number",
    "Product Name",
    "Scrum Master",
    "Product Owner",
    "Developers",
    "Start Date",
    "Methodology",
  ] 

  return (
    <div>
      <input 
        type="text" 
        placeholder='Search Scrum Master'
        onChange={(e)=>{setSearchTerm(e.target.value)
        
        }}/>
      <h4>Number of Products {programs.filter( p => p.scrumMasterName.toLowerCase().includes(searchTerm.toLocaleLowerCase())).length}</h4>
      <table>
        <thead>
          <tr>
            {
              tableHead.map((item, index) => <th key={index}> {item} </th>)
            }
          </tr>
        </thead>
        <tbody>
            {
              programs
                .filter( p => p.scrumMasterName.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
                .map((program) => <TableRow key={program.productId}program={program}/>)
            }
        </tbody>    
      </table>
    </div>
  )
}

export default Table