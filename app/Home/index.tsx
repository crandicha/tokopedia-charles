import React from 'react'
import Head from 'next/head'

import { getPokemonList } from 'api/pokemon'
import PokemonCard from 'components/PokemonCard'
import Spinner from 'components/Spinner'
import { getCache, MY_POKEMON_LIST_KEY, setCache } from 'utils/helpers/cache'

import type { MyPokemonListData, Pokemon } from 'types/pokemon'

interface HomeProps {
  type?: 'home' | 'my-pokemon'
}

const Home = ({ type = 'home' }: HomeProps) => {
  const limit = 20
  const loaderRef = React.useRef<any>(null)
  const [myPokemonListData, setMyPokemonListData] = React.useState<
    MyPokemonListData[]
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

  const releasePokemon = async (id: string) => {
    const dbData: MyPokemonListData[] = await getCache(MY_POKEMON_LIST_KEY)
    const newData = dbData?.filter?.((data) => data.id !== id)
    setCache(MY_POKEMON_LIST_KEY, newData)
    setMyPokemonListData(newData)
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
    getCache(MY_POKEMON_LIST_KEY).then((data) => {
      setMyPokemonListData(data || [])
    })
    if (type === 'home') {
      loadPokemons()
    }
  }, [])

  return (
    <div>
      <Head>
        <title>{type === 'home' ? 'Pokedex' : 'My Pokemons'}</title>
        <meta
          name="description"
          content={
            type === 'home' ? 'List of pokemons' : 'List of owned pokemons'
          }
        />
      </Head>
      <div className="flex flex-row flex-wrap justify-center gap-4 px-4">
        {type === 'home' &&
          pokemons?.map?.((pokemon, index) => (
            <PokemonCard
              data={pokemon}
              key={index}
              owned={countHowManyPokemonOwned(pokemon.name)}
            />
          ))}
        {type === 'my-pokemon' &&
          myPokemonListData?.map?.((data, index) => (
            <PokemonCard
              data={data?.data}
              nickname={data?.nickname}
              key={index}
              type={type}
              id={data?.id}
              onRelease={() => releasePokemon(data?.id)}
            />
          ))}
      </div>
      {type === 'my-pokemon' && myPokemonListData?.length === 0 && (
        <div className="text-lg font-semibold text-center">
          You have no pokemon
        </div>
      )}
      {isLoading && (
        <div className="my-20">
          <Spinner />
        </div>
      )}
      {type === 'home' && <div ref={loaderRef}></div>}
    </div>
  )
}

export default Home
