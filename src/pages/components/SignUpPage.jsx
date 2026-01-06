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
import { Form } from "./ui/form";
import { signUp } from "../services/userService";
import { useNavigate } from "react-router-dom";
export default function SignUpPage() {
  const [formData, setFormData] = useState({
  username: "",
  email: "",
  phone: "",
  location: "",
  role: "CUSTOMER",
  gender: "MALE",
  dob: "",
  password: "",
  confirmPassword: "",
  joinedDate: new Date().toISOString().split("T")[0],
  status: "ACTIVE"
});

  const onNav = useNavigate()

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
      const { name, value } = e.target;

      let finalValue = value;

      // ✅ enum-safe normalization
      if (name === "role" || name === "gender") {
        finalValue = value.toUpperCase();
      }

      setFormData((prev) => ({
        ...prev,
        [name]: finalValue,
      }));

      // Password validation
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }
    setPasswordError("");
    
    console.log("Sign Up Data:", formData);
    const payload = {
        username: formData.username.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone,
        location: formData.location,
        gender: formData.gender,
        dob: formData.dob,
        role: formData.role,
        password: formData.password
      };


    // API call goes here
    try {
  const response = await signUp(payload);
  console.log("User signed up:", response.data);
  onNav('/sign_in_page')
} catch (error) {
  if (error.response?.status === 409) {
    alert("User already exists. Please use a different email or phone.");
  } else {
    console.error("Sign-up error:", error);
  }
}
    
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Button
        onClick={() => onNav('/')}
        className="mb-4 bg-gray-300 hover:bg-gray-400 text-black"
      >
        ← Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback>
              {formData.username?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-4 flex-1"
          >
            <div>
              <Label>Name</Label>
              <Input name="username" onChange={handleChange} required />
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
                {["CUSTOMER", "ADMIN"].map((r) => (
                  <Label key={r} className="flex items-center gap-2">
                  <Input  type="radio"  name="role"  value={r}  checked={formData.role === r}  onChange={handleChange}/>
                    {r.charAt(0) + r.slice(1).toLowerCase()}
                  </Label>
                    ))}
              </div>
            </div>

            {/* Gender */}
            <div>
              <Label>Gender</Label>
              <div className="flex gap-4 mt-2">
                {["MALE", "FEMALE", "OTHER"].map((g) => (
                  <Label key={g} className="flex items-center gap-2">
                    <Input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                    />
                    {g.charAt(0) + g.slice(1).toLowerCase()}
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
