import React,{useState} from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Avatar,
  AvatarFallback,
} from "../ui/avatar";
import { getByAdmin } from "../../services/productService";
export default function EmployeeProfile({
  employee,
  onBack,
  onEdit,
  onDisable,
}) {
  if (!employee) return null;

  const [productsAdded,setProductAdded] = useState([]); // SAFE

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* ================= EMPLOYEE PROFILE ================= */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Employee Profile</CardTitle>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onBack}>
              ← Back
            </Button>
            <Button
              variant="outline"
              className="text-yellow-600"
              onClick={() => onEdit(employee)}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              className="text-red-600"
              onClick={() => onDisable(employee)}
            >
              Disable
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex gap-6">
          <Avatar className="h-24 w-24">
            <AvatarFallback>
              {employee.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="grid grid-cols-2 gap-4 flex-1">
            <div>
              <Label>Username</Label>
              <Input value={employee.username} readOnly />
            </div>

            <div>
              <Label>Email</Label>
              <Input value={employee.email || "-"} readOnly />
            </div>

            <div>
              <Label>Role</Label>
              <Input value={employee.role} readOnly />
            </div>

            <div>
              <Label>Status</Label>
              <Input value={employee.status} readOnly />
            </div>

            <div>
              <Label>Phone</Label>
              <Input value={employee.phone || "-"} readOnly />
            </div>

            <div>
              <Label>Joined On</Label>
              <Input value={employee.joinedDate || "-"} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= PRODUCTS ADDED ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Products Added</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {productsAdded.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    No products added by this employee
                  </TableCell>
                </TableRow>
              ) : (
                productsAdded.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>{product.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
