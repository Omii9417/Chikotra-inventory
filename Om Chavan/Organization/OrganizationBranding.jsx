import React, { useState } from 'react';
import './OrganizationBranding.css';

const OrganizationBranding = () => {
  const [appearance, setAppearance] = useState('dark');
  const [accentColor, setAccentColor] = useState('blue');
  const [ChikotraBranding, setChikotraBranding] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogoFile(file);
  };

  const getComputedColor = (colorName) => {
    const colorMap = {
      blue: '#007bff',
      green: '#28a745',
      red: '#dc3545',
      orange: '#fd7e14',
      purple: '#6f42c1',
    };
    return colorMap[colorName] || '#007bff';
  };

  return (
    <div
      className="branding-container"
      style={{ '--theme-color': getComputedColor(accentColor) }}
    >
      <h2 style={{ color: 'var(--theme-color)' }}>Branding</h2>

      {/* Organization Logo Upload */}
      <div className="section">
        <label className="section-title">Organization Logo</label>
        <div className="logo-upload">
          <input
            type="file"
            id="logoInput"
            accept=".jpg, .jpeg, .png, .gif, .bmp"
            onChange={handleLogoUpload}
          />
          <label htmlFor="logoInput" className="upload-label">
            📤 Upload Your Organization Logo
          </label>
          <p className="note">
            This logo will be displayed in transaction PDFs and email notifications.
            <br />
            Preferred Image Dimensions: 240 × 240 pixels @ 72 DPI <br />
            Supported Files: jpg, jpeg, png, gif, bmp <br />
            Max File Size: 1MB
          </p>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="section">
        <label className="section-title">Appearance</label>
        <div className="appearance-options">
          <div
            className={`appearance-card ${appearance === 'dark' ? 'selected' : ''}`}
            onClick={() => setAppearance('dark')}
          >
            🌙 <br /> DARK PANE
          </div>
          <div
            className={`appearance-card ${appearance === 'light' ? 'selected' : ''}`}
            onClick={() => setAppearance('light')}
          >
            ☀️ <br /> LIGHT PANE
          </div>
        </div>
      </div>

      {/* Accent Color Section */}
      <div className="section">
        <label className="section-title">Accent Color</label>
        <div className="color-options">
          {['blue', 'green', 'red', 'orange', 'purple'].map((color) => (
            <button
              key={color}
              className={`color-button ${color} ${accentColor === color ? 'selected' : ''}`}
              onClick={() => setAccentColor(color)}
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </button>
          ))}
        </div>
        <p className="note">
          These preferences will be applied across Chikotra Finance apps, including the Customer Portal.
        </p>
      </div>

      {/* Branding Switch */}
      <div className="section">
        <label className="section-title">
          I'd like to keep Chikotra branding for this organization
        </label>
        <div className="toggle-container">
          <label className="switch">
            <input
              type="checkbox"
              checked={ChikotraBranding}
              onChange={() => setChikotraBranding(!ChikotraBranding)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <p className="note">
          Retain non-obtrusive Chikotra Branding, visible to your customers in transactional emails and PDFs.
        </p>
      </div>
    </div>
  );
};

export default OrganizationBranding;
