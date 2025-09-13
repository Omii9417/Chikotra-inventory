import React, { useEffect, useState } from 'react';
import './Roles.css';

function Roles() {
  const [roles, setRoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: '',
  });

  useEffect(() => {
    fetch('http://localhost:5000/roles')
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((error) => console.error('Error fetching roles:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/roles/${id}`, {
      method: 'DELETE',
    })
      .then(() => setRoles(roles.filter((role) => role.id !== id)))
      .catch((error) => console.error('Error deleting role:', error));
  };

  const handleAddRole = () => {
    const roleToAdd = {
      ...newRole,
      permissions: newRole.permissions.split(',').map(p => p.trim())
    };

    fetch('http://localhost:5000/roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roleToAdd),
    })
      .then((res) => res.json())
      .then((data) => {
        setRoles([...roles, data]);
        setShowForm(false);
        setNewRole({ name: '', description: '', permissions: '' });
      })
      .catch((error) => console.error('Error adding role:', error));
  };

  return (
    <div className="roles-container">
      <div className="roles-header">
        <h2>Roles</h2>
        <button className="new-role-button" onClick={() => setShowForm(!showForm)}>+ New Role</button>
      </div>

      {showForm && (
        <div className="new-role-form">
          <input
            type="text"
            placeholder="Role Name"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newRole.description}
            onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Permissions (comma-separated)"
            value={newRole.permissions}
            onChange={(e) => setNewRole({ ...newRole, permissions: e.target.value })}
          />
          <button className="submit-role-button" onClick={handleAddRole}>Add Role</button>
        </div>
      )}

      <table className="roles-table">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Description</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.description}</td>
              <td>{role.permissions?.join(', ')}</td>
              <td>
                <button className="action-btn edit-btn">Edit</button>
                <button className="action-btn clone-btn">Clone</button>
                <button className="action-btn delete-btn" onClick={() => handleDelete(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Roles;
