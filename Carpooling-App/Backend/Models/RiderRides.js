import mongoose from "mongoose";
const { Schema } = mongoose;

const RidesSchema = new Schema(
  {
    userID: { type: String },
    from: { type: String },
    to: { type: String },
  },
  { timestamps: true }
);

const RidesModel =
  mongoose.models.Rides || mongoose.model("Rides", RidesSchema);

export default RidesModel;
