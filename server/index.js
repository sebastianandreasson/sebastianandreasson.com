require('dotenv').config()

const express = require('express')
const { Keystone } = require('@keystonejs/keystone')
const { MongooseAdapter } = require('@keystonejs/adapter-mongoose')
const { GraphQLApp } = require('@keystonejs/app-graphql')
const { AdminUIApp } = require('@keystonejs/app-admin-ui')
const { PasswordAuthStrategy } = require('@keystonejs/auth-password')

const keystone = new Keystone({
  adapter: new MongooseAdapter(),
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

const apps = [
  new GraphQLApp(),
  new AdminUIApp({ adminPath: '/admin', authStrategy }),
]

keystone
  .prepare({
    apps,
    dev: process.env.NODE_ENV !== 'production',
  })
  .then(async ({ middlewares }) => {
    await keystone.connect()
    const app = express()
    app.use(middlewares).listen(4000)
  })
