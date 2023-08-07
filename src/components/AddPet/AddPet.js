import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddPet() {
  const [petData, setPetData] = useState({
    name: "",
    age: 0,
    breed: "",
    gender: "m",
    location: "",
    color: "",
    size: "",
    story: "",
    is_favorite: false,
    photo: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle radio buttons separately
    if (type === "radio") {
      setPetData({ ...petData, [name]: value });
    } else {
      setPetData({ ...petData, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = process.env.REACT_APP_API_URL;
      await axios.post(`${url}/pets`, petData);
      alert("New pet added!");
      navigate("/pets");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Create New Bookmark</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={petData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            name="age"
            step="1"
            min={0}
            value={petData.age}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Breed:
          <input
            type="text"
            name="breed"
            value={petData.breed}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Gender:
          <input
            type="radio"
            name="gender"
            value="m"
            checked={petData.gender === "m"}
            onChange={handleChange}
          />
          M
        </label>{" "}
        <label>
          <input
            type="radio"
            name="gender"
            value="f"
            checked={petData.gender === "f"}
            onChange={handleChange}
          />
          F
        </label>
        <br />
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={petData.location}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Color:
          <input
            type="text"
            name="color"
            value={petData.color}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Size:
          <input
            type="text"
            name="size"
            value={petData.size}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Story:
          <textarea
            name="story"
            value={petData.story}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Is Favorite:
          <input
            type="checkbox"
            name="is_favorite"
            checked={petData.is_favorite}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Photo:
          <input
            type="text"
            name="photo"
            value={petData.photo}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
}

export default AddPet;
