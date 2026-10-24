const express = require('express')
const morgan = require('morgan')
const phonebook = require('./models/phonebook')

const app = express()

morgan.token('postData', (req,res) => { return JSON.stringify(req.body)})
const morganString = ':method :url :status :res[content-length] - :response-time ms :postData'

app.use(express.static('build'))
app.use(express.json())
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(morganString))
}

app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('/info', (req, res, next) => {
  const time = new Date(Date.now())
  res.send(`<p>Phonebook has info for ${phonebook.getAll().length} people</p><p>${time}</p>`)
})

app.get('/api/persons', (req, res, next) => {
  res.json(phonebook.getAll())
})

app.get('/api/persons/:id', (req, res, next) => {
  const person = phonebook.getById(req.params.id)
  if (!person) return res.status(404).json({ error: 'not found' })
  res.json(person)
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const person = {
    name: req.body.name,
    number: req.body.number
  }
  const updated = phonebook.update(id, person)
  if (!updated) return res.status(404).json({ error: 'not found' })
  res.json(updated)
})

app.delete('/api/persons/:id', (req, res, next) => {
  phonebook.remove(req.params.id)
  res.status(204).end()
})

app.post('/api/persons/', (req,res, next) => {
  if(!('name' in req.body) || !('number' in req.body)) {
    return res.status(400).json({ error:'content missing' })
  }

  const person = phonebook.create({
    name: req.body.name,
    number: req.body.number
  })
  res.json(person)
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const errorHandler = (err, req, res, next) => {

  if(err.name === 'CastError')
  {
    return res.status(400).send({ error: 'malformed id' })
  }
  else if (err.name === 'ValidationError')
  {
    return res.status(400).send({ error: err.message })
  }


  console.log(err.message)
  next(err)
}

app.use(errorHandler)

module.exports = app