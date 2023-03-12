import express from "express";
import mysql from 'mysql2'

const app = express()
app.use(express.json())

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Rom@n2053",
  database:"test"
})

app.get('/',(req,res) => {
  res.send('Hello this is the backend')
})

app.get('/books',(req,res) => {
  const q = 'SELECT * FROM books'

  db.query(q,(err,data) => {
    if(data) return res.send(data) 
    return res.send(err)
  })
})

app.post('/books', (req,res) => {
  const q = 'INSERT INTO books (`title`, `desc`,`cover`) VALUES (?)'

  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover
  ]

  db.query(q,[values],(err,data) => {
    if (data) return res.send(data)
    return res.send(err)
  })
})

app.listen(8800, () => {
  console.log('connecting ')
})