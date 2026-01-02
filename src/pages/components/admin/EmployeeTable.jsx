import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { getAllAdmin } from "../../services/userService";

export default function EmployeeTable({onViewEmployee, onEditEmployee, onDisableEmployee}) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const loadEmployees = async () => {
      const response = await getAllAdmin();
      console.log("Api of Employees:", response);

      // 🔴 IMPORTANT: axios returns response.data
      setEmployees(response || []);
    };

    loadEmployees();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg">
      <Table className="w-full text-sm">

        {/* ✅ Correct header */}
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        {/* ✅ Body */}
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No employees found
              </TableCell>
            </TableRow>
          ) : (
            employees.map((emp) => (
              <TableRow key={emp.id} className="border-t">
                <TableCell>{emp.username}</TableCell>
                <TableCell>{emp.role}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      emp.status?.toLowerCase() === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {emp.status}
                  </span>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="link" onClick={() =>onViewEmployee(emp)}>View</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

      </Table>
    </div>
  );
}
