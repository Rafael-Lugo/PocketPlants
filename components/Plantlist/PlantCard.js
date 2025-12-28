import Link from "next/link";
import FavoriteButton from "../FavoriteButton";
import styled from "styled-components";

export default function PlantCard({ plant, isFavorite, toggleFavorite }) {
  const imageSrc = plant?.imageUrl?.url ?? plant?.imageUrl ?? "/placeholder.png";
  const title = plant?.name ?? "plant";

  return (
    <article>
      <FavoriteButton
        isFavorite={isFavorite}
        onToggle={() => toggleFavorite(plant._id)}
      />
      <Link href={`/plants/${plant._id}`}>
        <article>
          <img src={imageSrc} alt={title} height={300} />
          <h2>{plant.name}</h2>
          {plant.botanicalName ? <p>{plant.botanicalName}</p> : null}
        </article>
      </Link>
    </article>
  );
}


export const CardWrapper = styled.article`
width: 100%;
max-width: 300px;
border-radius: 25px;
overflow: hidden;
position: relative;
display: block;
aspect-ratio: 3 / 4;
`

export const CardImage = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
display: block;
`

export const CardTitle = styled.h2`
font-size: 1.5rem;
font-weight: 700;
`

export const CardSubtitle = styled.p`
font-size: 1rem;
font-weight: 400;
`

export const BookmarkWrapper = styled.div`
position: absolute;
top: 1rem;
right: 1rem;
z-index: 2;
width: 56px;
height: 56px;

`