import Document, { Html, Head, Main, NextScript } from 'next/document'
class BaseDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&family=Material+Icons&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="font-body font-light">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default BaseDocument
