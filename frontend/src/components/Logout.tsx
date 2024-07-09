import { redirect, json, Form } from "react-router-dom";

export default function Logout() {
  return (
    <Form action="./admin/logout" method="delete">
      <button className="px-2 h-full w-full flex flex-col justify-center text-white hover:bg-cyan-600">
        Logout
      </button>
    </Form>
  );
}

export const actionLogout = async () => {
  const response = await fetch(import.meta.env.VITE_TEST_ENV + "admin/logout", {
    method: "DELETE",
    headers: { "content-type": "application/json", accept: "*/*" },
    credentials: "include",
  });

  if (!response.ok) {
    throw json({ message: "error" }, { status: 500 });
  } else {
    localStorage.clear();
  }

  return redirect("../../");
};
