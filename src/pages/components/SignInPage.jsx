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
    const payload = {
      username: formData.username,
      password: formData.password
    };
    try {
      const response = await signIn(payload);
      const role = response.toLowerCase(); // admin / customer
      console.log("role: ",role)

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
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <div className="flex flex-col items-start gap-5">

          {/* Back Button */}
          <Button
            onClick={() => navigate("/")}
            className="bg-gray-300 hover:bg-gray-400 text-black"
          >
            ← Back
          </Button>

          {/* Sign In Card */}
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to continue
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label>Username</Label>
                    <Input
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
              </div>

                <div>
                    <Label>Password</Label>
                    <Input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                <Button type="submit" className="bg-blue-300 hover:bg-blue-400 text-black">
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>

            </div>
      </div>


  );
}
