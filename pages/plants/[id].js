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

  async function handleEdit({ id: plantId, data, file }) {
    const updates = {
      description: data.description ?? "",
      waterNeed: data.waterNeed,
      lightNeed: data.lightNeed,
    };

    Object.keys(updates).forEach((key) => {
      if (updates[key] === undefined) delete updates[key];
    });

    if (file) {
      const uploadFormData = new FormData();
      uploadFormData.append("image", file);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        console.error("Image upload failed");
        return;
      }

      const uploadResult = await uploadResponse.json();
      const publicId = uploadResult.public_id ?? uploadResult.publicId;

      updates.imageUrl = {
        url: uploadResult.url,
        width: String(uploadResult.width),
        height: String(uploadResult.height),
        public_id: String(publicId),
      };
    }

    const response = await fetch(`/api/plants/${plantId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      console.error("Update failed");
      return;
    }

    await mutate();
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
      <PlantDetails plant={plant} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
}
