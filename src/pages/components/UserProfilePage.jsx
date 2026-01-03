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
import { updateUser } from "../services/userService";
import { deleteUser } from "../services/userService";
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
    const [isEdit, setIsEdit] = useState(true);
    useEffect(() => {
      if (!username) return;
      const loadUserData = async () => {
        try {
          const data = await userData(username);
          console.log("User Data:", data);

          setFormData({
            id: data.id,
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
    
    const handleDeleteUser = (id) => {
      const loadDeleteUser = async (id) => {
        const res = await deleteUser(id);
        console.log(res)
      }
      try {
        loadDeleteUser(id);
        if (formData.role === "ADMIN") {
          alert("Are sure you want to delete If Admin Delete this Profile Entire Stock Data will be removed Which Current Admin is Added")
        } else {
          alert("Are you Sure you want to delete this profile")
        }
      } catch(error) {
        console.error(error);
      }
    }

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
      const payload = {
        id: formData.id,
        username: formData.username.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone,
        location: formData.location,
        gender: formData.gender,
        dob: formData.dob,
        role: formData.role,
        password: passwordData.newPassword
      };
      const loadUpdateUser = async (payload) => {
        const res = await updateUser(payload);
        console.log(res);
      }
      try {
        loadUpdateUser(payload)
      } catch (error) {
        console.error(error);
      }
    };

    const handleEditUser = () => {
      if (isEdit) {
        setIsEdit(false);
      } else {
        setIsEdit(true);
      }
    }

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
            <Input value={formData.username} readOnly={isEdit} />
          </div>

          <div>
            <Label>Email</Label>
            <Input value={formData.email} readOnly={isEdit} />
          </div>

          <div>
            <Label>Phone</Label>
            <Input value={formData.phone} readOnly={isEdit} />
          </div>

          <div>
            <Label>Location</Label>
            <Input value={formData.location} readOnly={isEdit} />
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
                  readOnly={isEdit}
                />
                Customer
              </Label>

              <Label className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  checked={formData.role === "ADMIN"}
                  readOnly={isEdit}
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
                  readOnly={isEdit}
                />
                Male
              </Label>

              <Label className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="gender"
                  checked={formData.gender === "FEMALE"}
                  readOnly={isEdit}
                />
                Female
              </Label>

              <Label className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="gender"
                  checked={formData.gender === "OTHER"}
                  readOnly={isEdit}
                />
                Other
              </Label>
            </div>
          </div>

          <div>
            <Label>Date of Birth</Label>
            <Input type="date" value={formData.dob} readOnly={isEdit} />
          </div>

          {/* ================= PASSWORD SECTION ================= */}
            <div className="col-span-2 mt-4">
                <Label className="font-semibold">Change Password</Label>
                <div className="grid grid-cols-1 gap-4 mt-2">
                    <Input
                      type="password"
                      name="currentPassword"
                      placeholder="Current Password"
                      value={(isEdit)?formData.password : passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      readOnly={isEdit}
                    />

        <Input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={passwordData.newPassword}
          onChange={handlePasswordChange}
          readOnly={isEdit}
        />

        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={passwordData.confirmPassword}
          onChange={handlePasswordChange}
          readOnly={isEdit}
        />

        {passwordError && (
          <p className="text-red-600 text-sm">{passwordError}</p>
        )}

                </div>
            </div>
          {/* ================= ACTION BUTTONS ================= */}
          <div className="col-span-2 flex gap-4 mt-4">
            {(isEdit)? <Button className="bg-grey-700 hover:bg-grey-900 text-black" onClick={() => handleEditUser()}>Update Profile</Button> : <Button className="bg-grey-700 hover:bg-grey-900 text-black" onClick={() => handlePasswordSubmit()}>Save</Button>}
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDeleteUser(formData.id)}>
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
