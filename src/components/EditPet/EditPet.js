import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditPet.css";

function EditPet() {
  let url = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const { id } = useParams();

  const [pet, setPet] = useState({
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

  const [storedSpecies, setStoredSpecies] = useState("");

  const fetchPet = async () => {
    try {
      const response = await axios.get(`${url}/pets/${id}`);
      setPet(response.data);
      setStoredSpecies(response.data.species);
    } catch (error) {
      navigate("/404");
    }
  };

  useEffect(() => {
    fetchPet();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "species") {
      if (value !== "cat" && value !== "dog") {
        setPet({ ...pet, species: "other" });
      } else {
        setPet({
          ...pet,
          species: value,
        });
      }
    } else if (name === "otherSpecies") {
      setPet({
        ...pet,
        species: value,
      });
    } else {
      setPet({
        ...pet,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const speciesValue =
        pet.species === "other" ? storedSpecies : pet.species;

      await axios.put(`${url}/pets/${id}`, { ...pet, species: speciesValue });
      alert("Pet successfully updated!");
      navigate(`/pets/${id}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="edit-pet container row-sm-1">
      <div>
        <h2>Edit Pet Info:</h2>
      </div>
      <br />
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
              value={pet.name}
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
              value={pet.age}
            />
          </div>
          <div className="col-md-6">
            <label>Species:</label>
            <select
              className="form-select"
              name="species"
              id="species"
              value={pet.species}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
              <option value="other">Other</option>
            </select>
            {(pet.species === "other" ||
              !["cat", "dog"].includes(pet.species)) && (
              <input
                type="text"
                name="otherSpecies"
                id="otherSpecies"
                className="form-control"
                value={pet.species}
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
              value={pet.breed}
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
                checked={pet.gender === "m"}
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
                checked={pet.gender === "f"}
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
              value={pet.location}
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
              value={pet.color}
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
              value={pet.size}
            />
          </div>
          <div className="col-md-10">
            <label className="edit-label">Story:</label>
            <textarea
              type="text"
              required
              className="form-control"
              placeholder="Write something about this pet..."
              value={pet.story}
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
                checked={pet.is_favorite}
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Favorite?
              </label>
            </div>
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

export default EditPet;
