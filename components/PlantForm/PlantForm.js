import { PlantFormWrapper } from "./PlantFormStyled";

export default function PlantForm({ onSubmit, options }) {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const fertiliserSeason = formData.getAll("fertiliserSeason");
    const plantData = { ...data, fertiliserSeason };

    onSubmit(plantData);
  }

  const lightNeeds = options?.lightNeeds ?? [];
  const waterNeeds = options?.waterNeeds ?? [];
  const seasons = options?.fertiliserSeason ?? [];

  return (
    <PlantFormWrapper onSubmit={handleSubmit}>
      <label>
        {" "}
        Image
        <input name="imageUrl" />
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
