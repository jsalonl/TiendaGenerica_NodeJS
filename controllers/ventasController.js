const mostrar = (req,res)=>{
  return res.status(200).render('ventas')
}

module.exports = {
  mostrar
}