require('dotenv').config()

const express = require('express')
const cors = require('cors')
const serverless = require('serverless-http')
const { Keystone } = require('@keystonejs/keystone')
const { KnexAdapter } = require('@keystonejs/adapter-knex')
const { GraphQLApp } = require('@keystonejs/app-graphql')

const keystone = new Keystone({
  adapter: new KnexAdapter(),
  name: process.env.NAME || 'keystone',
  cookieSecret: process.env.COOKIE_SECRET,
})
require('./lists')(keystone)

const setup = keystone
  .prepare({
    apps: [new GraphQLApp({ apiPath: '/', graphiqlPath: 'graphiql' })],
    dev: process.env.NODE_ENV !== 'production',
  })
  .then(async ({ middlewares }) => {
    await keystone.connect()
    const app = express()
    app.use(cors())
    app.use(middlewares)
    return serverless(app)
  })

module.exports = {
  api: async (event, context) => {
    console.log('event received: ', event)
    const handler = await setup
    return handler(event, context)
  },
}
