import React from 'react'
import { Link } from 'react-router'

export const ProductList = ({products, onDelete}) => {
  return (
    <table className='table table-hover'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Expired Date</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.length <= 0 ? <tr>Tidak ada product</tr>
          : products.map(product => ProductListItem({product, onDelete}))}
      </tbody>
    </table>
  )
}

export const ProductListItem = ({product, onDelete}) => {
  return (
    <tr key={product._id}>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.expiredDate}</td>
      <td>{product.status ? 'Active' : 'Not Active'}</td>
      <td>
        <div className='btn-toolbar pull-right'>
          <Link to={`/product/edit/${product._id}`} className='btn btn-primary'>Edit</Link>
          <Link to='#' onClick={onDelete.bind(this, product._id)} className='btn btn-danger'>Delete</Link>
        </div>
      </td>
    </tr>
  )
}
