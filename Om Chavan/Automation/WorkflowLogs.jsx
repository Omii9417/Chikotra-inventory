import React, { useState } from 'react';
import './WorkflowLogs.css';

const WorkflowLogs = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [moduleFilter, setModuleFilter] = useState('All');
  const [dateRange, setDateRange] = useState('Last Three Months');

  return (
    <div className="workflow-logs-container">
      <div className="workflow-logs-header">
        <h2>Workflow Logs</h2>
        <button className="failure-btn">Configure Failure Preferences</button>
      </div>

      <div className="tabs">
        <span>Email Alerts</span>
        <span>Webhooks</span>
        <span className="active-tab">Custom Functions</span>
      </div>

      <div className="filters-bar">
        <span className="filter-icon">🔍 Filters:</span>
        
        <div className="filter-group">
          <label>Status</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Success</option>
            <option>Failure</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Modules</label>
          <select value={moduleFilter} onChange={e => setModuleFilter(e.target.value)}>
            <option>All</option>
            <option>Items</option>
            <option>Sales</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Date Range</label>
          <select value={dateRange} onChange={e => setDateRange(e.target.value)}>
            <option>Last Three Months</option>
            <option>Last Month</option>
            <option>Last 7 Days</option>
          </select>
        </div>

        <button className="apply-btn">Apply Filter</button>

        <div className="export">
          <button className="export-btn">Export ⌄</button>
        </div>
      </div>

      <table className="logs-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>OCCURRED AT</th>
            <th>NAME</th>
            <th>LOG ID</th>
            <th>ENTITY TYPE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr className="no-logs-row">
            <td colSpan="6">There are no logs</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WorkflowLogs;
