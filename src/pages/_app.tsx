import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import getApolloClient from '@/libs/client'

export default function App({ Component, pageProps }: AppProps) {
  const client = getApolloClient();
  return (
    // @ts-ignore // TODO: Fix this error with ApolloProvider, a mi me iba bien
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
