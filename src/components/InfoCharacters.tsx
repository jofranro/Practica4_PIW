import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import Character from "@/components/Character";
interface Props {
  page: number;
  nameFilter: string;
  onSetTotalPages: (totalPages: number) => void;
}


const InfoCharacters: React.FC<Props> = ({ page, nameFilter, onSetTotalPages }) => {
  const GET_CHARACTERS = gql`
    query Characters($page: Int!, $name: String) {
      characters(page: $page, filter: { name: $name }) {
        info {
          count
          pages
        }
        results {
          id
          name
          image
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page, name: nameFilter },
  });

  if (error) return <p>Error: {error.message}</p>;

  if (loading) return <p>Loading...</p>;

  onSetTotalPages(data.characters.info.pages);

  return (
    <>
      {data.characters.results.map((character: Character) => (
        <div key={character.id}>
          <Link href={`/character/${character.id}`}>
              <img src={character.image} alt={character.name} />
              <h3>{character.name}</h3>
          </Link>
        </div>
      ))}
    </>
  
  );
};

export default InfoCharacters;