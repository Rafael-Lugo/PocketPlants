import Link from "next/link";
import FavoriteButton from "../FavoriteButton";
import styled from "styled-components";

export default function PlantCard({ plant, isFavorite, toggleFavorite }) {
  if (!plant) {
    return null;
  }
  
  const imageSrc = plant?.imageUrl?.url ?? plant?.imageUrl ?? "/placeholder.png";
  const title = plant?.name ?? "plant";

  return (
    <CardWrapper>
      <BookmarkWrapper>
      <FavoriteButton
        isFavorite={isFavorite}
        onToggle={() => toggleFavorite(plant._id)}
      />
      </BookmarkWrapper>
      <Link href={`/plants/${plant._id}`}>
        <CardLink>
          
          <CardImageWrapper>
          <CardImage src={imageSrc} alt={title} height={300} />
          </CardImageWrapper>

          <CardContent>
          <CardTitle>{plant.name}</CardTitle>
          {plant.botanicalName ? <CardSubtitle>{plant.botanicalName}</CardSubtitle> : null}
          </CardContent>
        </CardLink>
      </Link>
    </CardWrapper>
  );
}


export const CardWrapper = styled.article`
width: 100%;
max-width: 300px;
max-height: 400px;
border-radius: 25px;
overflow: hidden;
position: relative;
display: block;
aspect-ratio: 3 / 4;
margin: 3rem;
`

export const CardLink = styled.a`
display: block;
text-decoration: none;
`

export const CardImageWrapper = styled.div`
width: 100%;
aspect-ratio: 1 / 1;
overflow: hidden;
border-radius: 25px;
`

export const CardImage = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
display: block;
object-fit: cover;
object-position: center;
`

export const CardContent = styled.div`
padding: 14px 16px 18px;
text-align: center;
`

export const CardTitle = styled.h2`
margin: 0;
font-size: 1.5rem;
font-weight: 700;
`

export const CardSubtitle = styled.p`
margin: 6px 0 0;
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