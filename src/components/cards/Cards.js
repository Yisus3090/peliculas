import React from "react";
import './styles.css'

const Card = ({ image, title, liked, onLikeToggle }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="movie-image" />
      <div className="card-info">
        <h3 className="movie-title">{title}</h3>
        <button
          className={`like-button ${liked ? "liked" : ""}`}
          onClick={onLikeToggle}
        >
          ♥
        </button>
      </div>
    </div>
  );
};

export default Card;
