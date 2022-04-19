import Layout from 'components/Layout'
import App from 'app/Home'

const MyPokemons = () => {
  return (
    <Layout title="My Pokemons" hasBackButton>
      <App type="my-pokemon" />
    </Layout>
  )
}

export default MyPokemons
