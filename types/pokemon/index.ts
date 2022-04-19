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

export type PokemonSpecies = {
  species: {
    types: {
      type: {
        name: PokemonType
      }
    }[]
  }[]
}

export type PokemonBasicData = {
  name: string
  pokemonID: number
}

export type Pokemon = PokemonSpecies & PokemonBasicData

export type PokemonDetail = PokemonBasicData & {
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

export type MyPokemonListData = {
  name: string
  nickname: string
  data: PokemonDetail & PokemonSpecies
  id: string
}
