import { useState } from "react";
import { PlantFormWrapper } from "./PlantFormStyled";

export default function PlantForm({ onSubmit, options }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const lightNeeds = options?.lightNeeds ?? [];
  const waterNeeds = options?.waterNeeds ?? [];
  const seasons = options?.fertiliserSeason ?? [];

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData);

    const fertiliserSeason = formData.getAll("fertiliserSeason");

    if (
      !data.name ||
      !data.botanicalName ||
      !data.lightNeed ||
      !data.waterNeed
    ) {
      setError("please fill all required fields");
      return;
    }

    if (fertiliserSeason.length === 0) {
      setError("Please select at least one Fertiliser season.");
      return;
    }
    let imageUrl = undefined;

    if (selectedFile) {
      const uploadForm = new FormData();
      uploadForm.append("image", selectedFile);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: uploadForm,
      });

      if (!uploadResponse.ok) {
        setError("Image upload failed");
        return;
      }

      const uploadResult = await uploadResponse.json();

      imageUrl = {
        url: uploadResult.secure_url || uploadResult.url,
        width: String(uploadResult.width),
        height: String(uploadResult.height),
        publicId: uploadResult.public_id,
      };
    }

    const plantData = {
      name: data.name,
      botanicalName: data.botanicalName,
      description: data.description || "",
      lightNeed: data.lightNeed,
      waterNeed: data.waterNeed,
      fertiliserSeason,
      ...(imageUrl ? { imageUrl } : {}),
    };

    await onSubmit(plantData);
  }

  return (
    <PlantFormWrapper onSubmit={handleSubmit}>
      {error ? <p role="alert">{error}</p> : null}

      <label>
        Image
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
        />
      </label>

      <label>
        Plant name * <input name="name" required />
      </label>

      <label>
        Botanical name * <input name="botanicalName" required />
      </label>

      <label>
        Description <input name="description" />
      </label>

      <fieldset>
        <legend>Light needs *</legend>
        {lightNeeds.map((need) => (
          <label key={need}>
            <input type="radio" name="lightNeed" value={need} required />
            {need}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Water needs *</legend>
        {waterNeeds.map((need) => (
          <label key={need}>
            <input type="radio" name="waterNeed" value={need} required />
            {need}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Fertiliser season *</legend>
        {seasons.map((season) => (
          <label key={season}>
            <input type="checkbox" name="fertiliserSeason" value={season} />
            {season}
          </label>
        ))}
      </fieldset>

      <button type="submit">Create plant</button>
    </PlantFormWrapper>
  );
}
