const express = require('express')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const app = express()
const port = 3000
app.use(express.json())

var swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "Documentação da minha API",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
};

const options = {
  swaggerDefinition, 
  apis: ['src/index.js'], // O caminho do arquivo que contém anotações Swagger // Ajuste o caminho conforme necessário
};

const swaggerSpec = swaggerJsDoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)) // Endereço da documentação

const Client = mongoose.model('Client', {
  name: String,
  email: String,
  phone: String,
  address: String,
})

// Adicione anotações de Swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - address
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new client
 *     tags: [Client]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: The client was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 */
app.post('/', async (req, res) => {
  const client = new Client({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  })
  await client.save()
  return res.send(client)
})

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all clients
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: List of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 */
app.get('/', async (req, res) => {
  const clients = await Client.find()
  return res.send(clients)
})

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a client
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The client id
 *     responses:
 *       200:
 *         description: The client was deleted
 */
app.delete('/:id', async (req, res) => {
  const client = await Client.findByIdAndRemove(req.params.id)
  return res.send(client)
})

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a client
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The client id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: The client was updated
 */
app.put('/:id', async (req, res) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body)
  return res.send(client)
})

app.listen(port, () => {
  mongoose.connect('mongodb+srv://root:SENHA@node-api.7pgrr.mongodb.net/?retryWrites=true&w=majority&appName=node-API')
  console.log(`App de exemplo está rodando na porta ${port}`)
})
