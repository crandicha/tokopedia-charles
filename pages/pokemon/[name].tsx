import React from 'react'

import App from 'app/PokemonDetail'
import Layout from 'components/Layout'

const PokemonDetailPage = () => {
  return (
    <Layout hasBackButton buttonColor="clear">
      <App />
    </Layout>
  )
}

export default PokemonDetailPage
