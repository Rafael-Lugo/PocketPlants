import Link from "next/link";

export default function PlantCard({ plant }) {
  return (
    <li>
      <Link href={`/plants/${plant._id}`}>
        <article>
          <h2>{plant.name}</h2>
          {plant.botanicalName ? <p>{plant.botanicalName}</p> : null}
        </article>
      </Link>
    </li>
  );
}
