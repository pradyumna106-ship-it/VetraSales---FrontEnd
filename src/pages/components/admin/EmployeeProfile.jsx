import React, { useState, useEffect } from "react";
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
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getByAdmin } from "../../services/productService";


export default function EmployeeProfile({
  employee,
  onBack,
  onDisable,
  onUpdateEmployee, // 🔹 callback
}) {
  if (!employee) return null;

  const [productsAdded, setProductsAdded] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    username: employee.username || "",
    email: employee.email || "",
    phone: employee.phone || "",
    role: employee.role || "",
    status: employee.status || "",
  });

  /* ✅ FIXED useEffect */
  useEffect(() => {
    if (employee?.id) {
      loadProducts(employee.id);
    }
  }, [employee?.id]);

  const loadProducts = async (id) => {
    try {
      const res = await getByAdmin(id);
      setProductsAdded(res || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdateEmployee({ ...employee, ...formData });
    setIsEditing(false);
  };

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

            {!isEditing ? (
              <Button
                variant="outline"
                className="text-yellow-600"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            ) : (
              <Button
                className="bg-green-600 text-white"
                onClick={handleSave}
              >
                Save
              </Button>
            )}

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
            {[
              { label: "Username", name: "username" },
              { label: "Email", name: "email" },
              { label: "Phone", name: "phone" },
              { label: "Role", name: "role" },
              { label: "Status", name: "status" },
            ].map((field) => (
              <div key={field.name}>
                <Label>{field.label}</Label>
                <Input
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>
            ))}

            <div>
              <Label>Joined On</Label>
              <Input value={employee.joinedDate || "-"} readOnly={!isEditing} />
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
                <TableHead>Stock</TableHead>
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
                    <TableCell
                      className={
                        product.inStock ? "bg-green-300" : "bg-red-300"
                      }
                    >
                      {product.inStock ? "AVAILABLE" : "NOT AVAILABLE"}
                    </TableCell>
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
