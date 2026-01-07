import mongoose from "mongoose";

const { Schema } = mongoose;

const plantOptionsSchema = new Schema({
  type: { type: String, required: true, unique: true },
  lightNeeds: [{ type: String, required: true }],
  waterNeeds: [{ type: String, required: true }],
  fertiliserSeason: [{ type: String, required: true }],
});

export default mongoose.models.PlantOptions ||
  mongoose.model("PlantOptions", plantOptionsSchema);
