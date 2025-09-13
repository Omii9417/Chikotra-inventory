import React, { useState } from 'react';
import './OrganizationProfile.css';

const OrganizationProfile = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    industry: 'Web Development',
    location: 'India',
    address1: '',
    address2: '',
    city: '',
    pin: '',
    phone: '',
    website: '',
    email: '',
    baseCurrency: 'INR',
    fiscalYear: 'April - March',
    language: 'English',
    timeZone: 'GMT+5:30 India Standard Time',
    dateFormat: 'DD/MM/YYYY',
    companyId: '',
    taxId: '',
    additionalFieldLabel: '',
    additionalFieldValue: '',
    showInProfile: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully!');
    console.log(formData);
  };

  return (
    <div className="profile-page">
      <h2>Organization Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="section">
          <label>Organization Name</label>
          <input name="organizationName" value={formData.organizationName} onChange={handleChange} />

          <label>Industry</label>
          <select name="industry" value={formData.industry} onChange={handleChange}>
            <option value="Web Development">Web Development</option>
            <option value="IT Services">IT Services</option>
            <option value="Marketing">Marketing</option>
          </select>

          <label>Organization Location</label>
          <select name="location" value={formData.location} onChange={handleChange}>
            <option value="India">India</option>
            <option value="USA">USA</option>
          </select>

          <label>Address Line 1</label>
          <input name="address1" value={formData.address1} onChange={handleChange} />

          <label>Address Line 2</label>
          <input name="address2" value={formData.address2} onChange={handleChange} />

          <label>City</label>
          <input name="city" value={formData.city} onChange={handleChange} />

          <label>Pin Code</label>
          <input name="pin" value={formData.pin} onChange={handleChange} />

          <label>Phone</label>
          <input name="phone" value={formData.phone} onChange={handleChange} />

          <label>Website</label>
          <input name="website" value={formData.website} onChange={handleChange} />
        </div>

        <div className="section">
          <h3>Primary Contact</h3>
          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} />

          <label>Base Currency</label>
          <select name="baseCurrency" value={formData.baseCurrency} onChange={handleChange}>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>

          <label>Fiscal Year</label>
          <select name="fiscalYear" value={formData.fiscalYear} onChange={handleChange}>
            <option value="April - March">April - March</option>
            <option value="Jan - Dec">Jan - Dec</option>
          </select>

          <label>Language</label>
          <select name="language" value={formData.language} onChange={handleChange}>
            <option>English</option>
            <option>Hindi</option>
          </select>

          <label>Time Zone</label>
          <input name="timeZone" value={formData.timeZone} onChange={handleChange} />

          <label>Date Format</label>
          <input name="dateFormat" value={formData.dateFormat} onChange={handleChange} />

          <label>Company ID</label>
          <input name="companyId" value={formData.companyId} onChange={handleChange} />

          <label>Tax ID</label>
          <input name="taxId" value={formData.taxId} onChange={handleChange} />
        </div>

        <div className="section">
          <h3>Additional Fields</h3>
          <label>Label</label>
          <input name="additionalFieldLabel" value={formData.additionalFieldLabel} onChange={handleChange} />

          <label>Value</label>
          <input name="additionalFieldValue" value={formData.additionalFieldValue} onChange={handleChange} />

          <label>
            <input type="checkbox" name="showInProfile" checked={formData.showInProfile} onChange={handleChange} />
            Show this in Profile
          </label>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-save">Save</button>
          <button type="button" className="btn-cancel" onClick={() => alert('Cancelled')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default OrganizationProfile;
