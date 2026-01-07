import { useState } from "react";
import { getWaterIconSrc, getLightIconSrc } from "../Icons/optionIcons";


export default function PlantDetails({ plant, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  if (!plant) return null;

  const water_Icon = getWaterIconSrc(plant.waterNeed);
  const light_Icon = getLightIconSrc(plant.lightNeed);

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
            <li>Water needs:
              {water_Icon && (
                <img
                  src={water_Icon}
                  alt={`Water: ${plant.waterNeed}`}
                  width={32}
                  height={32}
                />
              )}
              <span>{plant.waterNeed}</span>
            </li>

            <li>Light needs: 
              {light_Icon && (
                <img
                  src={light_Icon}
                  alt={`Light: ${plant.lightNeed}`}
                  width={32}
                  height={32}
                />
              )}
              <span>{plant.lightNeed}</span>
            </li>
          </ul>

          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>

          <button type="button" onClick={() => onDelete(plant._id)}>
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
