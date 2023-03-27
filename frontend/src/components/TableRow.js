import {Link} from 'react-router-dom';

function TableRow({program}){

  const productId = `/edit/${program.productId}`
  return(
    <tr>
      <td>
        {program.productId}
        <p><Link to={productId}>Edit</Link></p>
      </td>
      <td>
        {program.productName}
      </td>
      <td>
        {program.scrumMasterName}
      </td>
      <td>
        {program.productOwnerName}
      </td>
      <td>
        {program.developers.map(
          (name, index) => <p key={index}>{name}</p>
        )}
      </td>
      <td>
        {program.startDate}
      </td>
      <td>
        {program.methodology}
      </td>
    </tr>
  )
}

export default TableRow
