import { getClient } from 'utils/api'
import { gql } from '@apollo/client'
import type { ApolloClientResponse } from 'types/api'
import type { Pokemon } from 'types/pokemon'

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
