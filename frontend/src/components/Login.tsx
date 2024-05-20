import { redirect, Form, json } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50">
        <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div className="text-center text-3xl text-emerald-700 font-bold mb-8">
            Admin Login
          </div>
          <Form method="post">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="rounded-md ring-1 p-2 block my-2 ring-emerald-700 w-full"
              placeholder="username"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="rounded-md ring-1 p-2 block my-2 ring-emerald-700 w-full"
              placeholder="password"
            />
            <button className="transition ease-in-out delay-50 duration-75 rounded-md bg-emerald-700 px-4 py-2 mt-4 hover:shadow-lg text-white">
              Submit
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export const actionLogin =
  ({ login }: any) =>
  async ({ request }: any) => {
    const data = await request.formData();
    const authData = {
      username: data.get("username"),
      password: data.get("password"),
    };

    const response = await fetch(import.meta.env.VITE_API_URL + "admin/login", {
      method: "POST",
      headers: { "content-type": "application/json", accept: "*/*" },
      credentials: "include",
      body: JSON.stringify(authData),
    });

    if (!response.ok) {
      throw json({ message: "error" }, { status: 500 });
    }

    login();

    return redirect("/");
  };
