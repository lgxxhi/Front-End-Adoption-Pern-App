import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./Pet.css";

function Pet() {
  let url = process.env.REACT_APP_API_URL;

  const [petState, setPetState] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    fetchPetById();
  }, []);

  async function fetchPetById() {
    try {
      let result = await axios.get(`${url}/pets/${id}`);
      console.log(result.data);

      setPetState(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  function getAge(age) {
    if (age <= 2) {
      return "Young";
    } else if (age <= 9) {
      return "Adult";
    } else {
      return "Senior";
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

  function modal() {}

  const deletePet = async () => {
    try {
      const response = await axios.delete(`${url}/pets/${id}`);
      console.log(response);
      const { name } = response.data;
      alert(`${name} has been deleted`);
      navigate("/pets");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="next-pet">
        <Link>
          <button className="btn btn-light">
            <span className="next-pet-text">Next Pet</span>
            <svg
              className="mx-1"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </button>
        </Link>
      </div>

      <div className="container">
        <div className="row g-0  position-relative">
          <div className="col-md-6 mb-md-0 p-md-4">
            <img src={petState.photo} className="w-100" alt="..." />
          </div>
          <div className="col-md-6 p-4 ps-md-0">
            <h2 className="mt-0 pet-name ">{petState.name}</h2>
            <br />
            <ul className="list-inline">
              <li className="list-inline-item">{petState.breed}</li>
              <li className="list-inline-item">&bull; {petState.location}</li>
            </ul>

            <hr />
            <ul className="list-inline">
              <li className="list-inline-item">{getAge(petState.age)}</li>

              <li className="list-inline-item">
                &bull; {getGender(petState.gender)}
              </li>
              <li className="list-inline-item">&bull; {petState.size}</li>
              <li className="list-inline-item">&bull; {petState.color}</li>
            </ul>
            <hr />
            <h5>Info:</h5>
            <p>{petState.story}</p>
            <Link to={"/cart"} type="button" className="btn btn-outline-dark">
              Cart
            </Link>
          </div>
        </div>
      </div>
      <div className="d-flex page-footer  btns px-3">
        <Link to="/pets" className="pt-1">
          <button className="btn btn-light">Back</button>
        </Link>
        <Link to={`/pets/${id}/edit`} className="pt-1 mx-2 ">
          <button className="btn btn-light">Edit</button>
        </Link>
        <Link className="pt-1">
          <button
            type="button"
            className="btn btn-light  "
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Delete
          </button>
        </Link>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Are You Sure You Wish To Delete?
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-bs-dismiss="modal"
                >
                  NO
                </button>
                <button
                  onClick={() => deletePet()}
                  type="button"
                  className="btn btn-outline-danger"
                  data-bs-dismiss="modal"
                >
                  YES
                </button>
              </div>
            </div>
          </div>
        </div>

        <input type="checkbox" id="heart" className="heart-input" />
        <label htmlFor="heart" className="heart-label ms-auto">
          <i className="fas fa-heart"></i>
        </label>
      </div>
    </div>
  );
}

export default Pet;
