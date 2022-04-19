import { ApolloClient, InMemoryCache } from '@apollo/client'

export const getClient = (uri: string) =>
  new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  })

export default getClient
