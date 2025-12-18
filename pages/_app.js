import Navigation from "@/components/Navigation/Navigation";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [favoritePlantIds, setFavoritePlantIds] = useState([]);

  function toggleFavorite(_id) {
    setFavoritePlantIds((favoritePlantIds) =>
      favoritePlantIds.includes(_id)
        ? favoritePlantIds.filter((plant) => plant !== _id)
        : [...favoritePlantIds, _id]
    );
  }

  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Component
          {...pageProps}
          toggleFavorite={toggleFavorite}
          favoritePlantIds={favoritePlantIds}
        />
        <Navigation />
      </SWRConfig>
    </>
  );
}
