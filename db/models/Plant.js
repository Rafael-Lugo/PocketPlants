import mongoose from "mongoose";

const { Schema } = mongoose;

const plantSchema = new Schema({
  name: { type: String, required: true },
  imageUrl:{
    width: {type: String, require: true },
     height: { type: String, required: true },
    url: { type: String, required: true },
    public_id:{type: String, required:true},
  },
  botanicalName: { type: String },
  imageUrl: { type: String },
  waterNeed: { type: String },
  lightNeed: { type: String },
  fertiliserSeason: [{ type: String }],
  description: { type: String },
});

const Plant = mongoose.models.Plant || mongoose.model("Plant", plantSchema);

export default Plant;
