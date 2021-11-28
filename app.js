const express = require('express')
const app = express()
const db = require('./db')

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('public'))

const routes = require('./routes/routes')
app.use(routes)

app.listen(3000,()=>{
  console.log('Server on http://localhost:3000')
})