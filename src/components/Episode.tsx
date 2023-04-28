import React, {FC} from 'react';
import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

//aqui se renderiza en el cliente

const Episode:FC<{id:string}>=({id})=>{
        const query=gql`
            query episode($id:ID!){
                episode(id:$id) {
                    name
                    air_date
                    characters{
                        id,
                        name
                    }
                }
            }
        `;
        
    const [charID, setCharID] = useState<string>(id);
    const {loading,error,data}=useQuery<{
        episode:{
            name: string;
            air_date: string;
            characters: { id:string;name: string }[];

        }
    }>(query,{
        variables:{
            id:charID
            }})

    if(loading) return <div>Loading...</div>
    if(error) return <div>Error</div>
    return (
        <div>
          <h3>Episode Details</h3>
          <p>
            <strong>Name:</strong> {data?.episode.name}
          </p>
          <p>
            <strong>Air date:</strong> {data?.episode.air_date}
          </p>
          <div>
            {data?.episode.characters.length ? (
              <div>
                <strong>Characters:</strong>
                <ul>
                  {data?.episode.characters.map((charac) => (
                    <li key={charac.id}>
                      <strong>Name:</strong>{" "}
                      <Link href={`/character/${charac.id}`}>
                        {charac.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No characters found.</p>
            )}
          </div>
        </div>
      );
    };

export default Episode;