require('dotenv').config()

const express = require('express')
const serverless = require('serverless-http')
const { Keystone } = require('@keystonejs/keystone')
const { KnexAdapter } = require('@keystonejs/adapter-knex')
const { GraphQLApp } = require('@keystonejs/app-graphql')
// const { AdminUIApp } = require('@keystonejs/app-admin-ui')
const { PasswordAuthStrategy } = require('@keystonejs/auth-password')

const keystone = new Keystone({
  adapter: new KnexAdapter({ dropDatabase: true }),
  name: process.env.NAME || 'keystone-docker',
  cookieSecret: process.env.COOKIE_SECRET,
})

const UsersSchema = require('./lists/Users.js')

keystone.createList('User', UsersSchema)
const ProjectsSchema = require('./lists/Projects.js')
keystone.createList('Project', ProjectsSchema)

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {},
})

const setup = apps =>
  keystone
    .prepare({
      apps,
      dev: process.env.NODE_ENV !== 'production',
    })
    .then(async ({ middlewares }) => {
      await keystone.connect()
      const app = express()
      app.use(middlewares)
      return serverless(app)
    })

const setupApi = setup([
  new GraphQLApp({ apiPath: '/', graphiqlPath: 'graphiql' }),
])
// const setupAdmin = setup([new AdminUIApp({ adminPath: '/' })])

module.exports = {
  api: async (event, context) => {
    const handler = await setupApi
    return handler(event, context)
  },
  // admin: async (event, context) => {
  //   const handler = await setupAdmin
  //   return handler(event, context)
  // },
}
