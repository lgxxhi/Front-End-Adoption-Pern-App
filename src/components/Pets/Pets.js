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

  const toggleFavorite = async (petId) => {
    try {
      const updatedPetData = petData.map((pet) => {
        if (pet.id === petId) {
          return { ...pet, is_favorite: !pet.is_favorite };
        }
        return pet;
      });

      setPetData(updatedPetData);

      await axios.put(`${url}/pets/${petId}`, {
        ...petData.find((pet) => pet.id === petId),
        is_favorite: !petData.find((pet) => pet.id === petId).is_favorite,
      });
    } catch (error) {
      console.log(error);
    }
  };

  function mapData() {
    return petData.map((pet) => (
      <div key={pet.id} className="pet-card">
        <div className="favorite" onClick={() => toggleFavorite(pet.id)}>
          {pet.is_favorite ? (
            <i className="fas fa-heart"></i>
          ) : (
            <i className="far fa-heart"></i>
          )}
        </div>
        <img src={pet.photo} alt={pet.name} />
        <div className="pet-info">
          <h3>{pet.name}</h3>
          <p>Age: {pet.age}</p>
          <p>Breed: {pet.breed || "N/A"}</p>
          <p>Location: {pet.location || "N/A"}</p>
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
