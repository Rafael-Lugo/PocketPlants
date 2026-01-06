import PlantForm from "@/components/PlantForm/PlantForm";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function CreatePlantPage() {
  const router = useRouter();
  const { mutate } = useSWR("/api/plants");

  async function handleCreatePlant(plantData) {
    const response = await fetch("/api/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plantData),
    });

    if (response.ok) {
      await mutate();
      router.push("/");
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error("Create failed:", errorData);
    }
  }

  return (
    <main>
      <h1>Create Plant</h1>
      <PlantForm onSubmit={handleCreatePlant} />
    </main>
  );
}
