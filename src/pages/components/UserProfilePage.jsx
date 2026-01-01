import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { userData } from "../services/userService";
/* Default user data (NO API) */

export function UserProfile({ username }) {
  const [formData, setFormData] = useState({
  username: "",
  email: "",
  phone: "",
  location: "",
  gender: "",
  role: "",
  dob: "",
  password: {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  },
});
  const [passwordData, setPasswordData] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const [passwordError, setPasswordError] = useState("");
useEffect(() => {
  if (!username) return;

  const loadUserData = async () => {
    try {
      const data = await userData(username);
      console.log("User Data:", data);

      setFormData({
        username: data.username || "",
        email: data.email || "",
        phone: data.phone || "",
        location: data.location || "",
        gender: data.gender || "",
        role: data.role || "",
        dob: data.dob || "",
        password: {
          currentPassword: data.password || "",
          newPassword: "",
          confirmPassword: "",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  loadUserData();
}, [username]);


const handlePasswordChange = (e) => {
  const { name, value } = e.target;
  setPasswordData((prev) => ({ ...prev, [name]: value }));

  // Real-time validation
  if (name === "confirmPassword" || name === "newPassword") {
    if (
      name === "confirmPassword" &&
      value !== passwordData.newPassword
    ) {
      setPasswordError("Passwords do not match!");
    } else if (
      name === "newPassword" &&
      passwordData.confirmPassword &&
      value !== passwordData.confirmPassword
    ) {
      setPasswordError("Passwords do not match!");
    } else {
      setPasswordError("");
    }
  }
};

const handlePasswordSubmit = () => {
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    setPasswordError("Passwords do not match!");
    return;
  }
  setPasswordError("");
  alert("Password updated successfully!");
  // Add API call here if needed
};


  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* ================= PROFILE CARD ================= */}
        <Card>
        <CardHeader>
            <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-6">
            <Avatar className="h-24 w-24">
                <AvatarImage src="/avatar.png" />
                    <AvatarFallback>
                        {(formData?.username && formData.username.length > 0) ? formData.username[0].toUpperCase(): "U"}
</AvatarFallback>

            </Avatar>
            <div className="grid grid-cols-2 gap-4 flex-1">

  <div>
    <Label>Name</Label>
    <Input value={formData.username} readOnly />
  </div>

  <div>
    <Label>Email</Label>
    <Input value={formData.email} readOnly />
  </div>

  <div>
    <Label>Phone</Label>
    <Input value={formData.phone} readOnly />
  </div>

  <div>
    <Label>Location</Label>
    <Input value={formData.location} readOnly />
  </div>

  {/* ================= ROLE (RADIO) ================= */}
  <div>
    <Label>Role</Label>
    <div className="flex gap-6 mt-2">
      <Label className="flex items-center gap-2">
        <Input
          type="radio"
          name="role"
          checked={formData.role === "CUSTOMER"}
          readOnly
        />
        Customer
      </Label>

      <Label className="flex items-center gap-2">
        <Input
          type="radio"
          name="role"
          checked={formData.role === "ADMIN"}
          readOnly
        />
        Admin
      </Label>
    </div>
  </div>

  {/* ================= GENDER (RADIO) ================= */}
  <div>
    <Label>Gender</Label>
    <div className="flex gap-6 mt-2">
      <Label className="flex items-center gap-2">
        <Input
          type="radio"
          name="gender"
          checked={formData.gender === "MALE"}
          readOnly
        />
        Male
      </Label>

      <Label className="flex items-center gap-2">
        <Input
          type="radio"
          name="gender"
          checked={formData.gender === "FEMALE"}
          readOnly
        />
        Female
      </Label>

      <Label className="flex items-center gap-2">
        <Input
          type="radio"
          name="gender"
          checked={formData.gender === "OTHER"}
          readOnly
        />
        Other
      </Label>
    </div>
  </div>

  <div>
    <Label>Date of Birth</Label>
    <Input type="date" value={formData.dob} readOnly />
  </div>

  {/* ================= PASSWORD SECTION ================= */}
    <div className="col-span-2 mt-4">
        <Label className="font-semibold">Change Password</Label>
        <div className="grid grid-cols-1 gap-4 mt-2">
            <Input
  type="password"
  name="currentPassword"
  placeholder="Current Password"
  value={formData.password|| passwordData.currentPassword}
  onChange={handlePasswordChange}
  readOnly
/>

<Input
  type="password"
  name="newPassword"
  placeholder="New Password"
  value={passwordData.newPassword}
  onChange={handlePasswordChange}
  readOnly
/>

<Input
  type="password"
  name="confirmPassword"
  placeholder="Confirm Password"
  value={passwordData.confirmPassword}
  onChange={handlePasswordChange}
  readOnly
/>

{passwordError && (
  <p className="text-red-600 text-sm">{passwordError}</p>
)}

        </div>
    </div>
  {/* ================= ACTION BUTTONS ================= */}
  <div className="col-span-2 flex gap-4 mt-4">
    <Button>Update Profile</Button>
    <Button className="bg-red-600 hover:bg-red-700 text-white">
      Delete Profile
    </Button>
  </div>

</div>

        </CardContent>
      </Card>

      {/* ================= RECENT ACTIVITY ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>{formData.joinedDat}</TableCell>
                <TableCell>Order Placed</TableCell>
                <TableCell className="text-green-600">
                  Completed
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>22 Dec 2025</TableCell>
                <TableCell>Password Changed</TableCell>
                <TableCell className="text-blue-600">
                  Success
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
