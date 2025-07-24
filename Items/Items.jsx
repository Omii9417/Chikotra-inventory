import React from "react";
import { useNavigate } from "react-router-dom";
import "./items.css";

const cardData = [
  {
    title: "Item Groups",
    desc: "Create multiple variants of the same item using Item Groups",
    buttonText: "New Item Group",
    image: "https://cdn-icons-png.flaticon.com/512/3595/3595455.png",
  },
  {
    title: "Items",
    desc: "Create standalone items and services that you buy and sell",
    buttonText: "New Item",
    image: "https://cdn-icons-png.flaticon.com/512/3437/3437363.png",
  },
  {
    title: "Composite Items",
    desc: "Group different items together and sell them as a single item",
    buttonText: "New Composite Item",
    image: "https://cdn-icons-png.flaticon.com/512/3595/3595455.png",
  },
  {
    title: "Price Lists",
    desc: "Tweak your item prices for specific contacts or transactions",
    buttonText: "Enable Now",
    image: "https://cdn-icons-png.flaticon.com/512/946/946769.png",
  },
];

const Items = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold">All Items</h5>
        <div>
          <button className="btn btn-light me-2">
            <i className="bi bi-list"></i>
          </button>
          <button className="btn btn-light me-2">
            <i className="bi bi-grid-3x3-gap-fill"></i>
          </button>
          <button className="btn btn-primary" onClick={() => navigate("/items/new")}>
            + New
          </button>
        </div>
      </div>

      <div className="row">
        {cardData.map((card, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <img
                  src={card.image}
                  alt={card.title}
                  className="mb-3"
                  style={{ width: "60px", height: "60px" }}
                />
                <h5 className="card-title fw-bold">{card.title}</h5>
                <p className="card-text">{card.desc}</p>
                <button className="btn btn-primary">{card.buttonText}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
