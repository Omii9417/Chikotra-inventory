import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewCustomField.css';


function NewCustomField() {
  const [formData, setFormData] = useState({
    fieldName: '',
    dataType: '',
    mandatory: false,
    showInPDF: false,
    status: 'Active',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/customFields', formData);
    navigate('/settings/users/preferences'); // Redirect after save
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Custom Field</h2>
      <input name="fieldName" placeholder="Field Name" onChange={handleChange} required />
      <select name="dataType" onChange={handleChange}>
        <option value="">Select Type</option>
        <option value="Text">Text</option>
        <option value="Number">Number</option>
      </select>
      <label>
        <input type="checkbox" name="mandatory" onChange={handleChange} />
        Mandatory
      </label>
      <label>
        <input type="checkbox" name="showInPDF" onChange={handleChange} />
        Show in all PDFs
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default NewCustomField;
