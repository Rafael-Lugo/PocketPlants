import { useState } from "react";
import { getWaterIconSrc, getLightIconSrc } from "../Icons/optionIcons";
import Image from "next/image";

export default function PlantDetails({ plant, options, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const lightNeeds = options?.lightNeeds ?? [];
  const waterNeeds = options?.waterNeeds ?? [];
  const seasons = options?.fertiliserSeason ?? [];

  if (!plant) return null;

  const water_Icon = getWaterIconSrc(plant.waterNeed);
  const light_Icon = getLightIconSrc(plant.lightNeed);

  const imgSrc =
    plant?.imageUrl?.url ?? plant?.imageUrl ?? "/images/plant-placeholder.png";

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const fertiliserSeason = formData.getAll("fertiliserSeason");
    data.fertiliserSeason = fertiliserSeason;

    await onEdit({
      id: plant._id,
      data,
      file: selectedFile,
    });

    setSelectedFile(null);
    setIsEditing(false);
  }

  return (
    <>
      <h1>{plant.name}</h1>
      <p>{plant.botanicalName}</p>
      <Image src={imgSrc} width={600} height={600} alt={plant.name} />

      {!isEditing ? (
        <>
          <p>{plant.description}</p>
          <ul>
            <li>
              Water needs:
              {water_Icon && (
                <Image
                  src={water_Icon}
                  alt={`Water: ${plant.waterNeed}`}
                  width={32}
                  height={32}
                />
              )}
              <span>{plant.waterNeed}</span>
            </li>

            <li>
              Light needs:
              {light_Icon && (
                <Image
                  src={light_Icon}
                  alt={`Light: ${plant.lightNeed}`}
                  width={32}
                  height={32}
                />
              )}
              <span>{plant.lightNeed}</span>
            </li>

            <li>
              Fertiliser season:
              <span>{plant.fertiliserSeason}</span>
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
            Change image
            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                setSelectedFile(event.target.files?.[0] ?? null)
              }
            />
          </label>

          <label>
            Description
            <textarea name="description" defaultValue={plant.description} />
          </label>

          <label>
            Water need
            <select name="waterNeed" defaultValue={plant.waterNeed} required>
              {waterNeeds.map((need) => (
                <option key={need} value={need}>
                  {need}
                </option>
              ))}
            </select>
          </label>

          <label>
            Light need
            <select name="lightNeed" defaultValue={plant.lightNeed} required>
              {lightNeeds.map((need) => (
                <option key={need} value={need}>
                  {need}
                </option>
              ))}
            </select>
          </label>

          <fieldset>
            <legend>Fertiliser season</legend>

            {seasons.map((season) => (
              <label key={season}>
                <input
                  type="checkbox"
                  name="fertiliserSeason"
                  value={season}
                  defaultChecked={plant.fertiliserSeason?.includes(season)}
                />
                {season}
              </label>
            ))}
          </fieldset>

          <button type="submit">Save change</button>
        </form>
      )}
    </>
  );
}
