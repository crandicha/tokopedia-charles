import pokemonStyles from 'styles/pokemon.module.css'
import clsx from 'clsx'

import type { PokemonType, StatName } from 'types/pokemon'

const STAT_NAME_MAPPING: Record<StatName, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SATK',
  'special-defense': 'SDEF',
  speed: 'SPD',
}

export interface PokemonStatsProps {
  name: StatName
  value: number
  type: PokemonType
}

const PokemonStats = ({ name, value, type }: PokemonStatsProps) => {
  const percentage = (value / 200) * 100
  return (
    <div className="flex flex-row gap-2">
      <div
        style={{
          flex: `0 0 40px`,
        }}
      >
        {STAT_NAME_MAPPING?.[name]}
      </div>
      <div
        className="text-right"
        style={{
          flex: `0 0 30px`,
        }}
      >
        {value}
      </div>
      <div className="rounded-full w-full bg-gray-200 text-red-300">
        <div
          style={{
            width: `${percentage}%`,
          }}
          className={clsx(
            'rounded-full text-white px-4',
            pokemonStyles[`pokemon-${type}`]
          )}
        >
          &nbsp;
        </div>
      </div>
    </div>
  )
}

export default PokemonStats
