import PlantDetails from "@/components/Plantdetails/PlantDetails";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function PlantDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: plant,
    error,
    isLoading,
  } = useSWR(id ? `/api/plants/${id}` : null);

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

  async function handleDelete() {
    const response = await fetch(`/api/plants/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/");
    }

    async function handleEdit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const plantData = Object.fromEntries(formData);

      const response = await fetch(`/api/plants/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plantData),
      });

      if (response.ok) {
        mutate();
      }
    }
  }

  return (
    <>
      <PlantDetails plant={plant} />

      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
}
