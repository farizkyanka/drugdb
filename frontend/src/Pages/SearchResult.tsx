import { Link, useLoaderData } from "react-router-dom";
import DataModel from "../models/DataModel";

export default function SearchResult() {
  type itemType = Array<DataModel>;
  const item = useLoaderData() as itemType;
  return (
    <>
      <section className="container flex justify-center p-2">
        <ul className="flex flex-col w-full">
          {item.map((it, index) => (
            <Link to={`/drugs/${it._id}`} key={index}>
              <li className="flex flex-row m-2 border-2 rounded w-full">
                <img src={it.img} className="mx-2 w-20" />
                <div className="flex flex-col">
                  <h1>{it.name}</h1>
                  <h2>{it.category}</h2>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </>
  );
}

export const searchLoader = async ({ request }: any) => {
  const category = new URL(request.url).searchParams.get("category");
  const response = await fetch(
    "http://localhost:5000/drugs/search?category=" + category,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};
