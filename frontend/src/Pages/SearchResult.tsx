import { Link, useLoaderData } from "react-router-dom";
import DataModel from "../models/DataModel";

export default function SearchResult() {
  type itemType = Array<DataModel>;
  const items = useLoaderData() as itemType;
  return (
    <>
      <section className="p-2">
        <ul className="flex flex-col w-full items-center">
          {items.map((item, index) => (
            <li className="border-2 w-full rounded-lg mb-2">
              <Link
                to={`/drugs/${item._id}`}
                key={index}
                className="flex flex-row items-center"
              >
                <img src={item.img} className="mr-2 w-20 rounded-lg" />
                <div className="flex flex-col">
                  <h1 className="font-bold">{item.name}</h1>
                  <h2>{item.category}</h2>
                </div>
              </Link>
            </li>
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
