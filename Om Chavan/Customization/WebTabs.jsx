import React, { useState } from 'react';
import './WebTabs.css';
import { FiPlus } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

const WebTabs = () => {
  const [webTabs, setWebTabs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tabData, setTabData] = useState({
    name: '',
    url: '',
    isZoho: false,
    visibility: 'everyone',
  });

  const handleCreateTab = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setTabData({ name: '', url: '', isZoho: false, visibility: 'everyone' });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTabData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    if (tabData.name && tabData.url) {
      setWebTabs([...webTabs, { ...tabData, updated: new Date().toLocaleDateString(), status: 'Active' }]);
      handleCloseModal();
    } else {
      alert('Please fill in required fields');
    }
  };

  return (
    <div className="web-tabs-wrapper">
      <div className="web-tabs-header">
        <h1>Web Tabs</h1>
        <button className="new-tab-btn" onClick={handleCreateTab}>
          <FiPlus size={16} style={{ marginRight: '5px' }} />
          New Web Tab
        </button>
      </div>

      <div className="web-tabs-table">
        <div className="web-tabs-table-head">
          <div>NAME</div>
          <div>URL</div>
          <div>LAST UPDATED</div>
          <div>STATUS</div>
        </div>

        {webTabs.length === 0 ? (
          <div className="no-tabs">
            <p>You haven't created any web tabs yet.</p>
            <button className="create-tab-btn" onClick={handleCreateTab}>CREATE WEB TAB</button>
            <p className="learn-more">
              Learn more about <a href="#">Web Tabs</a>
            </p>
          </div>
        ) : (
          webTabs.map((tab, idx) => (
            <div key={idx} className="web-tabs-table-row">
              <div>{tab.name}</div>
              <div>{tab.url}</div>
              <div>{tab.updated}</div>
              <div>{tab.status}</div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <div className="modal-header">
              <h2>New Web Tab</h2>
              <IoMdClose className="close-icon" onClick={handleCloseModal} />
            </div>

            <div className="modal-body">
              <label className="required">Tab Name*</label>
              <input
                type="text"
                name="name"
                value={tabData.name}
                onChange={handleChange}
                placeholder=""
              />

              <label className="required">URL*</label>
              <input
                type="text"
                name="url"
                value={tabData.url}
                onChange={handleChange}
                placeholder=""
              />

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  name="isZoho"
                  checked={tabData.isZoho}
                  onChange={handleChange}
                />
               
              </div>

              <label>Visibility</label>
              <div className="radio-group">
                <label><input type="radio" name="visibility" value="only_me" checked={tabData.visibility === 'only_me'} onChange={handleChange} /> Only Me</label>
                <label><input type="radio" name="visibility" value="selected" checked={tabData.visibility === 'selected'} onChange={handleChange} /> Only Selected Users & Roles</label>
                <label><input type="radio" name="visibility" value="everyone" checked={tabData.visibility === 'everyone'} onChange={handleChange} /> Everyone</label>
              </div>
            </div>

            <div className="modal-footer">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebTabs;
