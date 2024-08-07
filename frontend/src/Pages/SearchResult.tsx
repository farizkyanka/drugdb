import { Link, useLoaderData } from "react-router-dom";
import DataModel from "../models/DataModel";

export default function SearchResult() {
  type itemType = Array<DataModel>;
  const items = useLoaderData() as itemType;
  return (
    <>
      <section className="p-2 flex justify-center">
        <ul className="flex flex-col w-full lg:w-1/2 items-center">
          {items.map((item, index) => (
            <li key={index} className="border-2 w-full rounded-lg mb-2">
              <Link
                to={`/drugdb/drugs/${item._id}`}
                key={index}
                className="flex flex-row items-center"
              >
                <div
                  className="rounded-md bg-contain bg-no-repeat bg-center w-20 h-20"
                  style={{ backgroundImage: `url(${item.img})` }}
                ></div>
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
    import.meta.env.VITE_TEST_ENV + "drugs/search?category=" + category,
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
