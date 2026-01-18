import { useState } from "react";
import {
  getWaterIconSrc,
  getLightIconSrc,
  getFertiliserIconSrc,
} from "../Icons/optionIcons";
import Image from "next/image";
import {
  ActionBar,
  ContenLabel,
  ContentCard,
  ContentIcons,
  ContentItem,
  ContentText,
  ContentWrapper,
  IconItem,
  IconLabel,
  IconWithLabel,
  ImageWrapper,
  SubtitlePage,
  TextWrapper,
  TitelPage,
} from "./PlantDetailsStyle";
import { ButtonInput, DeleteButton } from "../Button/ButtonStyle";

import Delete from "/public/assets/icons/delete.svg";
import {
  CheckboxGrid,
  CheckboxLabel,
  Fieldset,
  FormGroup,
  FormWrapper,
} from "./PlantFormStyle";

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
                sizes="(max-width: 768px) 100vw, 360px"
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

            <ContentItem>
              <ContentText>Light needs:</ContentText>
              {light_Icon && (
                <Image
                  src={light_Icon}
                  alt={`Light: ${plant.lightNeed}`}
                  width={32}
                  height={32}
                />
              )}
              <ContenLabel>{plant.lightNeed}</ContenLabel>
            </ContentItem>

            <ContentItem>
              <ContentText>Fertiliser season:</ContentText>

              <ContentIcons>
                {fertiliserIcons.length > 0 ? (
                  fertiliserIcons.map(({ season, src }) => (
                    <IconWithLabel key={season}>
                      <IconItem>
                        <Image
                          src={src}
                          alt={`Fertiliser: ${season}`}
                          width={32}
                          height={32}
                        />
                      </IconItem>
                      <IconLabel>{season}</IconLabel>
                    </IconWithLabel>
                  ))
                ) : (
                  <IconWithLabel aria-hidden />
                )}
              </ContentIcons>
              <ContenLabel aria-hidden />
            </ContentItem>
          </ContentWrapper>

          <ActionBar>
            <ButtonInput
              type="button"
              aria-label="edit button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </ButtonInput>

            <DeleteButton
              type="button"
              aria-label="delete button"
              onClick={() => onDelete(plant._id)}
            >
              <Delete alt="delete" width={48} height={48} />
            </DeleteButton>
          </ActionBar>
        </>
      ) : (
        <FormWrapper onSubmit={handleSubmit}>
          <FormGroup>
            Name
            <input name="name" defaultValue={plant.name} required />
          </FormGroup>

          <FormGroup>
            Botanical name
            <input
              name="botanicalName"
              defaultValue={plant.botanicalName}
              required
            />
          </FormGroup>

          <FormGroup>
            Change image
            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                setSelectedFile(event.target.files?.[0] ?? null)
              }
            />
          </FormGroup>

          <FormGroup>
            Description
            <textarea name="description" defaultValue={plant.description} />
          </FormGroup>

          <FormGroup>
            Water need
            <select name="waterNeed" defaultValue={plant.waterNeed} required>
              {waterNeeds.map((need) => (
                <option key={need} value={need}>
                  {need}
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            Light need
            <select name="lightNeed" defaultValue={plant.lightNeed} required>
              {lightNeeds.map((need) => (
                <option key={need} value={need}>
                  {need}
                </option>
              ))}
            </select>
          </FormGroup>

          <Fieldset>
            <legend>Fertiliser season</legend>

            <CheckboxGrid>
              {seasons.map((season) => (
                <CheckboxLabel key={season}>
                  <input
                    type="checkbox"
                    name="fertiliserSeason"
                    value={season}
                    defaultChecked={fertiliserSeasons.includes(season)}
                  />
                  {season}
                </CheckboxLabel>
              ))}
            </CheckboxGrid>
          </Fieldset>

          <ButtonInput type="submit">Save change</ButtonInput>
        </FormWrapper>
      )}
    </>
  );
}
