// src/pages/Items/NewItem.jsx
import React, { useState } from "react";
import axios from "axios";
import "./NewItem.css";

const NewItem = () => {
  const [formData, setFormData] = useState({
    itemType: "Goods",
    name: "",
    sku: "",
    unit: "Nos",
    dimension: "",
    brand: "",
    manufacturer: "",
    upc: "",
    mpn: "",
    ean: "",
    isbn: "",
    image: null,
    sellingPrice: "",
    salesAccount: "Sales",
    salesDescription: "",
    costPrice: "",
    purchaseAccount: "Purchases",
    purchaseDescription: "",
    preferredVendor: "",
    trackInventory: false,
    inventoryAccount: "",
    valuationMethod: "",
    location: "Head Office",
    openingStock: "0",
    openingStockValue: "0",
    reorderPoint: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, image: formData.image?.name || "" };
    try {
      await axios.post("http://localhost:3001/items", payload);
      alert("Item saved successfully");
    } catch (err) {
      console.error(err);
      alert("Error saving item");
    }
  };

  const renderImagePreview = () => {
    return formData.image ? (
      <img src={URL.createObjectURL(formData.image)} alt="Preview" className="image-preview" />
    ) : (
      <div className="image-placeholder">Image Preview</div>
    );
  };

  return (
    <div className="new-item-wrapper">
      <h3 className="page-title">New Item</h3>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-flex">
          <div className="form-left">
            {/* Item Info */}
            <div className="card section-card">
              <h4 className="section-title">Item Information</h4>
              <div className="grid-2col">
                <label className="field-label">Item Type</label>
                <select name="itemType" value={formData.itemType} onChange={handleChange} className="field-input">
                  <option>Goods</option>
                  <option>Services</option>
                </select>

                <label className="field-label">Name *</label>
                <input name="name" value={formData.name} onChange={handleChange} required className="field-input" />

                <label className="field-label">SKU</label>
                <input name="sku" value={formData.sku} onChange={handleChange} className="field-input" />

                <label className="field-label">Unit</label>
                <select name="unit" value={formData.unit} onChange={handleChange} className="field-input">
                  <option>Nos</option>
                  <option>Kg</option>
                  <option>Litre</option>
                </select>

                <label className="field-label">Dimension</label>
                <input name="dimension" value={formData.dimension} onChange={handleChange} className="field-input" />

                <label className="field-label">Brand</label>
                <input name="brand" value={formData.brand} onChange={handleChange} className="field-input" />

                <label className="field-label">Manufacturer</label>
                <input name="manufacturer" value={formData.manufacturer} onChange={handleChange} className="field-input" />

                <label className="field-label">UPC</label>
                <input name="upc" value={formData.upc} onChange={handleChange} className="field-input" />

                <label className="field-label">MPN</label>
                <input name="mpn" value={formData.mpn} onChange={handleChange} className="field-input" />

                <label className="field-label">EAN</label>
                <input name="ean" value={formData.ean} onChange={handleChange} className="field-input" />

                <label className="field-label">ISBN</label>
                <input name="isbn" value={formData.isbn} onChange={handleChange} className="field-input" />
              </div>
            </div>

            {/* Sales Info */}
            <div className="card section-card">
              <h4 className="section-title">Sales Information</h4>
              <div className="grid-2col">
                <label className="field-label">Selling Price</label>
                <input name="sellingPrice" type="number" value={formData.sellingPrice} onChange={handleChange} className="field-input" />

                <label className="field-label">Sales Account</label>
                <select name="salesAccount" value={formData.salesAccount} onChange={handleChange} className="field-input">
                  <option>Sales</option>
                  <option>Services</option>
                </select>

                <label className="field-label full-width-label">Sales Description</label>
                <textarea name="salesDescription" rows="2" value={formData.salesDescription} onChange={handleChange} className="field-input full-width-input" />
              </div>
            </div>

            {/* Purchase Info */}
            <div className="card section-card">
              <h4 className="section-title">Purchase Information</h4>
              <div className="grid-2col">
                <label className="field-label">Cost Price</label>
                <input name="costPrice" type="number" value={formData.costPrice} onChange={handleChange} className="field-input" />

                <label className="field-label">Purchase Account</label>
                <select name="purchaseAccount" value={formData.purchaseAccount} onChange={handleChange} className="field-input">
                  <option>Purchases</option>
                  <option>Expenses</option>
                </select>

                <label className="field-label full-width-label">Purchase Description</label>
                <textarea name="purchaseDescription" rows="2" value={formData.purchaseDescription} onChange={handleChange} className="field-input full-width-input" />

                <label className="field-label full-width-label">Preferred Vendor</label>
                <input name="preferredVendor" value={formData.preferredVendor} onChange={handleChange} className="field-input full-width-input" />
              </div>
            </div>

            {/* Inventory Section */}
            <div className="card section-card">
              <h4 className="section-title">
                <input
                  type="checkbox"
                  name="trackInventory"
                  checked={formData.trackInventory}
                  onChange={handleChange}
                />{" "}
                Track Inventory for this item
              </h4>

              {formData.trackInventory && (
                <>
                  <p className="note-text">You cannot enable/disable inventory tracking once you’ve created transactions for this item.</p>

                  <div className="grid-2col">
                    <label className="field-label">Inventory Account<span className="required">*</span></label>
                    <select name="inventoryAccount" value={formData.inventoryAccount} onChange={handleChange} className="field-input" required>
                      <option value="">Select an account</option>
                      <option>Stock-in-Hand</option>
                      <option>Inventory Asset</option>
                    </select>

                    <label className="field-label">Inventory Valuation Method<span className="required">*</span></label>
                    <select name="valuationMethod" value={formData.valuationMethod} onChange={handleChange} className="field-input" required>
                      <option value="">Select the valuation method</option>
                      <option>FIFO</option>
                      <option>LIFO</option>
                      <option>Weighted Average</option>
                    </select>
                  </div>

                  <label className="field-label">Reorder Point</label>
                  <input name="reorderPoint" type="number" value={formData.reorderPoint} onChange={handleChange} className="field-input" />

                  <table className="table">
                    <thead>
                      <tr>
                        <th>Location Name</th>
                        <th>Opening Stock<br /><span className="copy-all">COPY TO ALL</span></th>
                        <th>Opening Stock Value per unit<br /><span className="copy-all">COPY TO ALL</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <select name="location" value={formData.location} onChange={handleChange} className="field-input">
                            <option>Head Office</option>
                            <option>Branch 1</option>
                            <option>Warehouse</option>
                          </select>
                        </td>
                        <td>
                          <input name="openingStock" type="number" value={formData.openingStock} onChange={handleChange} className="field-input" />
                        </td>
                        <td>
                          <input name="openingStockValue" type="number" value={formData.openingStockValue} onChange={handleChange} className="field-input" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>

          {/* Image Panel */}
          <div className="form-right">
            <div className="card section-card image-card">
              <h4 className="section-title">Item Image</h4>
              {renderImagePreview()}
              <input type="file" name="image" onChange={handleChange} className="field-input file-input" />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="form-footer">
          <button type="button" className="btn btn-secondary">Cancel</button>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default NewItem;
