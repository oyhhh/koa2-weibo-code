const request = request('supertest')
const server = request('../src/app').callback()

module.exports = request(server)