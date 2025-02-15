import express from "express";
import dotenv from "dotenv";
import RidesModel from "../Models/RiderRides.js";
import sendResponse from "../Helpers/SendResponse.js";
import ClientModel from "../Models/Users.js";
dotenv.config(); // Load .env file

const ridesRoutes = express.Router();

ridesRoutes.post("/rider", async (req, res) => {
  try {
    const { userID, availableSeats, expense, from, to } = req.body;
    let newRide = RidesModel({ userID, availableSeats, expense, from, to });
    newRide = await newRide.save();
    sendResponse(res, 200, newRide, false, "Ride Added Successfully");
  } catch (error) {
    sendResponse(res, 404, null, true, error.message);
  }
});

//for finding similar rides with gender specification
ridesRoutes.post("/user", async (req, res) => {
  try {
    const { userID, from, to } = req.body;
    const user = await ClientModel.findById(userID);
    const userFrom = from;
    const userTo = to;
    const availableRides = await RidesModel.find({
      from: userFrom,
      to: userTo,
    });
    if (!availableRides) {
      return sendResponse(res, 400, null, true, "No Rides Available");
    }
    const riderdata = availableRides.map((data) => data.userID);
    const matchedRides = await ClientModel.find({
      _id: { $in: riderdata },
      gender: user.gender,
    });
    const ridersID = matchedRides.map((data) => data.id);
    const rideExpense = await RidesModel.find({
      userID: { $in: ridersID },
    });
    sendResponse(res, 200, { matchedRides, user, rideExpense }, false, "Rides Found");
  } catch (error) {
    sendResponse(res, 404, null, true, error.message);
  }
});

export default ridesRoutes;
