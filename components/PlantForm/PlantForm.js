import { useState } from "react";
import {
  ButtonInput,
  ButtonRow,
  CheckboxGrid,
  CheckboxLabel,
  Fieldset,
  FormGroup,
  PlantFormWrapper,
} from "./PlantFormStyled";

export default function PlantForm({ onSubmit, options }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");

    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData);

    const fertiliserSeason = formData.getAll("fertiliserSeason");

    if (!fertiliserSeason.length) {
      setSubmitError("Please select at least one fertiliser season.");
      return;
    }

    const plantData = {
      ...data,
      fertiliserSeason,
    };

    const PLACEHOLDER_IMAGE = {
      url: "/images/plant-placeholder.png",
      width: 600,
      height: 600,
      public_id: "placeholder",
    };

    plantData.imageUrl = PLACEHOLDER_IMAGE;

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
        width: Number(uploadResult.width),
        height: Number(uploadResult.height),
        public_id: uploadResult.public_id,
      };
    }

    onSubmit(plantData);
  }

  const lightNeeds = options?.lightNeeds ?? [];
  const waterNeeds = options?.waterNeeds ?? [];
  const seasons = options?.fertiliserSeason ?? [];

  return (
    <PlantFormWrapper onSubmit={handleSubmit}>
      <FormGroup>
        Image
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
        />
      </FormGroup>

      <FormGroup>
        Plant name * <input name="name" required />
      </FormGroup>

      <FormGroup>
        Botanical name * <input name="botanicalName" required />
      </FormGroup>

      <FormGroup>
        Description <input name="description" />
      </FormGroup>

      <Fieldset>
        <legend>Light needs *</legend>
        <CheckboxGrid>
          {lightNeeds.map((need) => (
            <CheckboxLabel key={need}>
              <input type="radio" name="lightNeed" value={need} required />
              {need}
            </CheckboxLabel>
          ))}
        </CheckboxGrid>
      </Fieldset>

      <Fieldset>
        <legend>Water needs *</legend>
        <CheckboxGrid>
          {waterNeeds.map((need) => (
            <CheckboxLabel key={need}>
              <input type="radio" name="waterNeed" value={need} required />
              {need}
            </CheckboxLabel>
          ))}
        </CheckboxGrid>
      </Fieldset>

      <Fieldset>
        <legend>Fertiliser season *</legend>
        <CheckboxGrid>
          {seasons.map((season) => (
            <CheckboxLabel key={season}>
              <input type="checkbox" name="fertiliserSeason" value={season} />
              {season}
            </CheckboxLabel>
          ))}
        </CheckboxGrid>
      </Fieldset>

      {submitError ? <p role="alert">{submitError}</p> : null}

      <ButtonRow>
        <ButtonInput aria-label="create plant" type="submit">
          Create plant
        </ButtonInput>
      </ButtonRow>
    </PlantFormWrapper>
  );
}
