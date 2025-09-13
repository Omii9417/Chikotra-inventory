import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserPreferences.css';

function UserPreferences() {
  const [customFields, setCustomFields] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/customFields')
      .then(res => setCustomFields(res.data));
  }, []);

  return (
    <div className="user-preferences">
      <div className="header">
        <h2>User Preferences</h2>
        <button onClick={() => navigate('/settings/preferences/new-custom-field')}>
          + New Custom Field
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Field Name</th>
            <th>Data Type</th>
            <th>Mandatory</th>
            <th>Show in PDF</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {customFields.map(field => (
            <tr key={field.id}>
              <td>{field.fieldName}</td>
              <td>{field.dataType}</td>
              <td>{field.mandatory ? 'Yes' : 'No'}</td>
              <td>{field.showInPDF ? 'Yes' : 'No'}</td>
              <td>{field.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserPreferences;
