import { useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
  const error: any = useRouteError();
  console.error(error);
  return (
    <div className="flex flex-wrap h-20 p-2 justify-center items-center">
      <h6 className="m-2 p-8 rounded border-4 border-red-700 bg-red-100 text-red-700 justify-center text-center">
        {error.message} <br /> Please try again later.
      </h6>
    </div>
  );
}
