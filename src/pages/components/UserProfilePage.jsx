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

/* Default user data (NO API) */
const defaultUsers = {
  pradyumna: {
    name: "Pradyumna J Kumar",
    email: "pradyumna@example.com",
    phone: "+91 8431362112",
    location: "Bangalore",       // Customer | Admin
    gender: "Male",          // Male | Female | Other
    dob: "2001-08-25",        // YYYY-MM-DD
    joinedDate: "2024-01-15",
    status: "Active",

    // Password fields (for UI only)
    password: {
      currentPassword: "advjkjgfd",
      newPassword: "",
      confirmPassword: "",
    },
  },
};

export function UserProfile({ username,role }) {
  const user = defaultUsers[username];
  const [formData, setFormData] = useState(user);

    const [passwordData, setPasswordData] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const [passwordError, setPasswordError] = useState("");

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
                        {formData.name.charAt(0)}
                </AvatarFallback>
            </Avatar>
            <div className="grid grid-cols-2 gap-4 flex-1">

  <div>
    <Label>Name</Label>
    <Input value={formData.name} readOnly />
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
          checked={formData.role === "Customer"}
          readOnly
        />
        Customer
      </Label>

      <Label className="flex items-center gap-2">
        <Input
          type="radio"
          name="role"
          checked={formData.role === "Admin"}
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
          checked={formData.gender === "Male"}
          readOnly
        />
        Male
      </Label>

      <Label className="flex items-center gap-2">
        <Input
          type="radio"
          name="gender"
          checked={formData.gender === "Female"}
          readOnly
        />
        Female
      </Label>

      <Label className="flex items-center gap-2">
        <Input
          type="radio"
          name="gender"
          checked={formData.gender === "Other"}
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
            <Input type="password" placeholder="Current Password" value={formData.password.currentPassword} readOnly/>
            <Input type="password" placeholder="New Password" value={formData.password.newPassword} readOnly/>
            <Input type="password" placeholder="Confirm Password" value={formData.password.confirmPassword} readOnly/>
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
                <TableCell>20 Dec 2025</TableCell>
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
