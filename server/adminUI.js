require('dotenv').config()

const express = require('express')
const { Keystone } = require('@keystonejs/keystone')
const { KnexAdapter } = require('@keystonejs/adapter-knex')
const { AdminUIApp } = require('@keystonejs/app-admin-ui')
const { PasswordAuthStrategy } = require('@keystonejs/auth-password')

const keystone = new Keystone({
  adapter: new KnexAdapter(),
  name: process.env.NAME || 'keystone',
  cookieSecret: process.env.COOKIE_SECRET,
})

require('./lists')(keystone)

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {},
})

const admin = new AdminUIApp({ adminPath: '/admin', authStrategy })

module.exports = {
  keystone,
  apps: [admin],
}
