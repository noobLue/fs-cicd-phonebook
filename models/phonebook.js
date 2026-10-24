const initialPersons = [
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
]

let persons = []
let nextId = 1

const reset = (data = initialPersons) => {
  persons = data.map((p, i) => ({ ...p, id: String(i + 1) }))
  nextId = persons.length + 1
}
reset()

class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

const validate = ({ name, number }) => {
  if (!name || name.length < 3) {
    throw new ValidationError('name must be at least 3 characters long')
  }
  if (!/^\d{2,3}-\d+$/.test(number) || number.length < 8) {
    throw new ValidationError('number must be like 09-1234556 or 040-22334455')
  }
}

const getAll = () => persons
const getById = (id) => persons.find(p => p.id === id)

const create = ({ name, number }) => {
  validate({ name, number })
  const person = { id: String(nextId++), name, number }
  persons = persons.concat(person)
  return person
}

const update = (id, { name, number }) => {
  const existing = getById(id)
  if (!existing) return null
  validate({ name, number })
  const updated = { ...existing, name, number }
  persons = persons.map(p => (p.id === id ? updated : p))
  return updated
}

const remove = (id) => {
  persons = persons.filter(p => p.id !== id)
}

module.exports = { getAll, getById, create, update, remove, reset }