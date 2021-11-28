const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clienteSchema = new Schema({
  cedula_cliente: Number,
  direccion_cliente: String,
  email_cliente: String,
  nombre_cliente: String,
  telefono_cliente: String
}, {versionKey: false})

module.exports = mongoose.model('db_clientes', clienteSchema)