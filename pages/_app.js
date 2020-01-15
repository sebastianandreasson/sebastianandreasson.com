import React from 'react'
import App from 'next/app'
import { Head } from 'next/document'
import { ApolloProvider } from '@apollo/react-hooks'

import withApollo from './withApollo'

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props
    return (
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    )
  }
}

export default withApollo(MyApp)
