import { gql } from "@apollo/client";
import getApolloClient from "@/libs/client"
import { GetServerSideProps, NextPage } from "next";
import Location from "@/components/Location";
import React from 'react';

interface LocationProps {
  name: string;
  dimension: string;
  residents: Array<{
    id: string;
    name: string;
  }>;
}

interface LocationPageProps extends LocationProps {}

export const getServerSideProps: GetServerSideProps<LocationPageProps> = async (context) => {
  const { id } = context.query;
  const query = gql`
    query location($id: ID!) {
      location(id: $id) {
        name,
        dimension,
        residents {
          id
          name
        }
      }
    }
  `;
  const client = getApolloClient();
  const { data } = await client.query({
    query,
    variables: {
      id,
    },
  });

  return {
    props: {
      ...data.location,
    },
  };
};

const LocationPage: NextPage<LocationPageProps> = (props) => {
  return (
    <div>
      <Location {...props} />
    </div>
  );
};

export default LocationPage;