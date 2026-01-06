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
        Name <input name="name" required />
      </label>
    </form>
  );
}
