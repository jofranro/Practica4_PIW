import { GetStaticProps, GetStaticPaths } from 'next';
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import getClient from '@/libs/client';
import React from "react";
import Link from 'next/link';

const Character = gql`
    query character($id: ID!) {
        character(id: $id) {
        id,
        image,
        name,
        location{
            id,
            name
        },
        gender,
        episode{
            id,
            episode,
            name
        }
        }
    }
  `;

export default function CharacterPage() {
    const router = useRouter();
    const { id } = router.query;
  
    const { loading, error, data } = useQuery(Character, {
      variables: { id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    const character = data.character;
  
  return (
    <div>
    <h2>Character Details</h2>
        <img src={character.image} alt={character.name} width={100} height={100}/>

        <p>
          <strong>Name:</strong>{character.name}
        </p>
        <p>
          <strong>Gender:</strong> {character.gender}
        </p>
        <p> <strong>Location:</strong>
            <Link href={`/location/${character.location.id}`}>{character.location.name}</Link>
        </p>
        <p><strong>Episodes:</strong>
            <ul>
                {character.episode.map((episode)=>(
                    <li key={episode.episode}><Link href={`/episode/${episode.id}`}>{episode.name}</Link></li>
                ))}
            </ul>
        </p>
    </div>
    );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const client = getClient();
  
    return {
        props: {
            id: params?.id,
            name: params?.name,
            image: params?.image,
            origin: params?.origin,
            episode: params?.episode,
        },
    };
  };
  
  export const getStaticPaths: GetStaticPaths = async () => {
    const client = getClient();
    const { data } = await client.query({
      query: gql`
      query charactersByIds{
        characters{
          results{
            id
          }
        }
      }
      `,
    });
  
    const paths = data.characters.results.map((character: { id: any; }) => ({
      params: { id: character.id },
    }));
  
    return {
      paths,
      fallback: false,
    };
  };