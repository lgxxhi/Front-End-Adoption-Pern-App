import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditPet.css";

function EditPet() {
  let url = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const { id } = useParams();

  const [pet, setPet] = useState({
    age: 0,
    breed: "",
    color: "",
    gender: "",
    is_favorite: false,
    location: "",
    name: "",
    photo: "",
    size: "",
    story: "",
  });

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`${url}/pets/${id}`);

        setPet(response.data);
      } catch (error) {
        navigate("/404");
      }
    };

    fetchPet();
  }, []);

  const handleTextChange = (e) => {
    setPet({
      ...pet,
      [e.target.id]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setPet({
      ...pet,
      is_favorite: !pet.is_favorite,
    });
  };

  async function updatePet(id, updatedPet) {
    try {
      let result = await axios.put(`/pets/${id}`, updatedPet);

      return result;
    } catch (e) {
      return e;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updatePet(id);
      navigate(`/pets/${id}`);
    } catch (e) {
      console.log(e);
    }
  }

  function getGender(gender) {
    if (gender === "m") {
      return "Male";
    } else if (gender === "f") {
      return "Female";
    } else {
      return "Unknown";
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="edit-label">Name:</label>
          <input
            className="edit-input"
            required
            type="text"
            name="name"
            id="name"
            onChange={handleTextChange}
            value={pet.name}
          />
        </div>
        <div>
          <label className="edit-label">Age:</label>
          <input
            className="edit-input"
            required
            type="number"
            name="age"
            id="age"
            onChange={handleTextChange}
            value={pet.age}
          />
        </div>
        <div>
          <label className="edit-label">Species:</label>
          <br />
          <select value={pet.species}>
            <option value=""></option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="edit-label">Breed:</label>
          <input
            className="edit-input"
            required
            type="text"
            name="breed"
            id="breed"
            onChange={handleTextChange}
            value={pet.breed}
          />
        </div>
        <div>
          <label className="edit-label">Gender:</label>
          <br />
          <select value={getGender(pet.gender)}>
            <option value=""></option>
            <option value="male">Male</option>
            <option value="Cat">Female</option>
          </select>
        </div>
        <div>
          <label className="edit-label">Location:</label>
          <input
            className="edit-input"
            required
            type="text"
            name="location"
            id="location"
            onChange={handleTextChange}
            value={pet.location}
          />
        </div>
        <div>
          <label className="edit-label">Color:</label>
          <input
            className="edit-input"
            required
            type="text"
            name="color"
            id="color"
            onChange={handleTextChange}
            value={pet.color}
          />
        </div>
        <div>
          <label className="edit-label">Size:</label>
          <input
            className="edit-input"
            required
            type="text"
            name="size"
            id="size"
            onChange={handleTextChange}
            value={pet.size}
          />
        </div>
        <div>
          <label className="edit-label">Story:</label>
          <textarea
            className="edit-input"
            required
            type="text"
            name="breed"
            id="breed"
            onChange={handleTextChange}
            value={pet.story}
          />
        </div>
        <div>
          <label className="edit-label">Favorite</label>
          <input
            className="edit-input"
            type="checkbox"
            name="is_favorite"
            id="is_favorite"
            onChange={handleCheckboxChange}
            checked={pet.is_favorite}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default EditPet;
