import { useLoaderData, Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function Home() {
  interface categories {
    categories: Array<string>;
  }

  const categories = useLoaderData() as categories;

  return (
    <section className="w-screen h-screen flex-col flex bg-gradient-to-r from-blue-200 to-cyan-200 items-center justify-center">
      <div className="w-full h-6 mb-auto"></div>
      <div className="w-full text-center justify-center">
        <h1 className="text-5xl p-4 italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
          drugdb
        </h1>
      </div>
      <div className="w-1/2 p-10">
        <SearchBar />
      </div>
      <div className="w-full flex justify-center">
        <h1>Search by category</h1>
      </div>
      <div className="container flex flex-wrap justify-center max-w-screen-xl text-center">
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
      <Link to={"./admin/login"} className="w-full h-6 mt-auto" />
    </section>
  );
}

export const HomeLoader = async () => {
  const API = import.meta.env.VITE_TEST_ENV;
  const response = await fetch(API + "drugs/list-drug-categories", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
