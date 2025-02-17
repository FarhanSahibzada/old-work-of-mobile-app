import React from "react";



const Dashboard = () => {
  const allUsers = [
    {
      approvedUsers: "2200",
      activeUsers: "1800",
      unapprovedUsers: "200",
      totalEarnings: "3335.35",
    },
  ];
  const allRiders = [
    {
      approvedRiders: "1200",
      activeRiders: "1100",
      unapprovedRiders: "100",
      totalEarnings: "1335.35",
    },
  ];
  const allDrivers = [
    {
      approvedDrivers: "800",
      activeDrivers: "750",
      unapprovedDrivers: "0",
      totalEarnings: "1735.35",
    },
  ];
  return (
    <div className="">
      <div className="flex flex-row  bg-slate-400 min-h-screen">
        <div className="flex flex-col px-4">
          <div className="font-bold">All Users</div>
       
        {allUsers.map((allUser, index) => (
          <ul key={index} className="flex gap-x-5 text-xs">
            <li className="bg-white  w-50 h-20 rounded-md p-3 shadow-2xl">
              Approved USers
              <h4 className="mt-3 font-bold">{allUser.approvedUsers}</h4>
            </li>
            <li className="bg-white w-50 h-20 rounded-md p-3 shadow-2xl">
              Active Users
              <h4 className="mt-3 font-bold">{allUser.activeUsers}</h4>
            </li>
            <li className="bg-white w-50 h-20 rounded-md p-3 shadow-2xl">
              Unapproved Users
              <h4 className="mt-3 font-bold">{allUser.unapprovedUsers}</h4>
            </li>
            <li className="bg-white w-50 h-20 rounded-md p-3 shadow-2xl">
              Total Earning
              <h4 className="mt-3 font-bold">Rs. {allUser.totalEarnings}</h4>
            </li>
          </ul>
        ))}
        <div>
          <div className=" font-bold mt-6">Riders</div>
        </div>
        {allRiders.map((allRider, index) => (
          <ul key={index} className="flex gap-x-5 text-xs">
            <li className="bg-white  w-50 h-20 rounded-md p-3 shadow-2xl">
              Approved Riders
              <h4 className="mt-3 font-bold">{allRider.approvedRiders}</h4>
            </li>
            <li className="bg-white w-50 h-20 rounded-md p-3 shadow-2xl">
              Active Riders
              <h4 className="mt-3 font-bold">{allRider.activeRiders}</h4>
            </li>
            <li className="bg-white w-50 h-20 rounded-md p-3 shadow-2xl">
              Unapproved Riders
              <h4 className="mt-3 font-bold">{allRider.unapprovedRiders}</h4>
            </li>
            <li className="bg-white w-50 h-20 rounded-md p-3 shadow-2xl">
              Earning
              <h4 className="mt-3 font-bold">Rs. {allRider.totalEarnings}</h4>
            </li>
          </ul>
        ))}
        <div>
          <div className="font-bold mt-6">Drivers</div>
        </div>
        {allDrivers.map((allDriver, index) => (
          <ul key={index} className="flex gap-x-5 text-xs">
            <li className="bg-white  w-50 h-20 rounded-md p-3 shadow-2xl">
              Approved Users
              <h4 className="mt-3 font-bold">{allDriver.approvedDrivers}</h4>
            </li>
            <li className="bg-white w-50 h-20 rounded-md p-3 shadow-2xl">
              Active Users
              <h4 className="mt-3 font-bold">{allDriver.activeDrivers}</h4>
            </li>
            <li className="bg-white w-50 h-20 rounded-md p-3 shadow-2xl">
              Unapproved Users
              <h4 className="mt-3 font-bold">{allDriver.unapprovedDrivers}</h4>
            </li>
            <li className="bg-white w-50 h-20 rounded-md p-3 shadow-2xl">
              {" "}
              Earning
              <h4 className="mt-3 font-bold">Rs. {allDriver.totalEarnings}</h4>
            </li>
          </ul>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
