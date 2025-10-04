import React, { useState } from 'react';
import './ReportingTags.css';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const ReportingTags = () => {
  const [tags, setTags] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [tagName, setTagName] = useState('');
  const [options, setOptions] = useState(['', '', '']);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSaveTag = () => {
    if (!tagName.trim() || options.every((opt) => !opt.trim())) return;

    setTags([...tags, { name: tagName, options }]);
    setTagName('');
    setOptions(['', '', '']);
    setShowForm(false);
  };

  return (
    <div className="reporting-tags-wrapper">
      <div className="reporting-tags-header">
        <h1>Reporting Tags</h1>
        <button className="add-tag-btn" onClick={() => setShowForm(true)}>
          <FiPlus size={16} /> New Tag
        </button>
      </div>

      <div className="reporting-tags-table">
        <div className="reporting-tags-table-head">
          <div>TAG NAME</div>
          <div>OPTIONS</div>
        </div>
        {tags.length === 0 ? (
          <div className="no-tags">There are no reporting tags</div>
        ) : (
          tags.map((tag, idx) => (
            <div key={idx} className="reporting-tags-table-row">
              <div>{tag.name}</div>
              <div>{tag.options.join(', ')}</div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div className="popup-backdrop">
          <div className="popup-form">
            <div className="popup-header">
              <h3>Create Tag</h3>
              <span className="close-icon" onClick={() => setShowForm(false)}>×</span>
            </div>

            <label>Tag Name<span className="required">*</span></label>
            <input
              type="text"
              placeholder="E.g: Location, Department"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
            />

            <label>Options<span className="required">*</span></label>
            {options.map((opt, idx) => (
              <div key={idx} className="option-input">
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                />
                <button onClick={() => handleRemoveOption(idx)} className="delete-btn">
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}

            <button onClick={handleAddOption} className="add-option-btn">
              <FiPlus size={14} /> Add another option
            </button>

            <div className="popup-actions">
              <button onClick={handleSaveTag}>Save</button>
              <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportingTags;
