import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { LayoutContext } from 'components/Layout'
import Spinner from 'components/Spinner'
import Button from 'components/Button'
import PokemonTypePills from 'components/PokemonTypePills'
import PokemonStats from './PokemonStats'
import PokemonMoves from './PokemonMoves'
import { getPokemonDetail } from 'api/pokemon'
import { capitalize } from 'utils/text'
import POKEMON_COLORS from 'data/pokemon/colors'
import type { PokemonDetail } from 'types/pokemon'
import { getPokemonSprite } from 'utils/image'
import PokeballOpenSprite from 'public/images/pokeball-open.png'
import PokeballCloseSprite from 'public/images/pokeball.png'
import styles from './PokemonDetail.module.css'

type CatchPokemonState = 'idle' | 'attempt' | 'waiting' | 'failed' | 'success'

const pause = (ms: number) => new Promise((res) => setTimeout(res, ms))

const PokemonDetail = () => {
  const { setTitle, setHeaderColor, setHeaderTextColor } =
    React.useContext(LayoutContext)
  const router = useRouter()
  const { name: pokemonName } = router.query
  const [pokemonSprite, setPokemonSprite] = React.useState<string>('')
  const [backgroundColor, setBackgroundColor] = React.useState<string>('')
  const [pokemonData, setPokemonData] = React.useState<PokemonDetail | null>(
    null
  )
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
    await pause(500)
    setCatchPokemonState('idle')
  }

  React.useEffect(() => {
    const backgroundColor =
      POKEMON_COLORS?.[(pokemonData as PokemonDetail)?.types?.[0]?.type?.name]
    setHeaderColor(backgroundColor)
    setBackgroundColor(backgroundColor)
    setHeaderTextColor('white')
    if (pokemonData?.pokemonID) {
      setPokemonSprite(getPokemonSprite(pokemonData?.pokemonID as string))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonData])

  React.useEffect(() => {
    setTitle(capitalize(pokemonName as string))
    loadPokemonData(pokemonName as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonName])

  return (
    <div
      style={{
        backgroundColor,
      }}
      className="h-full"
    >
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
            <div className="font-semibold flex justify-center capitalize text-xl">
              {pokemonName}
            </div>
            <div className="flex flex-col p-4 items-center rounded-lg shadow-md bg-gray-100 gap-4">
              <div className="flex-1 font-semibold text-lg">Type</div>
              <div className="flex-[2_2_0px] flex gap-4">
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
