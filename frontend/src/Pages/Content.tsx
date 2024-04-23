import DataModel from "../models/DataModel";
import { useLoaderData, Link, Form, json, redirect } from "react-router-dom";
import type { ActionFunction } from "react-router-dom";
import { User } from "../contexts/UserContext";

const Content = () => {
  const item = useLoaderData() as DataModel;

  const isLoggedIn = User().isLoggedIn;

  return (
    <>
      <section className="container max-w-screen-lg m-10 mx-auto text-gray">
        <div className="grid sm:grid-cols-12 text-center">
          <div className="sm:col-span-3 justify-center text-center p-10">
            <img src={item.img} className="w-full" />
            <h2 className="w-full my-3 font-bold text-lg">{item.name}</h2>
            <h3 className="w-full">
              <span className="font-bold">Composition: </span>
              {item.composition}
            </h3>
            <h3 className="w-full">
              <span className="font-bold">Form: </span>
              {item.form}
            </h3>
            <h3 className="w-full">
              <span className="font-bold">Manufacturer: </span>
            </h3>
            <div className="flex flex-wrap justify-center">
              {item.manufacturer.map((manufacture, index) => (
                <div
                  className="bg-blue-400 justify-center inline m-2 px-2 rounded text-white"
                  key={index}
                >
                  {manufacture}
                </div>
              ))}
            </div>

            <h3 className="w-full">
              <span className="font-bold">Category: </span>
              {item.category}
            </h3>
          </div>
          <div className="sm:col-span-6 md:text-left p-3 sm:border-4 sm:rounded-lg">
            <div className="m-3">
              <p className="font-bold">Indications: </p>
              {item.indication}
            </div>
            <div className="m-3">
              <p className="font-bold">Dose: </p>
              {item.dose}
            </div>
            <div className="m-3">
              <p className="font-bold">Pregnancy Safety: </p>
              {item.pregnancyCategory}
            </div>
            <div className="m-3">
              <p className="font-bold">Lactation Safety:</p>
              {item.lactationSafety}
            </div>
          </div>
          <div className="sm:col-span-3 md:text-left p-3">
            <div className="w-full m-3">
              <p className="font-bold">Contraindications: </p>
              <p>{item.contraindication}</p>
            </div>
            <div className="w-full m-3">
              <p className="font-bold">Adverse Effects: </p>
              <p>{item.adverseEffects}</p>
            </div>
            <div className="w-full m-3">
              <p className="font-bold">Interactions: </p>
              <p>{item.interactions}</p>
            </div>
          </div>
        </div>
        {isLoggedIn && (
          <div className="flex justify-evenly mt-4">
            <Link to={`../admin/edit-drug/${item._id}`}>
              <button className="rounded p-2 dark:bg-gray-800 text-white">
                Edit Drug
              </button>
            </Link>
            <Form method="delete">
              <button className="rounded p-2 dark:bg-gray-800 text-white">
                Delete Drug
              </button>
            </Form>
          </div>
        )}
      </section>
    </>
  );
};

export const contentLoader = async ({ params }: { params: any }) => {
  const response = await fetch("http://localhost:5000/drugs/" + params.drugId, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5000/",
    },
  });
  return response;
};

export const actionDeleteDrug: ActionFunction = async ({ request, params }) => {
  const response = await fetch("http://localhost:5000/drugs/" + params.drugId, {
    method: "delete",
    headers: { "content-type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw json({ message: "error" }, { status: 500 });
  }

  return redirect("/");
};

export default Content;
