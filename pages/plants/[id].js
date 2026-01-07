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
    mutate,
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

  async function handleDelete(id) {
    const isConfirmed = window.confirm(
    `Are you sure you want to delete "${plant.name}"?`
  );
  if (!isConfirmed) {
    return;
  }
  await fetch(`/api/plants/${id}`, {
    method: "DELETE",
  });
  router.push("/");
}
  return (
    <>
      <PlantDetails plant={plant} onEdit={handleEdit} onDelete={handleDelete}/>
      
    </>
  );
}
