import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Monaco"
            rel="stylesheet"
            key="google-font-monaco"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <style jsx global>{`
            body {
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
                'Droid Sans', 'Helvetica Neue', sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              background-color: black;
              color: lime;
            }

            input[type='text'] {
              font-family: 'Monaco', cursive;
              font-weight: 800;
            }

            code {
              font-family: source-code-pro, Menlo, Monaco, Consolas,
                'Courier New', monospace;
            }
          `}</style>
        </body>
      </Html>
    )
  }
}

export default MyDocument
