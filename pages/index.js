import PlantList from "@/components/Plantlist/PlantList";
import useSWR from "swr";
import { useState } from "react";
import SearchBar from "@/components/Searchbar/Searchbar";
import { Titel } from "@/styles";
import CreatePlantButton from "components/CreatePlantButton/index.js";

export default function HomePage({ favoritePlantIds, toggleFavorite }) {
  const { data: plants, isLoading, error } = useSWR("/api/plants");
  const [search, setSearch] = useState("");
  const [isMenuActive, setIsMenuActive] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to Load</p>;

  const filterPlants = plants?.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Titel>Plantpal App</Titel>
      <SearchBar
        search={search}
        setSearch={setSearch}
        isMenuActive={isMenuActive}
        setIsMenuActive={setIsMenuActive}
      />

      <CreatePlantButton />

      <PlantList
        plants={filterPlants}
        favoritePlantIds={favoritePlantIds}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}
