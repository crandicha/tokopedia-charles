import React from 'react'

import App from 'app/PokemonDetail'
import Layout from 'components/Layout'

const MyPokemonDetailPage = () => {
  return (
    <Layout hasBackButton buttonColor="clear" backButtonLink="/my-pokemons">
      <App type={'my-pokemon-detail'} />
    </Layout>
  )
}

export default MyPokemonDetailPage
