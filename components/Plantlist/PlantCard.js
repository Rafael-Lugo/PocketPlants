import Link from "next/link";
import FavoriteButton from "../FavoriteButton";
import styled from "styled-components";

export default function PlantCard({ plant, isFavorite, toggleFavorite }) {
  if (!plant) {
    return null;
  }

  const imageSrc =
    plant?.imageUrl?.url ?? plant?.imageUrl ?? "/images/plant-placeholder.png";
  const title = plant?.name ?? "plant";

  return (
    <CardWrapper>
      <BookmarkWrapper>
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={() => toggleFavorite(plant._id)}
        />
      </BookmarkWrapper>
      <CardLink href={`/plants/${plant._id}`}>
        <CardImageWrapper>
          <CardImage src={imageSrc} alt={title} height={300} />
        </CardImageWrapper>

        <CardContent>
          <CardTitle>{plant.name}</CardTitle>
          {plant.botanicalName ? (
            <CardSubtitle>{plant.botanicalName}</CardSubtitle>
          ) : null}
        </CardContent>
      </CardLink>
    </CardWrapper>
  );
}

export const CardWrapper = styled.article`
  inset: 0;
  width: 100%;
  max-width: 300px;
  max-height: 400px;
  border-radius: 25px;
  overflow: hidden;
  position: relative;
  display: block;
  aspect-ratio: 3 / 4;
  margin: 1rem auto;

  background: transparent;
  transform: scale(0.97);

  &:hover {
    background-color: var(--background-ground);
    border-radius: 25px;
    box-shadow: 0px 6px 6px rgba(0, 5, 10, 0.25);
    width: 90%;
    align-self: center;

    transform: scale(1.1);
    transition: background-color 0.2s ease-in-out;
  }
`;

export const CardLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  transform: scale(0.97);

  &:link,
  &:visited,
  &:hover,
  &:active {
    text-decoration: none;
    color: inherit;
  }

  & * {
    text-decoration: none;
  }
`;

export const CardImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 25px;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  object-fit: cover;
  object-position: center;
`;

export const CardContent = styled.div`
  padding: 14px 16px 18px;
  text-align: center;
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;

  color: var(--color);
  text-decoration: none;
`;

export const CardSubtitle = styled.p`
  margin: 6px 0 0;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;

  color: var(--color);
`;

export const BookmarkWrapper = styled.div`
  position: absolute;
  bottom: 4rem;
  right: 0.1rem;
  z-index: 2;
`;
