import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PokemonTypePills from 'components/PokemonTypePills'
import pokemonStyles from 'styles/pokemon.module.css'
import clsx from 'clsx'
import { getPokemonSprite } from 'utils/image'
import type { Pokemon, PokemonType } from 'types/pokemon'

interface PokemonCardProps {
  data: Pokemon
}

const PokemonCard = ({ data }: PokemonCardProps) => {
  const pokemonSprite = getPokemonSprite(data?.pokemonID)
  return (
    <Link href={`/pokemon/${data?.name}`}>
      <a>
        <div
          className={clsx(
            'w-[200px] rounded-md p-2 flex flex-col shadow-md hover:scale-110 hover:shadow-xl cursor-pointer',
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
