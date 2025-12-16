import mongoose from "mongoose";

const { Schema } = mongoose;

const plantSchema = new Schema({
    plant: { type: String, require: true },
});

const Plant = mongoose.models.Plant || mongoose.model("Plant", plantSchema);

export default Plant;