import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });

  // ✅ Fetch users from port 5000
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit new user to port 5000
  const handleSubmit = async () => {
    try {
      const newUser = {
        ...formData,
        id: Date.now(),
      };
      await axios.post("http://localhost:5000/users", newUser);
      setFormData({ name: "", email: "", role: "", status: "Active" });
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      console.error("Submit error:", err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>Users</h2>
        <button onClick={() => setShowForm(true)}>+ Add User</button>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ROLE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>New User</h3>

            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />

            <label>Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />

            <label>Role</label>
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Enter role (e.g. Admin)"
            />

            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <div className="modal-actions">
              <button onClick={handleSubmit}>Save</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
