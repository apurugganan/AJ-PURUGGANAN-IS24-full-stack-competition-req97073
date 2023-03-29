import { useState } from 'react'
import TableRow from './TableRow'

function Table({products}){
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");

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
      <div >
        <label>
          <span className='search-inputs'>Search Name :</span>
          <input 
            className='input-search'
            type="text" 
            placeholder='Enter Name'
            onChange={(e)=>{setSearchTerm(e.target.value)
            }}/> 
        </label>
      </div>
      <div >
        <label> 
          <span className='search-inputs'>Role:</span>
          <select className="input-select"value={role} onChange={(e) => setRole(e.target.value)}>
            <option></option>
            <option value="scrum master">scrum master</option>
            <option value="developer">developer</option>
          </select>
        </label>
      </div>
      <h4>Number of Products: 
        { role === "scrum master" ? 
            products
              .filter( p => p.scrumMasterName.toLowerCase().includes(searchTerm.toLocaleLowerCase())).length
        : role  === "developer" ?
            products
              .filter( p => p.developers.join(',').toLowerCase().includes(searchTerm.toLocaleLowerCase())).length
        : products.length
        }
      </h4>
      <table>
        <thead>
          <tr>
            {
              tableHead.map((item, index) => <th key={index}> {item} </th>)
            }
          </tr>
        </thead>
        <tbody>
            { role === "scrum master" 
              ? products
                  .filter( p => p.scrumMasterName.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
                  .map((product) => <TableRow key={product.productId} product={product}/>)
              : role  === "developer" 
              ? products
                  .filter( p => p.developers.join(',').toLowerCase().includes(searchTerm.toLocaleLowerCase()))
                  .map((product) => <TableRow key={product.productId} product={product}/>)
              : products.map((product) => <TableRow key={product.productId} product={product}/>)
            }
        </tbody>    
      </table>
    </div>
  )
}

export default Table