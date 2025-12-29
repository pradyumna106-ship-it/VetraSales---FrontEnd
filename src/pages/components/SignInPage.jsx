import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

/* Dummy users (UI only – no API) */
const users = {
  admin: {
    username: "pradyumna",
    password: "admin123",
    role: "admin",
  },
  customer: {
    username: "customer",
    password: "customer123",
    role: "customer",
  },
};

export default function SignInPage({ onLogin,onBack }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "admin",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users[formData.role];

    if (
      user &&
      user.username === formData.username &&
      user.password === formData.password
    ) {
      onLogin({
        username: user.username,
        role: user.role,
      });
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>
        <Button
        onClick={onBack}
        className="mb-4 bg-gray-300 hover:bg-gray-400 text-black"
      >
        ← Back
      </Button>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div>
              <Label>Username</Label>
              <Input
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Role */}
            <div>
              <Label>Login As</Label>
              <div className="flex gap-6 mt-2">
                <Label className="flex items-center gap-2">
                  <Input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === "admin"}
                    onChange={handleChange}
                  />
                  Admin
                </Label>

                <Label className="flex items-center gap-2">
                  <Input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={formData.role === "customer"}
                    onChange={handleChange}
                  />
                  Customer
                </Label>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            {/* Submit */}
            <Button type="submit" className="w-full">
              Sign In
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
