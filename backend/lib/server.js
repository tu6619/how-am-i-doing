require('env2')('./config.env')

const fs = require('fs')
const path = require('path')
const Hapi = require('hapi')

const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data.json'), 'utf8'))

// helper methods
const handlePlugins = require('./helpers/server-helpers.js')

// server plugins
const Inert = require('inert')

// server routes
const Hello = require('./routes/Hello.js')
const Images = require('./routes/Images.js')
const ReactUrls = require('./routes/ReactUrls.js')
const Scripts = require('./routes/Scripts.js')

const get = {
  path: '/data.json',
  method: 'GET',
  handler: (response, reply) => reply(data)
}

const post = {
  path: '/data.json',
  method: 'POST',
  handler: (req, reply) => {
    const payload = req.payload
    console.log(payload)

    const newKey = Object.keys(data.questionnaires)
      .map((k) => +k).sort().slice(-1)[0] + 1

    const now = new Date(Date.now())
    payload.date = now.toISOString()

    const hasQuestions = payload.questions && payload.questions instanceof Array
    const hasAnswers = payload.answers && payload.answers instanceof Array

    if (hasQuestions && hasAnswers) {
      data.questionnaires[newKey] = payload
      data.users[83749].questionnaires.push(newKey) // just add to hardcoded user
      reply({ success: true, data })
    } else {
      reply({ success: false, data })
    }
  }
}

module.exports = () => {
  const Plugins = [ Inert ]
  const Routes = [ Images, ReactUrls, Scripts, Hello, get, post ]

  const server = new Hapi.Server()

  server.connection({
    port: process.env.PORT || 4000,
    routes: {
      cors: true
    }
  })

  server.register(Plugins, handlePlugins)
  server.route(Routes)

  server.route({
    path: '/',
    method: 'GET',
    handler: {
      file: path.join(__dirname, '../../public/index.html')
    }
  })

  return server
}
