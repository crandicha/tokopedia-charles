import MD5 from 'md5'
import { get, set } from 'idb-keyval'

export const MY_POKEMON_LIST_KEY = MD5('MyPokemonList')

export async function getCache(key: string): Promise<any> {
  return await get(key)
}

export async function setCache(key: string, value: any): Promise<void> {
  set(key, value)
}
