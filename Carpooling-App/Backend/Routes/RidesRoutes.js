import express from "express";
import dotenv from "dotenv";
import RidesModel from "../Models/RiderRides.js";
import sendResponse from "../Helpers/SendResponse.js";
dotenv.config(); // Load .env file

const ridesRoutes = express.Router();

ridesRoutes.post("/rider", async (req, res) => {
    try {
      const { userID, from, to } = req.body;
      let newRide = RidesModel({userID, from, to});
      newRide = await newRide.save();
      sendResponse(res, 200, null, false, "Ride Added Successfully");
    } catch (error) {
      sendResponse(res, 404, null, true, error.message);
    }
  });

ridesRoutes.get("/", async (req, res) => {});
ridesRoutes.put("/", async (req, res) => {});

export default ridesRoutes;
