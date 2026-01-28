import Navigation from "@/components/Navigation/Navigation";
import GlobalStyle, { AppShell } from "../styles";
import { SWRConfig } from "swr";
import { useState, useEffect } from "react";
import { Leaf } from "@/components/Navigation/StyledNavigation";
import { SessionProvider } from "next-auth/react";
import AuthBar from "@/components/auth/AuthBar";

const fetcher = (url) => fetch(url).then((response) => response.json());

const STORANGE_KEY = "favoritePlantIds";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [favoritePlantIds, setFavoritePlantIds] = useState([]);
  const [hasLoadedFavorites, setHasLoadedFavorites] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORANGE_KEY);
    if (stored) {
      try {
        setFavoritePlantIds(JSON.parse(stored));
      } catch (error) {
        console.error("Could not parse favorites from localStorage", error);
      }
    }
    setHasLoadedFavorites(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedFavorites) return;

    localStorage.setItem(STORANGE_KEY, JSON.stringify(favoritePlantIds));
  }, [favoritePlantIds, hasLoadedFavorites]);

  function toggleFavorite(_id) {
    setFavoritePlantIds((favoritePlantIds) =>
      favoritePlantIds.includes(_id)
        ? favoritePlantIds.filter((plantId) => plantId !== _id)
        : [...favoritePlantIds, _id]
    );
  }

  return (
    <SessionProvider session={pageProps.session}>
      <AuthBar />
      <main>
        <GlobalStyle />
        <Leaf
          style={{ left: "-55px", top: "-55px", transform: "rotate(180deg)" }}
        />
        <AppShell>
          <SWRConfig value={{ fetcher }}>
            <Component
              {...pageProps}
              toggleFavorite={toggleFavorite}
              favoritePlantIds={favoritePlantIds}
            />
            <Navigation />
          </SWRConfig>
        </AppShell>
      </main>
    </SessionProvider>
  );
}
