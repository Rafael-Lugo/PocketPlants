import PlantList from "@/components/Plantlist/PlantList";
import { Subtitle, Titel } from "@/styles";
import useSWR from "swr";

export default function MyPlantsPage({ favoritePlantIds, toggleFavorite }) {
  const { data, isLoading, error } = useSWR("/api/plants");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to Load</p>;

  const favoritePlants = (data ?? []).filter((plant) =>
    favoritePlantIds.includes(plant._id)
  );

  return (
    <>
      <Titel>My Plants</Titel>
      {favoritePlants.length === 0 ? (
        <Subtitle>no favorites yet</Subtitle>
      ) : (
        <PlantList
          plants={favoritePlants}
          favoritePlantIds={favoritePlantIds}
          toggleFavorite={toggleFavorite}
        />
      )}
    </>
  );
}
