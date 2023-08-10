import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Pets.css";

function Pets() {
  let url = process.env.REACT_APP_API_URL;
  const { filter } = useParams();
  const [petData, setPetData] = useState([]);

  async function getPetData() {
    try {
      let result = await axios.get(`${url}/pets`);
      if (filter === "dogs" || filter === "cats") {
        setPetData(
          result.data.filter((pet) => pet.species === filter.slice(0, -1))
        );
      } else setPetData(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPetData();
  }, [filter]);

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
    return petData.map((pet) => {
      return (
        <div key={pet.id} className="col">
          <div className="card h-100 ">
            <div className="favorite" onClick={() => toggleFavorite(pet.id)}>
              {pet.is_favorite ? (
                <i className="fas fa-heart"></i>
              ) : (
                <i className="far fa-heart"></i>
              )}
            </div>
            <img src={pet.photo} alt={pet.name} className="m-2 h-100" />
            <div className="card-body">
              <h3 className="card-title">{pet.name}</h3>
              <p className="card-text">Age: {pet.age}</p>
              <p className="card-text">Breed: {pet.breed || "N/A"}</p>
              <p className="card-text">Location: {pet.location || "N/A"}</p>
              <Link to={`/pets/${pet.id}`} className="btn btn-outline-dark">
                View Details
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="page-footer  btns pt-4"></div>
      <div className="container mb-4">
        <div className="row row-cols-1  row-cols-md-2 row-cols-lg-3 g-4 mt-4">
          {petData.length === 0 ? (
            <div>Find some pets that need a home!</div>
          ) : (
            mapData()
          )}
        </div>
      </div>
      <div className=" page-footer  btns pt-4"></div>
    </div>
  );
}

export default Pets;
