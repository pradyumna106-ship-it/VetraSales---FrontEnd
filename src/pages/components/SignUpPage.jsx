import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function SignUpPage({onBack}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "Customer",
    gender: "Male",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (
      (name === "password" || name === "confirmPassword") &&
      formData.confirmPassword &&
      formData.password !== value
    ) {
      setPasswordError("Passwords do not match!");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    setPasswordError("");
    console.log("Sign Up Data:", formData);
    alert("Sign Up successful!");
    // API call goes here
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <Button
        onClick={onBack}
        className="mb-4 bg-gray-300 hover:bg-gray-400 text-black"
      >
        ← Back
      </Button>
        <CardContent className="flex gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback>
              {formData.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-4 flex-1"
          >
            <div>
              <Label>Name</Label>
              <Input name="name" onChange={handleChange} required />
            </div>

            <div>
              <Label>Email</Label>
              <Input name="email" type="email" onChange={handleChange} required />
            </div>

            <div>
              <Label>Phone</Label>
              <Input name="phone" onChange={handleChange} />
            </div>

            <div>
              <Label>Location</Label>
              <Input name="location" onChange={handleChange} />
            </div>

            {/* Role */}
            <div>
              <Label>Role</Label>
              <div className="flex gap-4 mt-2">
                {["Customer", "Admin"].map((r) => (
                  <Label key={r} className="flex items-center gap-2">
                    <Input
                      type="radio"
                      name="role"
                      value={r}
                      checked={formData.role === r}
                      onChange={handleChange}
                    />
                    {r}
                  </Label>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div>
              <Label>Gender</Label>
              <div className="flex gap-4 mt-2">
                {["Male", "Female", "Other"].map((g) => (
                  <Label key={g} className="flex items-center gap-2">
                    <Input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                    />
                    {g}
                  </Label>
                ))}
              </div>
            </div>

            <div>
              <Label>Date of Birth</Label>
              <Input type="date" name="dob" onChange={handleChange} />
            </div>

            {/* Password */}
            <div className="col-span-2">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-span-2">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                required
              />
              {passwordError && (
                <p className="text-red-600 mt-1">{passwordError}</p>
              )}
            </div>

            <div className="col-span-2 mt-4">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
