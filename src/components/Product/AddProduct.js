import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Header } from '../index'
import { createProduct } from '../../redux/modules/product'

const validate = (values) => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Product name is required'
  }
  if (!values.price) {
    errors.price = 'Product Price is required'
  } else if (isNaN(Number(values.price))) {
    errors.price = 'Price must be a number'
  }
  if (!values.description) {
    errors.description = 'Product Description is required'
  }
  if (!values.expiredDate) {
    errors.expiredDate = 'Expired Date is required'
  }
  if (!values.status) {
    errors.status = 'Status is required'
  }
  return errors
}

const reduxFormConfig = {
  form: 'addProduct',
  fields: ['name', 'price', 'description', 'expiredDate', 'status'],
  validate: validate
}

const mapStateToProps = (state) => ({
  isCreated: state.product.isCreated,
  token: state.login.token,
  isNewProduct: state.product.isNewProduct
})

export class AddProduct extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    token: PropTypes.node,
    loginError: PropTypes.string,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    isCreated: PropTypes.bool,
    isNewProduct: PropTypes.bool
  }

  static contextTypes = {
    store: PropTypes.object,
    router: PropTypes.object,
    location: PropTypes.object
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isCreated && nextProps.isNewProduct === false) {
      this.context.router.push({
        pathname: '/'
      })
    }
  }

  handleCreate (data, token) {
    token = this.props.token
    this.props.dispatch(createProduct(data, token))
  }

  render () {
    const { fields: { name, price, description, expiredDate, status }, handleSubmit } = this.props
    const errorBlock = (field) => (field.error && field.touched && <small className='help-block'>{field.error}</small>)
    return (
      <div>
        <Header />
        <div className='row'>
          <div className='col-md-6 col-centered'>
            <div className='row'>
              <form onSubmit={handleSubmit(this.handleCreate.bind(this))}>
                <h2 className='form-signin-heading'>Add new Product </h2>
                <div className='form-group'>
                  <label htmlFor='inputName'>Product Name</label>
                  <input
                    {...name}
                    type='text'
                    id='inputName'
                    className='form-control'
                    placeholder='Product name' />
                  {errorBlock(name)}
                </div>
                <div className='form-group'>
                  <label htmlFor='inputPrice'>Price</label>
                  <input
                    {...price}
                    type='text'
                    id='inputPrice'
                    className='form-control'
                    placeholder='Product Price' />
                  {errorBlock(price)}
                </div>
                <div className='form-group'>
                  <label htmlFor='inputDescription'>Description</label>
                  <textArea
                    {...description}
                    type='text'
                    id='inputDescription'
                    className='form-control'
                    placeholder='Product Description' />
                  {errorBlock(description)}
                </div>
                <div className='form-group'>
                  <label htmlFor='inputExpired'>Expired Date</label>
                  <input
                    {...expiredDate}
                    type='text'
                    id='inputExpired'
                    className='form-control'
                    placeholder='Expired Date' />
                  {errorBlock(expiredDate)}
                </div>
                <div className='form-group'>
                  <label htmlFor='inputStatus'>Status</label>
                  <select
                    {...status}
                    className='form-control'
                    value={status.value || ''}>
                    <option>Select Status</option>
                    <option value='true'>Active</option>
                    <option value='false'>Not Active</option>
                  </select>
                  {errorBlock(status)}
                </div>
                <button
                  onSubmit={handleSubmit(this.handleCreate.bind(this))}
                  className='btn btn-lg btn-primary'>
                    Add Product and back to list
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default reduxForm(reduxFormConfig, mapStateToProps)(AddProduct)
