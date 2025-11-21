import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // Fetch all users on page load
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    axios
      .get("http://localhost:8080/api/user/getAllUser")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to load users:", err));
  };

  const handleSearch = () => {
    if (search.trim() === "") {
      loadUsers();
      return;
    }
    axios
      .get("http://localhost:8080/api/user/searchUser", {
        params: { name: search },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Search failed:", err));
  };

  const deleteUser = (id) => {
    axios
      .get("http://localhost:8080/api/user/delete", { params: { id } })
      .then(() => loadUsers())
      .catch((err) => console.error("Delete failed:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
        <button onClick={() => navigate('/admin_page')}>
        Back
        </button>
      <h2>User Management</h2>

      {/* Search Bar */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            marginRight: "10px",
            borderRadius: "4px",
            border: "1px solid gray",
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Users Table */}
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr style={{ background: "#0d6efd", color: "white" }}>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.dob}</td>
              <td>{u.gender}</td>
              <td>{u.role}</td>
              <td>
                <button
                  onClick={() => deleteUser(u.id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
