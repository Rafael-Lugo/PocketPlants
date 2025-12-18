import PlantList from "@/components/Plantlist/PlantList";
import useSWR from "swr";



export default function HomePage() {
  const { data: plant, isLoading, error } = useSWR("/api/plants");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to Load</p>;


  return (
    <div>
      <h1>Plantpal App</h1>
      <PlantList plants={plant} />
    </div>
  );
}
