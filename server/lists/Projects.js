const { Text, Slug } = require('@keystonejs/fields')
const { Markdown } = require('@keystonejs/fields-markdown')

module.exports = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },
    url: {
      type: Slug,
      from: 'name',
    },
    content: {
      type: Markdown,
    },
  },
}
