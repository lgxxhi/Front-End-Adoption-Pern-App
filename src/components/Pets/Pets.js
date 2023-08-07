import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Pets.css";

function Pets() {
  let url = process.env.REACT_APP_API_URL;

  const [petData, setPetData] = useState([]);

  async function getPetData() {
    try {
      let result = await axios.get(`${url}/pets`);

      setPetData(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPetData();
  }, []);

  function mapData() {
    return petData.map((pet) => (
      <div key={pet.id} className="pet-card">
        <img src={pet.photo} alt={pet.name} />
        <div className="pet-info">
          <h3>{pet.name}</h3>
          <p>Age: {pet.age}</p>
          <p>Breed: {pet.breed || "N/A"}</p>
          <p>Location: {pet.location || "N/A"}</p>
          <div className="favorite">
            {pet.is_favorite && <i className="fas fa-heart"></i>}
          </div>
          <div className="actions">
            <Link to={`/pets/${pet.id}`}>View Details</Link>{" "}
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className="pet-container">
      {petData.length === 0 ? (
        <div>Find some pets that need a home!</div>
      ) : (
        mapData()
      )}
    </div>
  );
}

export default Pets;
