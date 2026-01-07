import { useState } from "react";
import { PlantFormWrapper } from "./PlantFormStyled";

export default function PlantForm({ onSubmit, options }) {
   const [selectedFile, setSelectedFile] = useState(null);
  const [submitError, setSubmitError] = useState("");

  

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");

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

    if (!fertiliserSeason.length) {
      setSubmitError("Please select at least one fertiliser season.");
      return;
    }
    
     const plantData = {
      ...data,
      fertiliserSeason,
    };

    if (selectedFile) {
      const uploadFormData = new FormData();
      uploadFormData.append("image", selectedFile);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        setSubmitError("Image upload failed");
        return;
      }

      const uploadResult = await uploadResponse.json();


      plantData.imageUrl = {
        url: uploadResult.url,
        width: String(uploadResult.width),
        height: String(uploadResult.height),
        public_id: uploadResult.publicId,
      };
    }

     onSubmit(plantData);
  }

  const lightNeeds = options?.lightNeeds ?? [];
  const waterNeeds = options?.waterNeeds ?? [];
  const seasons = options?.fertiliserSeason ?? [];

  return (
    <PlantFormWrapper onSubmit={handleSubmit}>
      
      <label>
        Image
        <input
          type="file"
          name="image"
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

      {submitError ? <p role="alert">{submitError}</p> : null}

      <button type="submit">Create plant</button>
    </PlantFormWrapper>
  );
}
