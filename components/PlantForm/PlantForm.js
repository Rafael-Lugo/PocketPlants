export default function PlantForm({ onSubmit }) {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const plantData = Object.fromEntries(formData);

    onSubmit(plantData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {" "}
        Image
        <input name="imageUrl" />
      </label>

      <label>
        Name <input name="name" required />
      </label>

      <label>
        Botanical Name <input name="botanicalName" />
      </label>

      <label>
        Description <input name="description" />
      </label>

      <label>
        Fertiliser season <input name="fertiliserSeason" />
      </label>

       <label>
        Water need <input name="waterNeed" />
      </label>

       <label>
        Light need <input name="lightNeed" />
      </label>
 

      <button type="submit">Create plant</button>
    </form>
  );
}
