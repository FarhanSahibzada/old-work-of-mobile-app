import mongoose from "mongoose";
const { Schema } = mongoose;

const RidesSchema = new Schema(
  {
    userID: { type: String, required: true },
    availableSeats: { type: String },
    expense : {type : String},
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  { timestamps: true }
);

const RidesModel =
  mongoose.models.Rides || mongoose.model("Rides", RidesSchema);

export default RidesModel;
