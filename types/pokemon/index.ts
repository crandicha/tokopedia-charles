export type PokemonType =
  | 'grass'
  | 'fire'
  | 'water'
  | 'bug'
  | 'normal'
  | 'poison'
  | 'electric'
  | 'fairy'
  | 'ground'
  | 'fighting'
  | 'psychic'
  | 'rock'
  | 'ghost'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'flying'

export type StatName =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed'

export type Pokemon = {
  name: string
  pokemonID: number
  species: {
    types: {
      type: {
        name: PokemonType
      }
    }[]
  }[]
}

export type PokemonDetail = {
  name: string
  pokemonID: string
  types: {
    type: {
      name: PokemonType
    }
  }[]
  moves: {
    level: number
    move: {
      name: string
    }
  }[]
  stats: {
    base_stat: number
    stat: {
      name: StatName
    }
  }[]
}
