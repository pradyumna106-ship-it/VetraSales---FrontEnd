import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { signIn } from "../services/userService";

export default function SignInPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem('username', formData.username);
    try {
      const response = await signIn(formData);
      const role = response.data.toLowerCase(); // admin / customer
      console.log("role: ",role)
      const user = {
        username: formData.username,
        role,
      };

      // ✅ persist login (refresh-safe)
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ role-based routing
      if (role === "admin") {
        navigate("/admin_page");
      } else if (role === "customer") {
        navigate("/customer_page");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid username or password"
      );
    } finally {
      setLoading(false);
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

        <CardContent>
          <Button
            onClick={() => navigate("/")}
            className="mb-4 bg-gray-300 hover:bg-gray-400 text-black"
          >
            ← Back
          </Button>

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

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
