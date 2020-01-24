const UsersSchema = require('./Users.js')
const ProjectsSchema = require('./Projects.js')

module.exports = keystone => {
  keystone.createList('User', UsersSchema)
  keystone.createList('Project', ProjectsSchema)
}
