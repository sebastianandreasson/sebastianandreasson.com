import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import './index.css'
import ReactDOM from 'react-dom'
import App from './App'

const client = new ApolloClient({
  uri: 'http://localhost:4000/admin/api',
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
