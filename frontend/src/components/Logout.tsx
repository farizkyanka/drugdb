import { redirect, json, Form } from "react-router-dom";

export default function Logout() {
  return (
    <Form action="/admin/logout" method="delete">
      <button>Logout</button>
    </Form>
  );
}

export const loaderLogout =
  ({ logout }: any) =>
  async () => {
    const response = await fetch(
      import.meta.env.VITE_TEST_ENV + "admin/logout",
      {
        method: "DELETE",
        headers: { "content-type": "application/json", accept: "*/*" },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw json({ message: "error" }, { status: 500 });
    }

    logout();

    return redirect(".");
  };
