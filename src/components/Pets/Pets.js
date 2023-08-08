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
}

export default Pets;
