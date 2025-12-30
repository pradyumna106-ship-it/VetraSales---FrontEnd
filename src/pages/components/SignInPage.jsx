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
import { signIn } from "../services/userService";

export default function SignInPage({ onLogin, onBack }) {
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
    try {
    const response = await signIn(formData);
    // Axios wraps the backend response inside 'data'
    const data = response.data;
    onLogin({
      username: formData.username, // use username from form
      role: data.role, // use role returned from backend
    });
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

        <Button
          onClick={onBack}
          className="mx-4 mb-4 bg-gray-300 hover:bg-gray-400 text-black"
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
