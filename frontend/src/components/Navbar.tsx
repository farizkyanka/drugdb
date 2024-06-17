import { User } from "../contexts/UserContext";
import SearchBar from "./SearchBar";
import { HomeLink, NewDrugLink, LogoutLink } from "./Links";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useNavigation } from "react-router-dom";
import { PiSpinnerBold } from "react-icons/pi";

export default function Navbar() {
  const isLoggedIn = User().isLoggedIn;
  const navigation = useNavigation();

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleNavbarClick = () => setIsNavbarOpen(!isNavbarOpen);

  return (
    <>
      <header className="w-full text-sm dark:bg-gray-800">
        <nav
          className="container flex justify-around max-w-screen-lg mx-auto md:px-4"
          aria-label="Global"
        >
          <div className="hidden md:flex">
            <HomeLink />
          </div>
          {isLoggedIn ? (
            <div
              className="m-2 w-16 flex md:hidden justify-center items-center rounded-md text-slate-200 bg-slate-600"
              onClick={handleNavbarClick}
            >
              {isNavbarOpen ? <IoMdClose /> : <RxHamburgerMenu />}
            </div>
          ) : (
            <div className="m-2 md:hidden rounded bg-slate-600 flex">
              <HomeLink />
            </div>
          )}
          <div className="hidden md:flex flex-row w-1/4">
            {isLoggedIn && <NewDrugLink />}
          </div>
          <div className="flex grow m-2">
            <SearchBar />
          </div>
          <div className="flex items-center">
            {navigation.state === "loading" ? (
              <PiSpinnerBold color="white" size={"2em"} />
            ) : null}
          </div>
          <div className="hidden md:flex flex-row-reverse w-1/4">
            {isLoggedIn && <LogoutLink />}
          </div>
        </nav>
      </header>
      <ul
        className={`${
          isNavbarOpen ? "" : "hidden"
        } w-full absolute bg-slate-800 z-10`}
      >
        <li className="my-4" onClick={handleNavbarClick}>
          <HomeLink />
        </li>
        <li className="my-4" onClick={handleNavbarClick}>
          <NewDrugLink />
        </li>
        <li className="my-4" onClick={handleNavbarClick}>
          <LogoutLink />
        </li>
      </ul>
    </>
  );
}
