import getApolloClient from "@/libs/client";
import Character from "@/components/Character";
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import { gql } from "@apollo/client";
import Episode from "@/components/Episode";



export const getServerSideProps:GetServerSideProps=async(context) =>{
    const {id}=context.query;

  return {
    props: {
      id
    },
  };
}

const Page:NextPage<{id:string}> =({id})=> {
    return (
      <>
      <Episode id={id}/>
      </>
    )
}
export default Page;