import PlantForm from "@/components/PlantForm/PlantForm";
import { Titel } from "@/styles";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import {
  SuccessMessage,
  SuccessOverlay,
} from "@/components/PlantForm/PlantFormStyled";

import { useSession, signIn } from "next-auth/react";

export default function CreatePlantPage() {
  const router = useRouter();
  const { status } = useSession();

  const { mutate } = useSWR("/api/plants");
  const { data: options, isLoading: optionsLoading } =
    useSWR("/api/plant-options");

  const [successMessage, setSuccesMessage] = useState("");

  if (status === "loading") {
    return <p>Loading session...</p>;
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Titel>Create Plant </Titel>
        <p>Acces denied. Please sign in to create a plant.</p>
        <button type="button" onClick={() => signIn("github")}>
          Sign in with GitHub
        </button>
      </>
    );
  }

  

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
      setSuccesMessage("Plant successfully created");

      setTimeout(() => {
        router.push("/");
      }, 1200);
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

      {successMessage && (
        <SuccessOverlay>
          <SuccessMessage role="status" aria-label="polite">
            {successMessage}
          </SuccessMessage>
        </SuccessOverlay>
      )}

      <PlantForm onSubmit={handleCreatePlant} options={options} />
    </>
  );
}
