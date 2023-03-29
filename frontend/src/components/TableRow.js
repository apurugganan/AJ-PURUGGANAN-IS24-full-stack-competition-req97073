import {Link} from 'react-router-dom';

function TableRow({product}){
  const productId = `/edit/${product.productId}`

  return(
    <tr>
      <td>
        {product.productId}
        <p><Link to={productId}>Edit</Link></p>
      </td>
      <td>{product.productName}</td>
      <td>{product.scrumMasterName}</td>
      <td>{product.productOwnerName}</td>
      <td>{product.developers.map((name, index) => <p key={index}>{name}</p>)}</td>
      <td>{product.startDate}</td>
      <td>{product.methodology}</td>
    </tr>
  )
}

export default TableRow
