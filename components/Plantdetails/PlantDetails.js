import { useState } from "react";
import {
  getWaterIconSrc,
  getLightIconSrc,
  getFertiliserIconSrc,
} from "../Icons/optionIcons";
import Image from "next/image";
import {
  ContenLabel,
  ContentCard,
  ContentItem,
  ContentText,
  ContentWrapper,
  ImageWrapper,
  SubtitlePage,
  TextWrapper,
  Titel,
  TitelPage,
  Titelpage,
} from "./PlantDetailsStyle";

export default function PlantDetails({ plant, options, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const lightNeeds = options?.lightNeeds ?? [];
  const waterNeeds = options?.waterNeeds ?? [];
  const seasons = options?.fertiliserSeason ?? [];

  if (!plant) return null;

  const water_Icon = getWaterIconSrc(plant.waterNeed);
  const light_Icon = getLightIconSrc(plant.lightNeed);
  const fertiliserSeasons = Array.isArray(plant.fertiliserSeason)
    ? plant.fertiliserSeason
    : plant.fertiliserSeason
    ? [plant.fertiliserSeason]
    : [];

  const fertiliserIcons = fertiliserSeasons
    .map((season) => ({
      season,
      src: getFertiliserIconSrc(season),
    }))
    .filter((item) => item.src);

  const imgSrc =
    plant?.imageUrl?.url ?? plant?.imageUrl ?? "/images/plant-placeholder.png";

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const fertiliserSeasons = formData.getAll("fertiliserSeason");
    data.fertiliserSeason = fertiliserSeasons;

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
      <TitelPage>{plant.name}</TitelPage>
      <SubtitlePage>{plant.botanicalName}</SubtitlePage>
      {!isEditing ? (
        <>
          <ContentCard>
            <ImageWrapper>
              <Image
                src={imgSrc}
                alt={plant.name}
                fill
                sizes="(max-width: 768px) 45vw, 360px"
                style={{ objectFit: "cover" }}
                priority
              />
            </ImageWrapper>

            <TextWrapper>
              <p>{plant.description}</p>
            </TextWrapper>
          </ContentCard>

          <ContentWrapper>
            <ContentItem>
              <ContentText>Water needs:</ContentText>              
              {water_Icon && (
                <Image
                  src={water_Icon}
                  alt={`Water: ${plant.waterNeed}`}
                  width={32}
                  height={32}
                />
              )}
              <ContenLabel>{plant.waterNeed}</ContenLabel>
            </ContentItem>

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
              <div>
                {fertiliserIcons.length ? (
                  fertiliserIcons.map(({ season, src }) => (
                    <span key={season}>
                      <Image
                        src={src}
                        alt={`Fertiliser: ${season}`}
                        width={32}
                        height={32}
                      />
                    </span>
                  ))
                ) : (
                  <span>-</span>
                )}
              </div>
              <span>{plant.fertiliserSeason}</span>
            </li>
          </ContentWrapper>

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
            Name
            <input name="name" defaultValue={plant.name} required />
          </label>

          <label>
            Botanical name
            <input
              name="botanicalName"
              defaultValue={plant.botanicalName}
              required
            />
          </label>

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
                  defaultChecked={fertiliserSeasons.includes(season)}
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
