import { json, redirect, Form } from "react-router-dom";
import { ActionFunction } from "react-router-dom";
import { FormEvent, useState } from "react";

export default function FormField({
  method = "POST",
  img = "",
  name = "",
  composition = "",
  form = "",
  category = "",
  pregnancyCategory = "",
  lactationSafety = "",
  manufacturer = [],
  dose = "",
  indication = "",
  contraindication = "",
  adverseEffects = "",
  interactions = [],
}) {
  const [mfr, setMfr] = useState(manufacturer);
  const [mfrString, setMfrString] = useState("");

  const handleMfrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMfrString(e.target.value);
  };

  const deleteMfrItem = async (index: number) => {
    const newArray = [...mfr];
    newArray.splice(index, 1);
    setMfr(newArray);
  };

  const handleMfrSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mfrString.length === 0) {
      return;
    } else {
      const newArray = [...mfr, mfrString];
      setMfr(newArray);
      setMfrString("");
    }
  };

  const [interact, setInteract] = useState(interactions);
  const [interactString, setInteractString] = useState("");

  const handleInteractChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInteractString(e.target.value);
  };

  const deleteInteractItem = async (index: number) => {
    const newArray = [...interact];
    newArray.splice(index, 1);
    setInteract(newArray);
  };

  const handleInteractSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (interactString.length === 0) {
      return;
    } else {
      const newArray = [...interact, interactString];
      setInteract(newArray);
      setInteractString("");
    }
  };

  return (
    <>
      <section className="container max-w-screen-lg m-10 mx-auto text-gray">
        <Form method={method}>
          <section className="grid sm:grid-cols-12">
            <div className="sm:col-span-3 justify-center p-3">
              <img src={img} className="w-full rounded" />
              <input
                type="text"
                name="img"
                defaultValue={img}
                placeholder="insert valid image URL"
                className="w-full rounded border-2 p-1 mb-2"
                required
              />
              <input
                type="text"
                name="name"
                placeholder="enter drug name"
                defaultValue={name}
                className="w-full border-2 rounded my-3 font-bold text-lg text-center"
                required
              />
              <h6 className="font-bold">Composition: </h6>
              <input
                type="text"
                name="composition"
                defaultValue={composition}
                className="w-full rounded border-2 p-1 mb-2"
                required
              />
              <h6 className="font-bold">Form: </h6>
              <input
                type="text"
                name="form"
                defaultValue={form}
                className="w-full rounded border-2 p-1 mb-2"
                required
              />
              <h6 className="font-bold">Category: </h6>
              <input
                type="text"
                name="category"
                defaultValue={category}
                className="w-full rounded border-2 p-1 mb-2"
                required
              />
              <div className="flex flex-col rounded border-2">
                <h6 className="font-bold text-center my-1">Manufacturer: </h6>
                <ul className="text-center">
                  {mfr.map((manufacture, index) => (
                    <input
                      className="bg-blue-400 text-center m-2 px-2 rounded text-white hover:bg-red-600 cursor-pointer"
                      type="text"
                      key={index}
                      name="manufacturers"
                      value={manufacture}
                      size={17}
                      onClick={() => {
                        deleteMfrItem(index);
                      }}
                      readOnly={true}
                    />
                  ))}
                </ul>
                <input
                  type="text"
                  onChange={(e) => handleMfrChange(e)}
                  value={mfrString}
                  placeholder="Type manufacturer here"
                  className="w-full border-2 p-1 mb-2"
                />
                <button
                  onClick={(e) => handleMfrSubmit(e)}
                  className="p-3 rounded bg-green-200"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="sm:col-span-6 md:text-left p-3 sm:border-4 sm:rounded-lg">
              <h6 className="font-bold">Indications: </h6>
              <textarea
                name="indication"
                defaultValue={indication}
                className="rounded w-full border-2 p-1 mb-2"
                required
              />
              <p className="font-bold">Dose: </p>
              <textarea
                name="dose"
                defaultValue={dose}
                className="rounded w-full border-2 p-1 mb-2"
                required
              />
              <p className="font-bold">Pregnancy Safety: </p>
              <textarea
                name="pregnancyCategory"
                defaultValue={pregnancyCategory}
                className="rounded w-full border-2 p-1 mb-2"
                required
              />
              <p className="font-bold">Lactation Safety:</p>
              <textarea
                name="lactationSafety"
                defaultValue={lactationSafety}
                className="rounded w-full border-2 p-1 mb-2"
                required
              />
            </div>
            <div className="sm:col-span-3 md:text-left p-3">
              <div className="w-full m-3">
                <p className="font-bold">Contraindications: </p>
                <input
                  type="text"
                  name="contraindication"
                  defaultValue={contraindication}
                  className="rounded border-2 p-1 mb-2"
                  required
                />
              </div>
              <div className="w-full m-3">
                <p className="font-bold">Adverse Effects: </p>
                <input
                  type="text"
                  name="adverseEffects"
                  defaultValue={adverseEffects}
                  className="rounded border-2 p-1 mb-2"
                  required
                />
              </div>
              <div className="w-full m-3 flex flex-col rounded border-2 text-center">
                <p className="font-bold">Interactions: </p>
                <ul className="text-center">
                  {interact.map((int, index) => (
                    <input
                      className="bg-blue-400 inline m-2 px-2 rounded text-white hover:bg-red-600 cursor-pointer"
                      type="text"
                      key={index}
                      name="interactions"
                      value={int}
                      size={17}
                      onClick={() => {
                        deleteInteractItem(index);
                      }}
                      readOnly={true}
                    />
                  ))}
                </ul>
                <input
                  type="text"
                  onChange={(e) => handleInteractChange(e)}
                  value={interactString}
                  placeholder="Type interaction here"
                  className="border-2 p-1 mb-2"
                />
                <button
                  onClick={(e) => handleInteractSubmit(e)}
                  className="p-3 rounded bg-green-200"
                >
                  Add
                </button>
              </div>
            </div>
          </section>
          <section className="grid-cols-12">
            <div className="flex justify-center mt-4">
              <button className="w-1/2 p-2 rounded bg-slate-400 ">
                Submit
              </button>
            </div>
          </section>
        </Form>
      </section>
    </>
  );
}

export const actionForm: ActionFunction = async ({ request, params }) => {
  const method = request.method;
  const data = await request.formData();

  const authData = {
    img: data.get("img"),
    name: data.get("name"),
    composition: data.get("composition"),
    form: data.get("form"),
    category: data.get("category"),
    pregnancyCategory: data.get("pregnancyCategory"),
    lactationSafety: data.get("lactationSafety"),
    manufacturer: data.getAll("manufacturers"),
    dose: data.get("dose"),
    indication: data.get("indication"),
    contraindication: data.get("contraindication"),
    adverseEffects: data.get("adverseEffects"),
    interactions: data.getAll("interactions"),
  };

  let url = "http://localhost:5000/drugs";

  const id = params.drugId;

  if (method === "PATCH") {
    url = "http://localhost:5000/drugs/" + id;
  }

  const response = await fetch(url, {
    method: method,
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify(authData),
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw json({ message: responseData }, { status: 500 });
  } else {
    return redirect("/drugs/" + responseData._id);
  }
};
