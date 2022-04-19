import React from 'react'

import { getPokemonList } from 'api/pokemon'
import PokemonCard from 'components/PokemonCard'
import Spinner from 'components/Spinner'
import { getCache, MY_POKEMON_LIST_KEY } from 'utils/helpers/cache'

import type { Pokemon, PokemonDetail } from 'types/pokemon'

const Home = () => {
  const limit = 20
  const loaderRef = React.useRef<any>(null)
  const [myPokemonListData, setMyPokemonListData] = React.useState<
    { name: string; nickname: string; data: PokemonDetail }[]
  >([])
  const [totalPokemon, setTotalPokemon] = React.useState<number>(0)
  const [offset, setOffset] = React.useState<number>(0)
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const loadPokemons = async () => {
    setIsLoading(true)
    const { data } = await getPokemonList({
      limit,
      offset,
    })
    const { pokemon: newPokemons, meta } = data
    setPokemons([...pokemons, ...newPokemons])
    setOffset(offset + limit)
    setTotalPokemon(meta?.aggregate?.count || 0)
    setIsLoading(false)
  }

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    if (entries[0]?.isIntersecting) {
      loadPokemons()
    }
  }

  const countHowManyPokemonOwned = (name: string) => {
    return myPokemonListData?.filter((data) => data.name === name).length
  }

  React.useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    })
    if (loaderRef.current && !isLoading && pokemons.length < totalPokemon) {
      observer.observe(loaderRef.current)
    }
    return () => {
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset])

  React.useEffect(() => {
    loadPokemons()
    getCache(MY_POKEMON_LIST_KEY).then((data) => {
      setMyPokemonListData(data)
    })
  }, [])

  return (
    <div>
      <div className="flex flex-row flex-wrap justify-center gap-4 px-4">
        {pokemons?.map?.((pokemon, index) => (
          <PokemonCard
            data={pokemon}
            key={index}
            owned={countHowManyPokemonOwned(pokemon.name)}
          />
        ))}
      </div>
      {isLoading && (
        <div className="my-20">
          <Spinner />
        </div>
      )}
      <div ref={loaderRef}></div>
    </div>
  )
}

export default Home
