import Link from "next/link";
import FavoriteButton from "../FavoriteButton";

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
