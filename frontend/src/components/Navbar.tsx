import { useState } from "react"
import { Link } from 'react-router-dom'
import DataModel from "../models/DataModel";

export default function Navbar() {

  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([])

  async function fetchQuery (query: string) {
    const response = await fetch('http://localhost:5000/drugs/search?prompt=' + query, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json()
    setSearchResult(data)
  }

  function handleChange(value: string){
    const stringify = value.toString()
    setQuery(stringify);
    fetchQuery(stringify);
  }

  function handleClick () {setQuery("")}

  return (
    <>
      <header className="w-full bg-white text-sm py-4 dark:bg-gray-800">
        <nav
          className="container flex justify-center max-w-screen-lg mx-auto md:px-4"
          aria-label="Global"
        >
          <form className="w-full sm:w-1/2">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                value={query}
                onChange={(e) => handleChange(e.target.value.toString())}/>
            <div className="w-full absolute border border-gray-800 bg-white rounded-b">
            {query && query.length > 0 && searchResult.map((data: DataModel) => {
              return (<Link to={`/drugs/${data._id}`} key={data._id}>
                <div className="hover:bg-blue-500 hover:text-white p-1 flex" 
                     onClick={() => handleClick()}>
                <img src={data.img} className="max-w-10 max-h-10 display-inline rounded"/>
                  <h6 className="m-1">{data.name}</h6>
              </div></Link>
            )})}
            </div>
            </div>
          </form>
        </nav>
      </header>
    </>
  );
}
