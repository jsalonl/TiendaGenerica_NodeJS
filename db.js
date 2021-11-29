const mongoose = require('mongoose')
const url = "mongodb+srv://rootdbmongo:6dDm9wSloRk5CVsq@cluster0.sqwz4.mongodb.net/tienda_generica?retryWrites=true&w=majority"

mongoose.connect(url,{
  useNewUrlParser: true,
  useUniFiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Error al conectar a MongoDB'))
db.once('open', function callback(){
  console.log('Conexión exitosa a MongoDB')
})

module.exports = db