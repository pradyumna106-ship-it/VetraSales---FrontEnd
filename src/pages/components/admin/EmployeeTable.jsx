import { useState, useEffect } from "react";
import { getAllAdmin } from "../../services/userService";
export default function EmployeeTable() {
  const [employees,setEmployees] = useState([]);
  useEffect(() => {
    const loadEmployees = async () => {
        const data = await getAllAdmin();
        console.log("Api of Employees:", data); // 👈 DEBUG
        setEmployees(data);
      };
      loadEmployees();
  },[])

  return (
    <div className="bg-white shadow rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="border-t">
              <td className="p-3">{emp.username}</td>
              <td className="p-3">{emp.role}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    emp.status.toLowerCase() === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {emp.status}
                </span>
              </td>
              <td className="p-3 flex gap-2">
                <button className="text-blue-600 hover:underline">View</button>
                <button className="text-yellow-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Disable</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
