import PlantList from "@/components/Plantlist/PlantList";
import useSWR from "swr";
import { useState } from "react";
import SearchBar from "@/components/Searchbar/Searchbar";
import { Titel, Subtitle, HeaderWrapper, AppIconWrapper } from "@/styles";

import Logo from "@/public/assets/icons/plantpal-icon.svg";

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
    <>
      <HeaderWrapper>
        <AppIconWrapper>
          <Logo />
        </AppIconWrapper>
        <Titel>Plantpal</Titel>
      </HeaderWrapper>

      <SearchBar
        search={search}
        setSearch={setSearch}
        isMenuActive={isMenuActive}
        setIsMenuActive={setIsMenuActive}
      />

      {search && filterPlants?.length === 0 ? (
        <Subtitle>No plants found</Subtitle>
      ) : (
        <PlantList
          plants={filterPlants}
          favoritePlantIds={favoritePlantIds}
          toggleFavorite={toggleFavorite}
        />
      )}
    </>
  );
}
