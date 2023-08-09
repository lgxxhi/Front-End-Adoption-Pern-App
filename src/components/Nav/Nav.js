import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

function Nav() {
  return (
    <div>
      <nav className="navbar bg-body-tertiary my-3 ">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand logo ">
            PetMatch.com
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel"></h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <Link to={"/"} type="button" className="my-btn   my-2">
                  Home
                </Link>
                <Link to={"/donate"} type="button" className="my-btn  my-2">
                  Donate
                </Link>
                <Link to={"/about-us"} type="button" className="my-btn  my-2">
                  About Us
                </Link>
                <Link
                  to={"/pets/filter/dogs"}
                  type="button"
                  className="my-btn  my-2"
                >
                  Dogs
                </Link>
                <Link
                  to={"/pets/filter/cats"}
                  type="button"
                  className="my-btn  my-2"
                >
                  Cats
                </Link>
                <Link to={"/add-pet"} type="button" className="my-btn  my-2">
                  Put Pet For Adoption
                </Link>
                <Link to={"/cart"} className="mt-4" type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-cart"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
