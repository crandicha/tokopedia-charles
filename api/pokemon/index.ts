import { getClient } from 'utils/api'
import { gql } from '@apollo/client'
import type { ApolloClientResponse } from 'types/api'
import type { Pokemon, PokemonDetail } from 'types/pokemon'

const baseUrl = 'https://beta.pokeapi.co/graphql/v1beta'
const client = getClient(baseUrl)

export type PokemonData = {
  pokemon: Pokemon[]
}

export type PokemonMeta = {
  meta: {
    aggregate: {
      count: number
    }
  }
}

export type GetPokemonResponse = PokemonData & PokemonMeta

export interface GetPokemonParams {
  limit?: number
  offset?: number
}

export const getPokemonList = ({
  limit = 20,
  offset = 0,
}: GetPokemonParams): Promise<ApolloClientResponse<GetPokemonResponse>> =>
  client.query({
    query: gql`
      query GetPokemonList {
        pokemon: pokemon_v2_pokemonspecies(order_by: {id: asc}, limit: ${limit}, offset: ${offset}) {
          name
          pokemonID: id
          species: pokemon_v2_pokemons {
            types:  pokemon_v2_pokemontypes {
              type: pokemon_v2_type {
                name
              }
            }
          }
        }
        meta: pokemon_v2_pokemonspecies_aggregate {
          aggregate {
            count
          }
        }
      }
    `,
  })

export type GetPokemonDetailResponse = {
  detail: PokemonDetail[]
}
export interface GetPokemonDetailParams {
  name: string
}

export const getPokemonDetail = ({
  name,
}: GetPokemonDetailParams): Promise<
  ApolloClientResponse<GetPokemonDetailResponse>
> =>
  client.query({
    query: gql`
      query GetPokemonDetail {
        detail: pokemon_v2_pokemon(where: { name: { _eq: "${name}" } }){
          name
          pokemonID: id
          types: pokemon_v2_pokemontypes {
            type: pokemon_v2_type {
              name
            }
          }
          moves: pokemon_v2_pokemonmoves(where: {level: {_gt: 0}}, distinct_on: move_id) {
            level
            move: pokemon_v2_move {
              name
            }
          }
          stats: pokemon_v2_pokemonstats {
            base_stat
            stat: pokemon_v2_stat {
              name
            }
          }
        }
      }`,
  })
