import Link from "next/link";

export default function PlantCard({ plant }) {
  return (
    <li>
        <Link href={`/plants/${_id}`}>
        <h2>{plant.name}</h2>
        <p>Botanical name: {plant.botanicalName}</p>
        <p>Water: {plant.waterNeed}</p>
        <p>Light: {plant.lighNeed}</p>
        </Link>
      
    </li>
  );
}
