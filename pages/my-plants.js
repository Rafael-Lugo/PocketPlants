import PlantList from "@/components/Plantlist/PlantList";
import useSWR from "swr";

export default function MyPlantsPage() {
  const { data, isLoading, error } = useSWR("/api/plants");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to Load</p>;

  return (
    <main>
      <h1>My Plants</h1>
      <PlantList plants={data} />
    </main>
  );
}
