import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  const route = useLocation().pathname;
  return (
    <>
      {route !== "/drugdb" ? <Navbar /> : null}
      <main>
        <Outlet />
      </main>
    </>
  );
}
