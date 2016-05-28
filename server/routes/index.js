import { Router } from 'express'
import { signIn, checkToken } from '../controllers/user'
import { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById } from '../controllers/product'
import { middleware } from '../middleware'

var route = Router()

route.post('/sign-in', signIn)
route.all('/api*', middleware)
route.get('/api/check-token', checkToken)
route.get('/api/product', getAllProducts)
route.get('/api/product/:id', getProductById)
route.post('/api/product', createProduct)
route.put('/api/product/:id', updateProduct)
route.put('/api/delete-product/:id', deleteProduct)

export default route
