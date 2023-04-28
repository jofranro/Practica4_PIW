import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Test from '@/components/Test'
import getApolloClient from '@/libs/client'
import { gql } from '@apollo/client'

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps = async() => {
  const query = gql`
    query character($id: ID!){
      character(id:$id) {
        name
      }
    }
  `
  const client = getApolloClient()
  const {data} = await client.query<{
    character: {
      name: string
    }
  }>({
    query,
    variables: { // Asi se llamaria cuando paso variable a la query
      id: "4"
    }
  });

  return {
    props: {
      name: data.character.name
    }
  }
}

export default function Home(props:{name:string}) {
  return (
    <>
      {props.name}
    </>
  )
}
