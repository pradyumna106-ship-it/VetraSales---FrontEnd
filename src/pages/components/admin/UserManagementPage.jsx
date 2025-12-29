import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import CustomerTable from "./CustomerTable";
import { Button } from "../ui/button";
export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState("employees");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b">
        <Button
          onClick={() => setActiveTab("employees")}
          className={`pb-2 font-medium ${
            activeTab === "employees"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Employees
        </Button>

        <Button
          onClick={() => setActiveTab("customers")}
          className={`pb-2 font-medium ${
            activeTab === "customers"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Customers
        </Button>
      </div>
      {/* Content */}
      {activeTab === "employees" ? <EmployeeTable /> : <CustomerTable />}
    </div>
  );
}
