// ActiveDriver.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActiveDriver = () => {
  const navigate = useNavigate();

  const drivers = [
    { user: 'ibrahim', driver: 'ali', location: 'Location A' },
    { user: 'bilal', driver: 'ather', location: 'Location B' },
    { user: 'arsalan', driver: 'farhan', location: 'Location C' },
  ];

  return (
    <div>
      {/* Main Content */}
      <div className="flex flex-col px-4 bg-slate-400 min-h-screen">
        {/* Title */}
        <h1 className="text-2xl font-bold  text-slate-900">Active Drivers</h1>
        {/* Table */}
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-6 py-2 text-left">Driver</th>
                <th className="px-6 py-2 text-left">User</th>
                <th className="px-6 py-2 text-left">Live Location</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4">{driver.driver}</td>
                  <td className="px-6 py-4">{driver.user}</td>
                  <td className="px-6 py-4">{driver.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ActiveDriver;
