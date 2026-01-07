import { useState } from "react";

export default function PlantDetails({ plant, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  if (!plant) return null;

  async function handleSubmit(event) {
    await onEdit(event);
    setIsEditing(false);
  }

  return (
    <>
      <h1>{plant.name}</h1>
      <p>{plant.botanicalName}</p>
      <img
        src={plant.imageUrl?.url || plant.imageUrl}
        alt={plant.name}
        height={300}
      />

      {!isEditing ? (
        <>
          <p>{plant.description}</p>
          <ul>
            <li>Water: {plant.waterNeed}</li>
            <li>Light: {plant.lightNeed}</li>
          </ul>

          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(plant._id)}>          
            Delete
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Description
            <textarea name="description" defaultValue={plant.description} />
          </label>

          <label>
            Water need
            <input
              type="text"
              name="waterNeed"
              defaultValue={plant.waterNeed}
            />
          </label>

          <label>
            Light need
            <input
              type="text"
              name="lightNeed"
              defaultValue={plant.lightNeed}
            />
          </label>

          <button type="submit">Save change</button>
        </form>
      )}
    </>
  );
}
