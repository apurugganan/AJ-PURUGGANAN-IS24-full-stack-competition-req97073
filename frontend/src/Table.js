
import TableRow from './TableRow'

function Table({programs}){
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
      <h4>Number of Products {programs.length}</h4>
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
              programs.map((program) => <TableRow key={program.productId}program={program}/>)
            }
        </tbody>    
      </table>
    </div>
  )
}

export default Table