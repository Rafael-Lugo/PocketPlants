import PlantList from "@/components/Plantlist/PlantList";
import useSWR from "swr";
import { useState } from "react";
import SearchBar from "@/components/Searchbar/Searchbar";
import { Titel } from "@/styles";
import PlantForm from "@/components/PlantForm/PlantForm";
import { ButtonLink } from "@/components/Navigation/StyledNavigation";

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
      <Titel>Plantpal App</Titel>
      <SearchBar search={search} setSearch={setSearch}
      />

      <ButtonLink href="/create-plant">Create Plant</ButtonLink>
      <PlantList
        plants={filterPlants}
        favoritePlantIds={favoritePlantIds}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}
