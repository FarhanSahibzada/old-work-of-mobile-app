import express from "express";
import dotenv from "dotenv";
import RidesModel from "../Models/RiderRides.js";
import sendResponse from "../Helpers/SendResponse.js";
import ClientModel from "../Models/Users.js";
dotenv.config(); // Load .env file

const ridesRoutes = express.Router();


ridesRoutes.post("/rider", async (req, res) => {
  try {
    const { userID, availableSeats, farePerSeat, routes } = req.body;
    let newRide = RidesModel({ userID, availableSeats, farePerSeat, routes });
    newRide = await newRide.save();
    sendResponse(res, 200, newRide, false, "Ride Added Successfully");
  } catch (error) {
    sendResponse(res, 404, null, true, error.message);
  }
});


// for finding similar rides with gender specification
ridesRoutes.post("/user", async (req, res) => {
  try {
    const { userID, from, to } = req.body;
    const user = await ClientModel.findById(userID);
    const results = await RidesModel.find({
      "routes": {
        $elemMatch: {
          "latitude": { $gte: from.latitude - 0.01, $lte: from.latitude + 0.01 },  // +-0.01 tolerance for lat
          "longitude": { $gte: from.longitude - 0.01, $lte: from.longitude + 0.01 } // +-0.01 tolerance for longitude
        }
      }
    })
    if(!results || results.length == 0) return sendResponse(res, 403, null, true, "Ride Not Available")
      const matchingTo = results.filter(item =>
    item.routes.some(route =>
      route.latitude >= to.latitude - 0.01 && route.latitude <= to.latitude + 0.01 &&
      route.longitude >= to.longitude - 0.01 && route.longitude <= to.longitude + 0.01
    )
  );
  if(!matchingTo || matchingTo.length == 0) return sendResponse(res, 400, null, true, "Ride Not Available")
  const riderdata = matchingTo.map((data) => data.userID);
    const matchedRides = await ClientModel.find({
      _id: { $in: riderdata },
      gender: user.gender,
    });
    const ridersID = matchedRides.map((data) => data.id);
    const rideExpense = await RidesModel.find({
      userID: { $in: ridersID },
    })
    sendResponse(res, 200, {matchedRides, user, rideExpense}, false, "Rides Found");
  } catch (error) {
    sendResponse(res, 404, null, true, error.message);
  }
});


export default ridesRoutes;
