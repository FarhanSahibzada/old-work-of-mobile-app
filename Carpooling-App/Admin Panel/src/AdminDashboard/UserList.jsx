import axios from "axios";
import React, { useEffect, useState } from "react";
import { AppRoutes } from "../constant/Constant";
const UserList = () => {
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get(AppRoutes.getAllUser);
        setUsers(res.data.data);
        console.log(Users);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <div className="px-4 bg-slate-400 min-h-screen">
      <div className="font-bold text-2xl  flex flex-row text-slate-900 justify-between">
        <span>
        User List
        </span>
        <span className="text-sm mr-10 items-center justify-center">Total Users :{Users.length} </span>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-gray-900 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                S no.
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                Contact
              </th>
              <th scope="col" className="px-6 py-3">
                CNIC
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Users.map((data, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">{index + 1}.</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.name}
                </th>
                <td className="px-6 py-4">{data.email}</td>
                <td className="px-6 py-4">{data.role}</td>
                <td className="px-6 py-4">{data.phoneNumber}</td>
                <td className="px-6 py-4">{data.nicNo}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
