import PlantCard from "./PlantCard";

export default function PlantList({
  plants,
  favoritePlantIds,
  toggleFavorite,
}) {
  return (
    <ul>
      <h2>Plant list</h2>
      {plants.map((plant) => (
        <li key={plant._id}>
          <PlantCard
            plant={plant}
            isFavorite={favoritePlantIds.includes(plant._id)}
            toggleFavorite={toggleFavorite}
          />
        </li>
      ))}
    </ul>
  );
}
