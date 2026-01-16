import PlantForm from "@/components/PlantForm/PlantForm";
import { Titel } from "@/styles";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function CreatePlantPage() {
  const router = useRouter();
  const { mutate } = useSWR("/api/plants");
  const { data: options, isLoading: optionsLoading } =
    useSWR("/api/plant-options");

  async function handleCreatePlant(plantData) {
    try {
      const response = await fetch("/api/plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plantData),
      });

      if (!response.ok) {
        let errorData = {};

        try {
          errorData = await response.json();
        } catch {}

        console.error("Create failed", errorData);
        return;
      }
      await mutate();
      router.push("/");
    } catch (error) {
      console.error("Network or unexpected error", error);
    }
  }

  if (optionsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Titel>Create Plant</Titel>
      <PlantForm onSubmit={handleCreatePlant} options={options} />
    </>
  );
}
