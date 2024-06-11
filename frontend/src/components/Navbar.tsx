import { Link } from "react-router-dom";
import { User } from "../contexts/UserContext";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const isLoggedIn = User().isLoggedIn;

  const [navButtonOpen, setNavButtonOpen] = useState(false);
  function handleNavButton(e: any) {
    setNavButtonOpen(!navButtonOpen);
  }
  return (
    <>
      <header className="w-full text-sm dark:bg-gray-800">
        <nav
          className="container flex justify-around max-w-screen-lg mx-auto md:px-4"
          aria-label="Global"
        >
          <div className="hidden md:flex flex-row w-1/4">
            <Link
              to=""
              className="mx-2 px-2 flex flex-col justify-center text-white hover:bg-cyan-600"
            >
              <h6>Home</h6>
            </Link>
            {isLoggedIn && (
              <Link
                to="drugdb/admin/new-drug"
                className="mx-2 px-2 flex text-white flex-col justify-center hover:bg-cyan-600"
              >
                <h6>Add new drug</h6>
              </Link>
            )}
          </div>
          {isLoggedIn ? (
            <button
              className="md:hidden m-2 w-20 flex justify-center items-center rounded-xl bg-slate-500"
              onClick={handleNavButton}
            >
              {navButtonOpen ? <MdOutlineClose /> : <GiHamburgerMenu />}
            </button>
          ) : (
            <Link
              to=""
              className="md:hidden mx-2 px-2 flex flex-col justify-center text-white hover:bg-cyan-600"
            >
              <h6>Home</h6>
            </Link>
          )}
          <div className="flex grow m-2">
            <SearchBar />
          </div>
          <div className="hidden md:flex flex-row-reverse w-1/4">
            {isLoggedIn && (
              <Link
                to="drugdb/admin/logout"
                className="mx-2 px-2 flex flex-col justify-center text-white hover:bg-cyan-600"
              >
                <h6 onClick={handleNavButton}>Logout</h6>
              </Link>
            )}
          </div>
        </nav>
      </header>
      <ul
        className={`${
          navButtonOpen ? "" : "hidden"
        } w-full p-1 bg-slate-800 absolute z-10`}
      >
        <li>
          <Link
            to=""
            className="m-4 flex flex-col justify-center text-white hover:bg-cyan-600"
            onClick={handleNavButton}
          >
            <h6>Home</h6>
          </Link>
          {isLoggedIn && (
            <Link
              to="./admin/new-drug"
              className="m-4 flex text-white flex-col justify-center hover:bg-cyan-600"
              onClick={handleNavButton}
            >
              <h6>Add new drug</h6>
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to="./admin/logout"
              className="m-4 flex flex-col justify-center text-white hover:bg-cyan-600"
              onClick={handleNavButton}
            >
              <h6>Logout</h6>
            </Link>
          )}
        </li>
      </ul>
    </>
  );
}
