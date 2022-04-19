import clsx from 'clsx'
import pokemonStyles from 'styles/pokemon.module.css'
import type { PokemonType } from 'types/pokemon'

interface PokemonTypePillsProps {
  type: PokemonType
}

const PokemonTypePills = ({ type }: PokemonTypePillsProps) => (
  <div
    className={clsx(
      'rounded-full px-2 py-1 capitalize text-xs min-w-[50px] text-center',
      pokemonStyles[`pokemon-${type}`]
    )}
  >
    {type}
  </div>
)

export default PokemonTypePills
