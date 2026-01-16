import styled from "styled-components";
import PlantCard from "./PlantCard";

export default function PlantList({
  plants,
  favoritePlantIds,
  toggleFavorite,
}) {
  return (
    <>
      <TitelPage>Plant list</TitelPage>
      <PlantListWrapper>
        {plants.map((plant) => (
          <PlantListItem key={plant._id}>
            <PlantCard
              plant={plant}
              imageUrl={plant.imageUrl}
              isFavorite={favoritePlantIds.includes(plant._id)}
              toggleFavorite={toggleFavorite}
            />
          </PlantListItem>
        ))}
      </PlantListWrapper>
    </>
  );
}

export const PlantListWrapper = styled.ul`
  display: grid;
  gap: 10px;
  padding: 0;
  margin: 0;
  margin-bottom: 6rem;
  grid-template-columns: 1fr;
  list-style: none;
  justify-content: center;

  background: transparent;
  color: var(--color);

  transform: translateY(0);

  @media (min-width: 375px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 520px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 2000px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const PlantListItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;

 
`;

export const TitelPage = styled.h2`
  
  text-align: center;
  grid-column: 1 / -1;
`;
