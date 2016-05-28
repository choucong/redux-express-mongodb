import Product from '../models/products'

export function getAllProducts (req, res) {
  Product.find({stats: true}).exec(function (err, products) {
    if (err) return res.boom.unauthorized(err)
    return res.status(200).send({
      statusCode: 200,
      data: products
    })
  })
}

export function createProduct (req, res) {
  req.checkBody('name', 'name is required').notEmpty()
  req.checkBody('price', 'price is required').notEmpty()
  req.checkBody('description', 'description is required').notEmpty()
  req.checkBody('expiredDate', 'expired date is required').notEmpty()
  req.checkBody('status', 'status is required').notEmpty()

  var errors = req.validationErrors()
  if (errors) return res.boom.preconditionFailed(errors)

  new Product(req.body).save(function (err, product) {
    if (err) return res.boom.unauthorized(err)
    return res.status(200).send({
      statusCode: 200,
      data: product,
      message: 'Add new product successfully'
    })
  })
}

export function getProductById (req, res) {
  var { id } = req.params
  Product.findOne({'_id': id}).exec(function (err, result) {
    // if query error
    if (err) return res.boom.preconditionFailed(err)

    // if id is wrong
    if (!result) return res.boom.unauthorized('Product not found')

    res.send({
      statusCode: 200,
      data: result
    })
  })
}

export function updateProduct (req, res) {
  var { id } = req.params
  Product.findByIdAndUpdate(id, req.body, function (err, product) {
    if (err) return res.boom.notFound('Product not found')
    return res.status(200).send({
      statusCode: 200,
      data: product,
      message: 'Update product successfully'
    })
  })
}

export function deleteProduct (req, res) {
  var { id } = req.params
  Product.findByIdAndUpdate(id, {stats: false}, function (err, product) {
    if (err) return res.boom.notFound('Product not found')
    return res.status(200).send({
      statusCode: 200,
      data: product,
      message: 'Delete product successfully'
    })
  })
}
