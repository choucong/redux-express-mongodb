import { Schema } from 'mongoose'
import database from '../config/db'

var ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  expiredDate: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  stats: {
    type: Boolean,
    default: true
  }
})

export default database.model('Product', ProductSchema)
