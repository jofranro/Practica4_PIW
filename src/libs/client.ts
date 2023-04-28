import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

let client:ApolloClient<NormalizedCacheObject>|undefined = undefined;
/*
export const getSSRClient = () => {
    return new ApolloClient({
        uri: API_SSR,
        cache: new InMemoryCache()
    });
}
*/
const CSRClient = new ApolloClient({
    //uri: API_CSR,
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache()
});

const getClient = () => { 
    if(typeof window === 'undefined'){ //Funcion para saber si estamos en el servidor o en el cliente
        return new ApolloClient({  //Si estamos en el servidor, devolvemos el cliente para SSR
            //uri: API_SSR,
            uri: "https://rickandmortyapi.com/graphql",
            cache: new InMemoryCache()
    });
    }else { //
        return CSRClient;
    }
}

export default getClient;
