import React from 'react';
import { NextPage } from 'next';
import { gql } from '@apollo/client';
import Link from 'next/link';

interface LocationProps {
  name: string;
  dimension: string;
  residents: Array<{
    name: string;
    id: string; // se agrega el ID del residente
  }>;
}

const Location: React.FC<LocationProps> = (props) => {
  return (
    <>
      <h3>Location Details</h3>
      <p>
        <strong>Name:</strong> {props.name}
      </p>
      <p>
        <strong>Dimension:</strong> {props.dimension}
      </p>
      <div>
        <strong>Residents:</strong>
        <ul>
          {props.residents.map((resd) => (
            <li key={resd.id}>
              <strong>Name:</strong>{" "}
              <Link href={`/character/${resd.id}`}>{resd.name}</Link> 
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Location;