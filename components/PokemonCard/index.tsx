import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import Button from 'components/Button'
import PokemonTypePills from 'components/PokemonTypePills'
import { getPokemonSprite } from 'utils/image'

import type { Pokemon, PokemonType } from 'types/pokemon'

import pokemonStyles from 'styles/pokemon.module.css'

interface PokemonCardProps {
  data: Pokemon
  nickname?: string
  owned?: number
  id?: string
  type?: 'home' | 'my-pokemon'
  onRelease?: () => void
}

const PokemonCard = ({
  data,
  owned,
  type = 'home',
  nickname,
  onRelease,
  id,
}: PokemonCardProps) => {
  const pokemonSprite = getPokemonSprite(data?.pokemonID)
  const url = type === 'home' ? `/pokemon/${data?.name}` : `/my-pokemons/${id}`
  return (
    <Link href={url}>
      <a className={clsx('relative hover:scale-110 hover:shadow-xl')}>
        {!!owned && (
          <div className="absolute top-[5px] left-[5px] bg-white rounded-full w-6 h-6 flex justify-center items-center">
            {owned}
          </div>
        )}
        <div
          className={clsx(
            'w-[300px] rounded-md p-2 flex flex-col shadow-md cursor-pointer',
            pokemonStyles[
              `pokemon-${data?.species?.[0]?.types?.[0]?.type?.name}`
            ]
          )}
        >
          <div className="flex justify-center items-center h-[225px]">
            <Image
              src={pokemonSprite}
              width={150}
              height={150}
              alt={data?.name}
            />
          </div>
          <div className="bg-white p-2 rounded-md">
            <div className="mb-2 text-center">
              <div className="font-semibold capitalize">
                #{data?.pokemonID} {data?.name}{' '}
              </div>
              {type === 'my-pokemon' && <div>({nickname})</div>}
            </div>
            <div className="flex flex-row gap-2">
              {data?.species?.[0]?.types?.map((type, index) => (
                <PokemonTypePills
                  type={type?.type?.name as PokemonType}
                  key={index}
                />
              ))}
            </div>
            {type === 'my-pokemon' && (
              <div className="mt-2">
                <Button
                  color="red"
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onRelease?.()
                  }}
                >
                  Release
                </Button>
              </div>
            )}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PokemonCard
