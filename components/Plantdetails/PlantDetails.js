
export default function PlantDetails({plant}) {
   
  if (!plant) return null;

    

  return (
    <>
      <h1>{plant.name}</h1>
      <p>{plant.botanicalName}</p>
      <img
        src={plant.imageUrl?.url || plant.imageUrl}
        alt={plant.name}
        height={300}
      />
      <p>{plant.description}</p>
      <ul>
        <li>{plant.waterNeed}</li>
        <li>{plant.lightNeed}</li>
      </ul>
    </>
  );
}
