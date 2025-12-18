import Link from "next/link";
import FavoriteButton from "../FavoriteButton";

export default function PlantCard({ plant, isFavorite, toggleFavorite }) {
  return (
    <article>
      <FavoriteButton
        isFavorite={isFavorite}
        onToggle={() => toggleFavorite(plant._id)}
      />
      <Link href={`/plants/${plant._id}`}>
        <article>
          <h2>{plant.name}</h2>
          {plant.botanicalName ? <p>{plant.botanicalName}</p> : null}
        </article>
      </Link>
    </article>
  );
}
