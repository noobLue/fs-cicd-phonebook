const { test, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const store = require('../models/phonebook')

const api = supertest(app)

beforeEach(() => store.reset())

test('persons are returned as json', async () => {
  const res = await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(res.body.length, 2)
})

test('a valid person can be added', async () => {
  await api.post('/api/persons').send({ name: 'Jarkko', number: '040-1234567' }).expect(200)
  const res = await api.get('/api/persons')
  assert.strictEqual(res.body.length, 3)
})

test('a too short name is rejected', async () => {
  await api.post('/api/persons').send({ name: 'Ke', number: '040-1234567' }).expect(400)
})

test('health check returns ok', async () => {
  const res = await api.get('/health').expect(200)
  assert.strictEqual(res.text, 'ok')
})