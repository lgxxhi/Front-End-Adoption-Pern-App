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
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
