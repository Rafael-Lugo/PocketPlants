import dbConnect from "@/db/connect";
import Plant from "/db/models/Plant";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const plants = await Plant.find().sort({ _id: -1 });
    return response.status(200).json(plants);
  }

  if (request.method === "POST") {
    try {
      const plantData = request.body;
      await Plant.create(plantData);

      response.status(201).json({ message: "Plant created successfully" });
    } catch (error) {
      console.error("Error creating plant:", error);
      response.status(400).json({ error: error.message });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}
