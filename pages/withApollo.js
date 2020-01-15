// lib/withApollo.js
import withApollo from 'next-with-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

const GRAPHQL_URL = 'http://localhost:4000/admin/api'

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: GRAPHQL_URL,
      cache: new InMemoryCache().restore(initialState || {}),
    })
)
