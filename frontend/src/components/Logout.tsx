import { redirect, json, Form } from "react-router-dom";

export default function Logout() {
  return (
    <Form action="/admin/logout" method="delete">
      <button>Logout</button>
    </Form>
  );
}

export const actionLogout =
  ({ logout }: any) =>
  async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "admin/logout",
      {
        method: "DELETE",
        headers: { "content-type": "application/json", accept: "*/*" },
        credentials: "include",
      }
    );

    console.log(response);

    if (!response.ok) {
      throw json({ message: "error" }, { status: 500 });
    }

    logout();

    return redirect("/");
  };
