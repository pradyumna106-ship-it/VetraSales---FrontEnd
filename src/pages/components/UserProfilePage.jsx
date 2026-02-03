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
import { toggleStatus } from "../services/userService";
/* Default user data (NO API) */
import { useNavigate } from "react-router-dom";
export function UserProfile({ username }) {
  const [recentActivity, setRecentActivity] = useState([]);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const onNav = useNavigate();
  useEffect(() => {
    setRecentActivity([
      {
        date: "2025-01-06",
        action: "Profile Updated",
        status: "SUCCESS",
        color: "text-green-600",
      },
      {
        date: "2025-01-04",
        action: "Password Changed",
        status: "SUCCESS",
        color: "text-blue-600",
      },
    ]);
  }, []);

  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    phone: "",
    location: "",
    gender: "",
    role: "",
    dob: "",
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
          id: data.id || "",
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

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm(
      formData.role === "ADMIN"
        ? "Deleting admin will remove all related stock data. Continue?"
        : "Are you sure you want to delete this profile?"
    );

    if (!confirmed) return;

    try {
      await deleteUser(id);
      alert("Profile deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };


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

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    try {
      await updateUser({
        id: formData.id,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      alert("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setPasswordError("Current password is incorrect");
    }
  };

  const handleLogout = () => {
    alert("Are you sure You wanted to Log Out.");
    localStorage.clear()
    onNav('/');
  }
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
          <CardTitle className="text-3xl md:text-4xl text-center block">User Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback>
              {(formData?.username && formData.username.length > 0) ? formData.username[0].toUpperCase() : "U"}
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
              <form id="password-form" onSubmit={handlePasswordSubmit} className="grid grid-cols-1 gap-4 mt-2">
                <Input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  readOnly={!isPasswordEdit}
                  autoComplete="current-password"
                />


                <Input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  readOnly={!isPasswordEdit}
                  autoComplete="new-password"
                />

                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  readOnly={!isPasswordEdit}
                  autoComplete="new-password"
                />

                {passwordError && (
                  <p className="text-red-600 text-sm">{passwordError}</p>
                )}

              </form>
            </div>
            {/* ================= ACTION BUTTONS ================= */}
            <div className="col-span-2 flex gap-4 mt-4">
              <Button onClick={() => setIsEdit(!isEdit)}>
                {isEdit ? "Edit Profile" : "Save Profile"}
              </Button>
                <Button onClick={() => handleLogout()} className="bg-red-600 hover:bg-red-700 text-white"> Logout</Button>
              <Button
                type="submit"
                form="password-form"
                disabled={!isPasswordEdit}
              >
                Update Password
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDeleteUser(formData.id)}>
                Delete Profile
              </Button>
            </div>

          </div>

        </CardContent>
      </Card>

    </div>
  );
}
