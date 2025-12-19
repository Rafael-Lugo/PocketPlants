import PlantList from "@/components/Plantlist/PlantList";
import useSWR from "swr";
import { useState } from "react";
import SearchBar from "@/components/Searchbar/Searchbar";

export default function HomePage({ favoritePlantIds, toggleFavorite }) {
  const { data: plants, isLoading, error } = useSWR("/api/plants");
  const [search, setSearch] = useState("");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to Load</p>;

  const filterPlants = plants?.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Plantpal App</h1>
      <SearchBar search={search} setSearch={setSearch}
      />
      <PlantList
        plants={filterPlants}
        favoritePlantIds={favoritePlantIds}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}
