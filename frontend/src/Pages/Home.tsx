import { useLoaderData, Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function Home() {
  interface categories {
    categories: Array<string>;
  }

  const categories = useLoaderData() as categories;

  return (
    <section className="w-screen h-screen flex-col flex bg-slate-400 items-center justify-center">
      <div className="w-full text-center justify-center">
        <h1 className="text-xl p-10">welcome to drugdb</h1>
      </div>
      <div className="w-1/2 p-10">
        <SearchBar />
      </div>
      <div className="w-full flex justify-center">
        <h1>Search by category</h1>
      </div>
      <div className="container flex justify-center max-w-screen-xl text-center">
        {categories.categories.map((category, index) => (
          <Link to={`drugs/searchresult?category=` + category} key={index}>
            <div
              className="flex items-center m-2 px-2 py-1 rounded bg-blue-300"
              key={index}
            >
              {category}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export const HomeLoader = async () => {
  const response = await fetch(
    "http://localhost:5000/drugs/list-drug-categories",
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
    }
  );
  return response;
};
