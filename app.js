const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())
   .use(cors())

app.get('/', (req, res)=>{
  res.json('Hello, api ! 🫡')
})

const router = require('./src/routes/index')
app.use(router)

app.listen(port, () => {
  console.log(`Server tourne sur : http://localhost:${port}`);
})
