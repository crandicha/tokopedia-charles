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

export type Pokemon = {
  name: string
  pokemonID: number
  species: {
    types: {
      type: {
        name: string
      }
    }[]
  }[]
}
