import { useRouter } from "next/router";
import useSWR from "swr";

export default function PlantDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: plant, error, isLoading } = useSWR(id ? `/api/plants/${id}` : null);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!plant) {
    return (
      <div>
        <h2>Not found</h2>
        <p>Plant not found.</p>
      </div>
    );
  }

  return (
    <>
      <h1>{plant.name}</h1>
      <p>{plant.botanicalName}</p>
      <p>{plant.description}</p>
      <ul>
        <li>{plant.waterNeed}</li>
        <li>{plant.lightNeed}</li>
      </ul>
    </>
  );
}
