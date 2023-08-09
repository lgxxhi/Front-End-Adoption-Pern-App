import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddPet.css";

function AddPet() {
  const [petData, setPetData] = useState({
    name: "",
    age: 0,
    species: "",
    breed: "",
    gender: "",
    location: "",
    color: "",
    size: "",
    story: "",
    is_favorite: false,
    photo: "",
  });

  const [otherSpecies, setOtherSpecies] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(value);

    if (type === "radio" || name === "species") {
      setPetData({ ...petData, [name]: value });
    } else if (name === "otherSpecies") {
      setOtherSpecies(value);
    } else {
      setPetData({ ...petData, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = process.env.REACT_APP_API_URL;

      const speciesValue =
        petData.species === "other" ? otherSpecies : petData.species;

      await axios.post(`${url}/pets`, { ...petData, species: speciesValue });
      alert("New pet added!");
      navigate("/pets");
    } catch (error) {
      console.log(error);
      console.log(error.response.data.error);
      if (
        error.response.data.error ===
        "You forgot to start your photo url with http:// or https://"
      ) {
        alert("Please enter a valid photo url");
      }
    }
  };

  return (
    <div className="add-pet container row-sm-1">
      <div>
        <h2>Add a New Pet for Adoption!</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row g-2">
          <label className="edit-label">Name:</label>
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Name..."
              name="name"
              id="name"
              required
              onChange={handleChange}
              value={petData.name}
            />
          </div>
          <div className="col">
            <label className="edit-label">Age:</label>
            <input
              required
              type="number"
              className="form-control"
              placeholder="Age..."
              name="age"
              id="age"
              onChange={handleChange}
              value={petData.age}
            />
          </div>

          <div className="col-md-6">
            <label>Species:</label>
            <select
              className="form-select"
              name="species"
              id="species"
              value={petData.species}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
              <option value="other">Other</option>
            </select>
            {petData.species === "other" && (
              <input
                type="text"
                name="otherSpecies"
                id="otherSpecies"
                className="form-control"
                value={otherSpecies}
                onChange={handleChange}
                placeholder="Enter other species"
                required
              />
            )}
          </div>
          <div className="col-md-6">
            <label className="edit-label col-md-6">Breed:</label>
            <input
              required
              type="text"
              className="form-control"
              placeholder="Breed..."
              name="breed"
              id="breed"
              onChange={handleChange}
              value={petData.breed}
            />
          </div>
          <div className="form-inline col-md-6">
            <label>Gender:</label>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="m"
                checked={petData.gender === "m"}
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                M
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="f"
                checked={petData.gender === "f"}
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                F
              </label>
            </div>
          </div>

          <div className="col-md-4">
            <label className="edit-label">Location:</label>

            <input
              required
              type="text"
              className="form-control"
              placeholder="Location..."
              name="location"
              id="location"
              onChange={handleChange}
              value={petData.location}
            />
          </div>
          <div className="col-md-4">
            <label className="edit-label">Color:</label>

            <input
              required
              type="text"
              className="form-control"
              placeholder="Color..."
              name="color"
              id="color"
              onChange={handleChange}
              value={petData.color}
            />
          </div>
          <div className="col-md-4">
            <label className="edit-label">Size:</label>

            <input
              required
              type="text"
              className="form-control"
              placeholder="Size..."
              name="size"
              id="size"
              onChange={handleChange}
              value={petData.size}
            />
          </div>
          <div className="col-md-10">
            <label className="edit-label">Story:</label>
            <textarea
              type="text"
              required
              className="form-control"
              placeholder="Write something about this pet..."
              value={petData.story}
              name="story"
              id="story"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <div className="form-check">
              <br />

              <input
                className="form-check-input "
                type="checkbox"
                name="is_favorite"
                id="is_favorite"
                onChange={handleChange}
                checked={petData.is_favorite}
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Favorite?
              </label>
            </div>
          </div>
          <div className="col-md-12">
            <label>Photo:</label>
            <input
              className="form-control"
              type="text"
              name="photo"
              value={petData.photo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-outline-dark">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPet;
