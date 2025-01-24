const express = require('express')
const mongoose = require('mongoose');

const app = express()
const port = 3000
app.use(express.json())




const Client = mongoose.model('Client', {
  name: String,
  email: String,
  phone: String,
  address: String
})

app.post('/', async (req, res) => {
  const client = new Client({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address
  })
  await client.save()
  return res.send(client)
})

app.get('/', async (req, res) => {
  const clients = await Client.find()
  return res.send(clients)
})

app.delete('/:id', async (req, res) => {
  const clients = await Client.findByIdAndRemove(req.params.id)
  return res.send(clients)
})

app.put('/:id', async (req, res) => {
  const clients = await Client.findByIdAndUpdate(req.params.id, req.body)
  return res.send(clients)
})

app.listen(port, () => {
  mongoose.connect('mongodb+srv://root:SENHA@node-api.7pgrr.mongodb.net/?retryWrites=true&w=majority&appName=node-API');
  console.log(`App de exemplo esta rodando na porta ${port}`)
})