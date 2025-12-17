import PlantCard from "./PlantCard";

export default function PlantList({ plants }) {
  return (
    <>
      <ul>
        <h2>Plant list</h2>
        {plants.map((plant)=>(
          <PlantCard key={plant._id} />
        ))}
       
      </ul>
    </>
  );
}
