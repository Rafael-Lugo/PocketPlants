import dbConnect from "@/db/connect";
import PlantOptions from "@/db/models/PlantOptions";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const options = await PlantOptions.find({ type: "plantOptions" });
      if (!options) {
        return response.status(404).json({ error: "Plant options not found" });
      }

      return response.status(200).json(options);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: error.message });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}
