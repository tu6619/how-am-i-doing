const path = require('path')

module.exports = {
  path: '/data.json',
  method: 'GET',
  handler: (response, reply) => {
    reply.file(path.join(__dirname, '..', '..', '..', 'data.json'))
  }
}
