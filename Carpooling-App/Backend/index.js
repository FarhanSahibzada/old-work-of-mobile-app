import express from "express";
import mongoose from "./ConnectDB/dbConnection.js";
import cors from "cors";
import "dotenv/config";
import userRouter from "./Routes/UserRoutes.js";
import ridesRoutes from "./Routes/RidesRoutes.js";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
// const port = 4000;
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});
const port = process.env.PORT || 4000; // use process.env.PORT for Vercel

// for mongo db connection
mongoose.connection.on("error", (err) => {
  console.log("Error in connection", err);
});

mongoose.connection.on("open", () => {
  console.log("MongoDB is connected successfully");
});


const connectedDriver = {}
const connectedUser = {}

io.on("connection", (socket) => {
  socket.on("driver-register", (payload) => {
    console.log("driversocket id " , socket.id)
    console.log("payload form frontend ==> ", payload.driverId)
    connectedDriver[payload?.driverId] = socket?.id;
  });

  socket.on('request-ride', (payload) => {
    console.log("clientsocket id " , socket.id)
    connectedUser[payload?.clientId] = socket.id;
    const driverAvailable = connectedDriver[payload?.driverId]
    if (driverAvailable) {
      io.to(driverAvailable).emit("ride-request", { payload })
    } else {
      socket.emit("driver-available", { message: "Driver is offline" });
    }
  })

  socket.on('reject-ride', ({ userId }) => {
    const existingUser = connectedUser[userId]
    if (existingUser) {
      io.to(existingUser).emit("promise", { message: "reject" })
      delete connectedUser[userId];
    }
  })

  socket.on("Accept-ride", (payload) => {
    const existingUser = connectedUser[payload?.clientId]
    if (existingUser) {
      console.log("exist user", existingUser)
      io.to(existingUser).emit("ride-accept", { payload })
    } else {
      socket.emit("user-offline", { message: "user is offline" })
    }
  })

  socket.on("update-driver-location", (payload)=>{
    const connectuser = connectedUser[payload?.clientId]
    if(connectuser){
      socket.to(connectuser).emit("update-location" , {payload})
    }
  })

  // socket.on('disconnect', () => {
  //   Object.keys(connectedDriver).forEach((driverId) => {
  //     if (connectedDriver[driverId] === socket.id) {
  //       delete connectedDriver[driverId];
  //       console.log(`Driver ${driverId} disconnected.`);
  //     }
  //   })
  // })

});

// main page message
app.get("/", (req, res) => {
  res.send("Welcome TO SHARING CAB");
});

app.use(cors()); // Enable CORS for all routes  
app.use(express.json()); // This will allow us to handle JSON bodies

app.use("/user", userRouter);
app.use("/rides", ridesRoutes);

server.listen(port, () => {
  console.log("server is running on port : ", port);
});
