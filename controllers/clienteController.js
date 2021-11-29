const Cliente = require('../models/Cliente')

//Mostrar
const mostrar = (req, res)=>{
  var filterCliente = req.query.search || null
  var typeFilter = req.query.type || null
  let filter = {}
  if(filterCliente !== null){
    switch (typeFilter) {
      case 'cedula_cliente':
        filter = {cedula_cliente: filterCliente}
        break
      case 'nombre_cliente':
        filter = {nombre_cliente: {'$regex': filterCliente, '$options': 'i'}};
        break
      case 'email_cliente':
          filter = {email_cliente: {'$regex': filterCliente, '$options': 'i'}};
          break
      default:
        break
    }
  }
  Cliente.find(filter, (error, clientes)=>{
    if(error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al listar clientes',
        detalles_error: error
      })
    }else{
      return res.status(200).render('clientes', {clientes: clientes})
    }
  })
}

//Return JSON
const json = (req, res)=>{
  var filterCliente = req.query.search || null
  let filter = {}
  if(filterCliente !== null){
    filter = {cedula_cliente: filterCliente}
  }
  Cliente.find(filter, (error, clientes)=>{
    if(error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al listar clientes',
        detalles_error: error
      })
    }else{
      return res.status(200).json({clientes: clientes})
    }
  })
}

//Crear
const crear = (req,res)=>{
  var cliente = new Cliente({
    cedula_cliente: req.body.cedula,
    direccion_cliente: req.body.direccion,
    email_cliente: req.body.email,
    nombre_cliente: req.body.nombre,
    telefono_cliente: req.body.telefono
  })
  cliente.save(function(error, cliente){
    if(error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al crear cliente',
        detalles_error: error
      })
    }
    res.status(201).redirect('/clientes')
  })
}

//Editar
const editar = (req,res)=>{
  var id = req.body.id_editar
  var nombre = req.body.nombre_editar
  var cedula = req.body.cedula_editar
  var direccion = req.body.direccion_editar
  var email = req.body.email_editar
  var telefono = req.body.telefono_editar
  Cliente.findByIdAndUpdate(
    id,
    {
      cedula_cliente: cedula,
      direccion_cliente: direccion,
      email_cliente: email,
      nombre_cliente: nombre,
      telefono_cliente: telefono
    },
    (error, cliente)=> {
      if(error){
        console.error(error)
        return res.status(500).json({
          message: 'Error al editar el cliente',
          detalles_error: error
        })
      }
      res.redirect('/clientes')
  })
}

//Borrar
const borrar = (req,res)=>{
  var id = req.params.id
  Cliente.findByIdAndRemove(
    id,
      (error, cliente)=>{
      if(error){
        console.error(error)
        return res.status(500).json({
          message: 'Error al editar el cliente',
          detalles_error: error
        })
      }
      res.redirect('/clientes')
  })
}

module.exports = {
  mostrar,
  crear,
  editar,
  borrar,
  json
}