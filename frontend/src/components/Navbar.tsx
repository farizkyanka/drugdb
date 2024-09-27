import SearchBar from "./SearchBar";
import { HomeLink, NewDrugLink } from "./Links";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useNavigation, useRouteLoaderData } from "react-router-dom";
import { PiSpinnerBold } from "react-icons/pi";
import Logout from "./Logout";

export default function Navbar() {
  const navigation = useNavigation();
  const userProfile = useRouteLoaderData("root") as object;

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleNavbarClick = () => setIsNavbarOpen(!isNavbarOpen);

  return (
    <>
      <header className="w-full text-sm dark:bg-gray-800">
        <nav
          className="container flex justify-around max-w-screen-lg text-white mx-auto md:px-4"
          aria-label="Global"
        >
          <div className="hidden md:flex">
            <HomeLink />
          </div>
          {userProfile ? (
            <div
              className="m-2 w-16 flex md:hidden justify-center items-center rounded-md text-slate-200 bg-slate-600"
              onClick={handleNavbarClick}
            >
              {isNavbarOpen ? <IoMdClose /> : <RxHamburgerMenu />}
            </div>
          ) : (
            <div className="m-2 md:hidden rounded bg-slate-600  hover:bg-cyan-600 flex">
              <HomeLink />
            </div>
          )}
          <div className="hidden md:flex flex-row w-1/4">
            {userProfile && <NewDrugLink />}
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
            {userProfile && <Logout />}
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
          <Logout />
        </li>
      </ul>
    </>
  );
}
