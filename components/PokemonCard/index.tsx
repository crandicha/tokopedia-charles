import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import PokemonTypePills from 'components/PokemonTypePills'
import { getPokemonSprite } from 'utils/image'

import type { Pokemon, PokemonType } from 'types/pokemon'

import pokemonStyles from 'styles/pokemon.module.css'

interface PokemonCardProps {
  data: Pokemon
  owned: number
}

const PokemonCard = ({ data, owned }: PokemonCardProps) => {
  const pokemonSprite = getPokemonSprite(data?.pokemonID)
  return (
    <Link href={`/pokemon/${data?.name}`}>
      <a className="relative hover:scale-110 hover:shadow-xl">
        {!!owned && (
          <div className="absolute top-[5px] left-[5px] bg-white rounded-full w-6 h-6 flex justify-center items-center">
            {owned}
          </div>
        )}
        <div
          className={clsx(
            'w-[200px] rounded-md p-2 flex flex-col shadow-md cursor-pointer',
            pokemonStyles[
              `pokemon-${data?.species?.[0]?.types?.[0]?.type?.name}`
            ]
          )}
        >
          <div className="flex justify-center items-center h-[100px]">
            <Image
              src={pokemonSprite}
              width={80}
              height={80}
              alt={data?.name}
            />
          </div>
          <div className="bg-white p-2 rounded-md">
            <div className="font-semibold capitalize mb-2 flex justify-center">
              #{data?.pokemonID} {data?.name}
            </div>
            <div className="flex flex-row gap-2">
              {data?.species[0]?.types?.map((type, index) => (
                <PokemonTypePills
                  type={type?.type?.name as PokemonType}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PokemonCard
