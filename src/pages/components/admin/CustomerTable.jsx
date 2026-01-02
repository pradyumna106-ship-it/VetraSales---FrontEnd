import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { getAllCustomer } from "../../services/userService";

export default function CustomerTable({onViewProfile,onViewOrders,onViewReviews}) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await getAllCustomer();
        console.log("Api of Customers:", response);

        // ✅ Axios-safe
        setCustomers(response || []);
      } catch (error) {
        console.error("Failed to load customers", error);
        setCustomers([]);
      }
    };

    loadCustomers();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No customers found
              </TableCell>
            </TableRow>
          ) : (
            customers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>

                {/* Status Badge */}
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.status?.toLowerCase() === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>

                {/* Actions */}
                <TableCell className="flex gap-3">
                  <Button className="text-blue-600 hover:underline" onClick={() => onViewProfile(user)}>
                    Profile
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
