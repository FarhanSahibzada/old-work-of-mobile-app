import mongoose from "mongoose";
const { Schema } = mongoose;

const RidesSchema = new Schema(
  {
    userID: { type: mongoose.Types.ObjectId, ref: "Users" },
    from: { type: Number },
    to: { type: Number },
  },
  { timestamps: true }
);

const RidesModel =
  mongoose.models.Rides || mongoose.model("Rides", RidesSchema);

export default RidesModel;
