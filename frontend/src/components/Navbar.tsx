import { Link } from "react-router-dom";
import { User } from "../contexts/UserContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const isLoggedIn = User().isLoggedIn;

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

          <div className="flex grow m-2">
            <SearchBar />
          </div>
          <div className="flex flex-row-reverse w-1/4">
            {isLoggedIn && (
              <Link
                to="./admin/logout"
                className="mx-2 px-2 flex flex-col justify-center text-white hover:bg-cyan-600"
              >
                <h6>Logout</h6>
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
