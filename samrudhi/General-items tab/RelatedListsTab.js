import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function RelatedLists() {
  const [showEditor, setShowEditor] = useState(false);
  const [script, setScript] = useState(`headerData = list();
headerData.add({"key":"account_name","value":"Account Name"});
headerData.add({"key":"status","value":"Status"});
details = map();
details.put("name",{"value":item.get("name"),"isExternal":true,"link":"https://inventory.zoho.com/app/contacts/" + item.get("item_id")});
details.put("account_name",{"value":item.get("account_name")});
details.put("status",item.get("status"));
details.put("rate",item.get("rate"));
listData = list();
listData.add(details);
resultMap = map();
resultMap.put("header_context",headerData);
resultMap.put("data",listData);
return resultMap;`);

  const renderParam = (type, name, isLast = false) => (
    <span className="me-1">
      <span style={{ color: "#0d6efd", textDecoration: "underline", cursor: "pointer" }}>
        {type}
      </span>{" "}
      <span
        style={{ textDecoration: "underline", cursor: "pointer" }}
        title={`Info about ${name}`}
      >
        {name}
      </span>
      {!isLast && ","}
    </span>
  );

  if (showEditor) {
    return (
      <div className="container-fluid p-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
          <h5 className="mb-0">New Related List - Items</h5>
          <button className="btn-close" onClick={() => setShowEditor(false)}></button>
        </div>

        {/* Related List Name */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Related List Name <span className="text-danger">*</span>
          </label>
          <input type="text" className="form-control" placeholder="Enter related list name" />
        </div>

        {/* Visibility */}
        <div className="mb-3">
          <p className="fw-bold">Who can view this related list?</p>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="visibility" id="onlyMe" defaultChecked />
            <label className="form-check-label" htmlFor="onlyMe">Only Me</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="visibility" id="everyone" />
            <label className="form-check-label" htmlFor="everyone">Everyone</label>
          </div>
        </div>

        {/* Instruction + Bulb Icon */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            <span
              style={{ fontSize: "20px", marginRight: "8px", color: "#ffc107" }}
              title="Tip: Enter your script here"
            >
              💡
            </span>
            <p className="text-muted mb-0">
              Enter a script to fetch data from third party services and view them from within Zoho Inventory.
            </p>
          </div>
          <div>
            <a href="#!" className="me-3 text-primary text-decoration-none">
              View Deluge Components Usage
            </a>
            <a href="#!" className="text-primary text-decoration-none">
              Connections
            </a>
          </div>
        </div>

        {/* Row with sidebar and editor */}
        <div className="row" style={{ height: "500px" }}>
          <div className="col-2 d-flex flex-column border-end" style={{ height: "100%" }}>
            <div style={{ overflowY: "auto", flex: 1, paddingRight: "8px" }}>
              <ul className="list-unstyled">
                <li className="fw-bold text-secondary">BASIC</li>
                <li>set variable</li>
                <li>add comment</li>
                <li>if condition</li>
                <li className="fw-bold text-secondary mt-2">CONDITION</li>
                <li>else if</li>
                <li>else</li>
                <li className="fw-bold text-secondary mt-2">INTEGRATIONS</li>
                <li>send mail</li>
                <li>post to chat</li>
                <li>webhook</li>
                <li>zoho integration</li>
                <li>invoke API</li>
                <li>FTP/SFTP</li>
                <li className="fw-bold text-secondary mt-2">COLLECTION</li>
                <li>create collection</li>
                <li>insert</li>
                <li>get</li>
                <li>update</li>
                <li>delete</li>
              </ul>
            </div>
          </div>

          {/* Script editor */}
          <div className="col-10 d-flex flex-column" style={{ height: "100%" }}>
            <div
              className="d-flex justify-content-between align-items-center px-2 py-1"
              style={{
                backgroundColor: "#f1f3f4",
                border: "1px solid #dee2e6",
                borderBottom: "none",
                fontFamily: "monospace",
                fontSize: "13px",
              }}
            >
              <div className="d-flex align-items-center gap-2">
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/free-deluge-282292.png"
                  alt="deluge-logo"
                  width="20"
                  height="20"
                />
                <span style={{ color: "#0d6efd", fontWeight: 500 }}>Deluge</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <span style={{ fontSize: "12px" }}>
                  Syntax Builder
                  <input type="radio" name="syntax" className="ms-1 me-1" />On
                  <input type="radio" name="syntax" className="ms-2 me-1" defaultChecked />Off
                </span>
                <a href="#!" style={{ fontSize: "12px", color: "#0d6efd", textDecoration: "none" }}>
                  Help
                </a>
              </div>
            </div>

            <div
              className="px-2 py-1"
              style={{
                fontFamily: "monospace",
                fontSize: "13px",
                backgroundColor: "#f8f9fa",
                borderLeft: "1px solid #dee2e6",
                borderRight: "1px solid #dee2e6",
              }}
            >
              <span style={{ color: "green" }}>Map</span>{" "}
              <span style={{ color: "red" }}>My_Related_List</span>
              (
              {renderParam("Map", "item")}
              {renderParam("Map", "organization")}
              {renderParam("Map", "user")}
              {renderParam("Map", "page_context", true)}
              ){" "}
              {"{"}
            </div>

            <div
              style={{
                fontFamily: "monospace",
                fontSize: "13px",
                color: "#6c757d",
                fontStyle: "italic",
                backgroundColor: "#f8f9fa",
                borderLeft: "1px solid #dee2e6",
                borderRight: "1px solid #dee2e6",
              }}
              className="px-2 py-1"
            >
              {`/*\n This is a sample function. It will display the item details.\n*/`}
            </div>

            {/* Medium size, resizable textarea */}
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="form-control flex-grow-1"
              style={{
                fontFamily: "monospace",
                whiteSpace: "pre",
                backgroundColor: "#f8f9fa",
                color: "#d63384",
                borderTopLeftRadius: "0",
                borderTopRightRadius: "0",
                resize: "vertical",
                minHeight: "250px",  // Medium size
              }}
            />

            <div
              className="px-2 py-1"
              style={{
                fontFamily: "monospace",
                fontSize: "13px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #dee2e6",
                borderTop: "none",
              }}
            >
              {"}"}
            </div>
          </div>
        </div>

        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-primary">Save</button>
          <button className="btn btn-success">Save and Execute</button>
          <button className="btn btn-secondary" onClick={() => setShowEditor(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-primary" onClick={() => setShowEditor(true)}>
          + New Related List
        </button>
      </div>

      <div className="text-center">
        <div className="mx-auto" style={{ width: "250px" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747086.png"
            alt="illustration"
            className="img-fluid"
          />
        </div>

        <p className="mt-3 mx-auto" style={{ maxWidth: "600px" }}>
          Create custom related lists to access relevant information available
          from inside or outside the application.
        </p>

        <button className="btn btn-primary mt-3" onClick={() => setShowEditor(true)}>
          New Related List
        </button>
      </div>
    </div>
  );
}

export default RelatedLists;
