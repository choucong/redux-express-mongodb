import React, { Component, PropTypes } from 'react'
import { getAllProduct, deleteProduct, isNewProduct } from '../../redux/modules/product'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import { Header, ProductList } from '../index'

const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
  token: state.login.token,
  products: state.product.products,
  isRequesting: state.product.isRequesting,
  isDeleted: state.product.isDeleted
})

export class Home extends Component {

  constructor (props) {
    super (props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  static propTypes = {
    token: PropTypes.string,
    getAllProduct: PropTypes.func,
    isRequesting: PropTypes.bool,
    products: PropTypes.array
  }

  handleDelete (id) {
    this.props.deleteProduct(id, this.props.token)
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.token) {
      browserHistory.push('/login')
    }
    if (nextProps.isDeleted) {
      this.props.getAllProduct(this.props.token)
    }
  }

  componentDidMount () {
    if (!this.props.token) {
      browserHistory.push('/login')
    }
    this.props.getAllProduct(this.props.token)
    this.props.isNewProduct()
  }

  render () {
    const { products, isRequesting } = this.props
    return (
      <div>
        <Header />
        <div className='row'>
          <div className='col-md-8 col-centered'>
            <div className="row">
              <div className="col-md-12 text-right">
                <Link to="/product/add" className="btn btn-primary">Add Product</Link>
              </div>
            </div>
            {isRequesting ? 'Loading ....'
              : <ProductList products={products} onDelete={this.handleDelete} />
            }
          </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps, { getAllProduct, deleteProduct, isNewProduct })(Home)
