import React, { useState } from 'react';
import './WorkflowRules.css';

const WorkflowRules = () => {
  const [workflowRules, setWorkflowRules] = useState([
    {
      id: 1,
      name: 'Low Stock Alert',
      module: 'Items',
      description: 'Send email when stock is below 10',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Invoice Reminder',
      module: 'Sales',
      description: 'Send reminder email 3 days before due date',
      status: 'Inactive'
    }
  ]);

  const [showForm, setShowForm] = useState(false); // Toggle form
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    module: ''
  });

  const handleDelete = (id) => {
    const updatedRules = workflowRules.filter(rule => rule.id !== id);
    setWorkflowRules(updatedRules);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRule = {
      id: workflowRules.length + 1,
      name: formData.name,
      description: formData.description,
      module: formData.module,
      status: 'Active'
    };
    setWorkflowRules([...workflowRules, newRule]);
    setFormData({ name: '', description: '', module: '' });
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ name: '', description: '', module: '' });
  };

  return (
    <div className="workflow-container">
      <div className="workflow-header">
        <h2>Workflow Rules</h2>
        {!showForm && (
          <button className="new-rule-btn" onClick={() => setShowForm(true)}>
            + New Workflow Rule
          </button>
        )}
      </div>

      {showForm ? (
        <div className="new-rule-form">
          <div className="form-header">
            <h3>New Workflow Rule</h3>
            <span className="close-btn" onClick={handleCancel}>✕</span>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              <span className="required">Workflow Rule Name*</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>

            <label>
              <span className="required">Module*</span>
              <select
                name="module"
                value={formData.module}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Module</option>
                <option value="Sales">Sales</option>
                <option value="Items">Items</option>
                <option value="Purchases">Purchases</option>
              </select>
            </label>

            <div className="form-actions">
              <button type="submit" className="next-btn">Next</button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <table className="workflow-table">
          <thead>
            <tr>
              <th>Rule Name</th>
              <th>Module</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workflowRules.map(rule => (
              <tr key={rule.id}>
                <td>{rule.name}</td>
                <td>{rule.module}</td>
                <td>{rule.description}</td>
                <td>
                  <span className={rule.status === 'Active' ? 'status-active' : 'status-inactive'}>
                    {rule.status}
                  </span>
                </td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(rule.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {workflowRules.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  No workflow rules available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WorkflowRules;
