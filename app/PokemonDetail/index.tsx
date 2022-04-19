import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { LayoutContext } from 'components/Layout'
import Spinner from 'components/Spinner'
import Button from 'components/Button'
import Input from 'components/Input'
import PokemonTypePills from 'components/PokemonTypePills'
import PokemonStats from './PokemonStats'
import PokemonMoves from './PokemonMoves'
import { getPokemonDetail } from 'api/pokemon'
import { capitalize } from 'utils/text'
import POKEMON_COLORS from 'data/pokemon/colors'
import { getPokemonSprite } from 'utils/image'
import PokeballOpenSprite from 'public/images/pokeball-open.png'
import PokeballCloseSprite from 'public/images/pokeball.png'
import { setCache, getCache, MY_POKEMON_LIST_KEY } from 'utils/helpers/cache'
import styles from './PokemonDetail.module.css'

import type {
  MyPokemonListData,
  PokemonDetail as PokemonDetailTypes,
} from 'types/pokemon'
import md5 from 'md5'

type CatchPokemonState = 'idle' | 'attempt' | 'waiting' | 'failed' | 'success'

const pause = (ms: number) => new Promise((res) => setTimeout(res, ms))

interface PokemonDetailProps {
  type?: 'detail' | 'my-pokemon-detail'
}

