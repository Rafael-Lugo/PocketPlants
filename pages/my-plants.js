import PlantList from "@/components/Plantlist/PlantList";
import useSWR from "swr";

export default function MyPlantsPage({ favoritePlantIds, toggleFavorite }) {
  const { data, isLoading, error } = useSWR("/api/plants");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to Load</p>;

  const favoritePlants = data.filter((plant) =>
    favoritePlantIds.includes(plant._id)
  );

  return (
    <main>
      <h1>My Plants</h1>
      {favoritePlants.length === 0 ? (
        <p>no favorites yet</p>
      ) : (
        <PlantList
          plants={favoritePlants}
          favoritePlantIds={favoritePlantIds}
          toggleFavorite={toggleFavorite}
        />
      )}
    </main>
  );
}
