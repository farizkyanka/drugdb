import { Link } from "react-router-dom";

export const HomeLink = () => (
  <Link
    to=""
    className="mx-2 px-2 flex flex-col justify-center text-white hover:bg-cyan-600"
  >
    <h6>Home</h6>
  </Link>
);

export const NewDrugLink = () => (
  <Link
    to="./admin/new-drug"
    className="mx-2 px-2 flex text-white flex-col justify-center hover:bg-cyan-600"
  >
    <h6>Add new drug</h6>
  </Link>
);

export const LogoutLink = () => (
  <Link
    to="./admin/logout"
    className="mx-2 px-2 flex flex-col justify-center text-white hover:bg-cyan-600"
  >
    <h6>Logout</h6>
  </Link>
);