const PokemonDetail = ({ type = 'detail' }: PokemonDetailProps) => {
  const { setTitle, setHeaderColor, setHeaderTextColor } =
    React.useContext(LayoutContext)
  const router = useRouter()
  const { name: pokemonName, id } = router.query
  const [pokemonNickname, setPokemonNickname] = React.useState<string>('')
  const [pokemonSprite, setPokemonSprite] = React.useState<string>('')
  const [backgroundColor, setBackgroundColor] = React.useState<string>('')
  const [pokemonData, setPokemonData] =
    React.useState<PokemonDetailTypes | null>(null)
  const imageSrc = {
    idle: pokemonSprite,
    attempt: PokeballOpenSprite,
    waiting: PokeballCloseSprite,
    failed: PokeballOpenSprite,
    success: PokeballCloseSprite,
  }
  const [catchPokemonState, setCatchPokemonState] =
    React.useState<CatchPokemonState>('idle')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const sortedPokemonMoves = [...(pokemonData?.moves || [])].sort(
    (a, b) => a?.level - b?.level
  )

  const loadPokemonData = async (name: string) => {
    setIsLoading(true)
    const { data } = await getPokemonDetail({ name })
    setPokemonData(data?.detail?.[0])
    setIsLoading(false)
  }

  const catchPokemon = async () => {
    const isSuccess = Math.floor(Math.random() * 100) > 50
    setCatchPokemonState('attempt')
    await pause(1000)
    setCatchPokemonState('waiting')
    await pause(3000)
    setCatchPokemonState(isSuccess ? 'success' : 'failed')
    if (!isSuccess) {
      await pause(500)
      setCatchPokemonState('idle')
    }
  }

  const savePokemon = async () => {
    const dbData = await getCache(MY_POKEMON_LIST_KEY)
    setCache(MY_POKEMON_LIST_KEY, [
      ...(dbData || []),
      {
        nickname: pokemonNickname,
        data: {
          ...pokemonData,
          species: [
            {
              types: pokemonData?.types,
            },
          ],
        },
        id: md5(new Date().toISOString()),
        name: pokemonData?.name,
      },
    ])
    setPokemonNickname('')
    setCatchPokemonState('idle')
  }

  const releasePokemon = async () => {
    const dbData: MyPokemonListData[] = await getCache(MY_POKEMON_LIST_KEY)
    const newData = dbData?.filter?.((data) => data.id !== id)
    setCache(MY_POKEMON_LIST_KEY, newData)
    router.replace('/my-pokemons')
  }

  const getCachedPokemonDataById = async (id: string) => {
    const dbData: MyPokemonListData[] = await getCache(MY_POKEMON_LIST_KEY)
    return dbData?.filter?.((data) => data.id === id)?.[0] || null
  }

  React.useEffect(() => {
    const backgroundColor =
      POKEMON_COLORS?.[
        (pokemonData as PokemonDetailTypes)?.types?.[0]?.type?.name
      ]
    setHeaderColor(backgroundColor)
    setBackgroundColor(backgroundColor)
    setHeaderTextColor('white')
    if (pokemonData?.pokemonID) {
      setPokemonSprite(getPokemonSprite(pokemonData?.pokemonID as number))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonData])

  React.useEffect(() => {
    if (type === 'detail') {
      setTitle(capitalize(pokemonName as string))
      loadPokemonData(pokemonName as string)
    } else {
      getCachedPokemonDataById(id as string).then((data) => {
        if (data) {
          setPokemonData(data?.data)
          setTitle(capitalize(data?.nickname))
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonName, id])

  return (
    <div
      style={{
        backgroundColor,
      }}
      className="h-full"
    >
      <Head>
        <title>{capitalize(pokemonData?.name || '')}</title>
        <meta
          name="description"
          content={`${capitalize(pokemonData?.name || '')} Details`}
        />
      </Head>
      <div className="h-[50vh] flex items-center justify-center">
        <div className="w-1/2 height-1/2 md:w-[384px] md:h-[384px]">
          {pokemonSprite && imageSrc && (
            <Image
              src={imageSrc?.[catchPokemonState]}
              layout="responsive"
              width="50%"
              height="50%"
              alt={pokemonData?.name}
              className={styles[catchPokemonState]}
            />
          )}
        </div>
      </div>
      <div
        className="bg-white rounded-t-xl p-4 sticky overflow-y-auto"
        style={{
          height: `calc(50vh - 60px)`,
        }}
      >
        {isLoading && (
          <div className="mt-4">
            <Spinner />
          </div>
        )}
        {!isLoading && (
          <div className="flex flex-col gap-4 max-w-[960px] m-auto">
            {type === 'detail' ? (
              <>
                {catchPokemonState !== 'success' ? (
                  <div className="w-full flex justify-center">
                    <Button
                      className="mb-4 shadow-lg !rounded-full w-[100px] h-[100px] hover:scale-125"
                      color="blue"
                      onClick={catchPokemon}
                      disabled={catchPokemonState !== 'idle'}
                    >
                      <Image
                        src={PokeballCloseSprite}
                        width="100%"
                        height="100%"
                        alt="Pokeball"
                      ></Image>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col p-4 items-center rounded-lg shadow-md bg-gray-100 gap-4">
                    <div className="flex-1 font-semibold text-lg">
                      Pokemon Catched
                    </div>
                    <div>
                      <div>Nickname</div>
                      <Input
                        type="text"
                        value={pokemonNickname}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPokemonNickname(e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-row gap-4">
                      <Button
                        color="blue"
                        onClick={savePokemon}
                        disabled={!pokemonNickname}
                      >
                        Save
                      </Button>
                      <Button
                        color="red"
                        onClick={() => setCatchPokemonState('idle')}
                      >
                        Release
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full flex justify-center">
                <Button color="red" onClick={releasePokemon}>
                  Release
                </Button>
              </div>
            )}
            <div className="font-semibold flex justify-center capitalize text-xl">
              {pokemonData?.name}
            </div>
            <div className="flex flex-col p-4 items-center rounded-lg shadow-md bg-gray-100 gap-4">
              <div className="flex-1 font-semibold text-lg">Type</div>
              <div className="flex gap-4">
                {pokemonData?.types?.map((type, index) => (
                  <PokemonTypePills key={index} type={type?.type?.name} />
                ))}
              </div>
            </div>
            <div className="flex flex-col p-4 items-center rounded-lg shadow-md bg-gray-100 gap-4">
              <div className="flex-1 font-semibold text-lg">Stats</div>
              <div className="flex flex-col gap-4 w-full">
                {pokemonData?.stats?.map((stat, index) => (
                  <PokemonStats
                    name={stat?.stat?.name}
                    value={stat?.base_stat}
                    type={pokemonData?.types?.[0]?.type?.name}
                    key={index}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col p-4 items-center rounded-lg shadow-md bg-gray-100 gap-4">
              <div className="flex-1 font-semibold text-lg">Moves</div>
              <div className="flex-[2_2_0px] flex flex-row flex-wrap gap-4">
                {sortedPokemonMoves?.map((move, index) => (
                  <PokemonMoves
                    name={move?.move?.name}
                    level={move?.level}
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PokemonDetail
