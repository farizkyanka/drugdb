import { json, redirect, Form, useNavigation } from "react-router-dom";
import { ActionFunction } from "react-router-dom";
import { FormEvent, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import toTitleCase from "../util/toTitleCase";
import { PiSpinnerBold } from "react-icons/pi";

export default function FormField({
  method = "POST",
  img = "",
  name = "",
  composition = "",
  strength = [],
  form = "",
  category = "",
  classValue = "",
  fornasRegistered = [] as string[],
  pregnancyCategory = "",
  lactationSafety = "",
  manufacturer = [],
  dose = "",
  indication = "",
  contraindication = "",
  adverseEffects = "",
  interactions = [],
}) {
  const [framedImg, setFramedImg] = useState(img);
  const [imgString, setImgString] = useState("");

  const handleFramedImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImgString(e.target.value);
  };

  const handleImgSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFramedImg(imgString);
  };

  const [stre, setStre] = useState(strength);
  const [strString, setStrString] = useState("");

  const handleStrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setStrString(e.target.value);
  };

  const deleteStrItem = async (index: number) => {
    const newArray = [...stre];
    newArray.splice(index, 1);
    setStre(newArray);
  };

  const handleStrSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (strString.length === 0) {
      return;
    } else {
      const newArray = [...stre, strString];
      setStre(newArray as never[]);
      setStrString("");
    }
  };

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
      setMfr(newArray as never[]);
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
      const newArray = [...interact, interactString] as string[];
      setInteract(newArray as never[]);
      setInteractString("");
    }
  };

  const navigation = useNavigation();

  return (
    <>
      <section className="container max-w-screen-lg m-10 mx-auto text-gray">
        <Form method={method as "POST" | "PATCH"}>
          <section className="grid sm:grid-cols-12">
            <div className="sm:col-span-3 justify-center p-3">
              <div className="flex"></div>
              <img src={framedImg} className="w-full rounded" />
              <div className="flex flex-wrap">
                <input
                  type="text"
                  name="img"
                  onChange={(e) => handleFramedImg(e)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleImgSubmit(e);
                    }
                  }}
                  defaultValue={img}
                  placeholder="insert image URL"
                  className="w-3/4 h-12 rounded border-2 p-3 mb-2"
                />
                <button
                  onClick={handleImgSubmit}
                  className="w-1/4 h-12 text-xs rounded bg-green-200"
                >
                  Add
                </button>
              </div>
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
              <div className="flex flex-col rounded border-2 mb-2">
                <h6 className="font-bold text-center my-1">Strength: </h6>
                <ul className="text-center">
                  {stre.map((str, index) => (
                    <input
                      className="bg-blue-400 text-center m-2 px-2 rounded text-white hover:bg-red-600 cursor-pointer"
                      type="text"
                      key={index}
                      name="strength"
                      value={str}
                      size={17}
                      onClick={() => {
                        deleteStrItem(index);
                      }}
                      readOnly={true}
                    />
                  ))}
                </ul>
                <input
                  type="text"
                  onChange={(e) => handleStrChange(e)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleStrSubmit(e);
                    }
                  }}
                  value={strString}
                  placeholder="Type strength here"
                  className="w-full border-2 p-1 mb-2"
                />
                <button
                  onClick={handleStrSubmit}
                  className="p-3 rounded bg-green-200"
                >
                  Add
                </button>
              </div>
              <h6 className="font-bold">Form: </h6>
              <select
                name="form"
                defaultValue={form}
                required
                className="w-full h-8 rounded p-2 mb-2"
              >
                <option value="tablet">tablet</option>
                <option value="kapsul">kapsul</option>
                <option value="sirup">sirup</option>
                <option value="salep">salep</option>
                <option value="drop">drop</option>
                <option value="puff">puff</option>
                <option value="supositoria">supositoria</option>
                <option value="enema">enema</option>
                <option value="intravena">intravena</option>
                <option value="intramuskular">intramuskular</option>
                <option value="subkutan">subkutan</option>
              </select>
              <h6 className="font-bold">Category: </h6>
              <input
                type="text"
                name="category"
                defaultValue={category}
                className="w-full rounded border-2 p-1 mb-2"
                required
              />
              <h6 className="font-bold">Class: </h6>
              <input
                type="text"
                name="class"
                defaultValue={classValue}
                className="w-full rounded border-2 p-1 mb-2"
                required
              />
              <div className="flex flex-col rounded border-2 mb-2">
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleMfrSubmit(e);
                    }
                  }}
                  value={mfrString}
                  placeholder="Type manufacturer here"
                  className="w-full border-2 p-1 mb-2"
                />
                <button
                  onClick={handleMfrSubmit}
                  className="p-3 rounded bg-green-200"
                >
                  Add
                </button>
              </div>
              <h6 className="font-bold inline">Fornas Registered: </h6>
              <div>
                <input
                  type="checkbox"
                  name="fornas"
                  value="FKTP"
                  defaultChecked={
                    fornasRegistered.includes("FKTP") ? true : false
                  }
                />
                <label className="ml-2">FKTP</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="fornas"
                  value="FKRTL"
                  defaultChecked={
                    fornasRegistered.includes("FKRTL") ? true : false
                  }
                />
                <label className="ml-2">FKRTL</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="fornas"
                  value="PRB"
                  defaultChecked={
                    fornasRegistered.includes("PRB") ? true : false
                  }
                />
                <label className="ml-2">PRB</label>
              </div>
            </div>
            <div className="sm:col-span-9 md:text-left p-3 border-y">
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
              <p className="font-bold">Contraindications: </p>
              <textarea
                name="contraindication"
                defaultValue={contraindication}
                className="rounded w-full border-2 p-1 mb-2"
                required
              />
              <p className="font-bold">Adverse Effects: </p>
              <textarea
                name="adverseEffects"
                defaultValue={adverseEffects}
                className="rounded w-full border-2 p-1 mb-2"
                required
              />

              <p className="font-bold">Interactions: </p>
              <ul>
                {interact.map((int, index) => (
                  <div
                    key={index}
                    className="flex flex-wrap my-2 w-full items-center rounded border-2"
                  >
                    <textarea
                      className="m-2 px-2 bg-none w-11/12"
                      name="interactions"
                      value={`${int}`}
                      readOnly={true}
                    />
                    <FaRegWindowClose
                      className="hover:bg-red-600 rounded hover:text-white cursor-pointer w-6 h-6"
                      onClick={() => {
                        deleteInteractItem(index);
                      }}
                    />
                  </div>
                ))}
              </ul>
              <input
                type="text"
                onChange={(e) => handleInteractChange(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleInteractSubmit(e);
                  }
                }}
                value={interactString}
                placeholder="Type interaction here"
                className="border-2 p-1 mb-2 w-11/12 h-12"
              />
              <button
                onClick={(e) => handleInteractSubmit(e)}
                className="p-3 rounded bg-green-200 h-12"
              >
                Add
              </button>
            </div>
          </section>
          <section className="grid-cols-12">
            <div className="flex justify-center mt-4">
              <button
                disabled={navigation.state === "submitting" ? true : false}
                className={`${
                  navigation.state === "submitting" ? "disabled:opacity-70" : ""
                } w-1/2 p-2 rounded bg-slate-400`}
              >
                {navigation.state === "submitting" ? (
                  <span>
                    Submitting... <PiSpinnerBold className="inline" />
                  </span>
                ) : (
                  "Submit"
                )}
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
    name: toTitleCase(data.get("name") as string),
    composition: data.get("composition"),
    strength: data.getAll("strength"),
    form: data.get("form"),
    category: data.get("category"),
    class: data.get("class"),
    fornasRegistered: data.getAll("fornas"),
    pregnancyCategory: data.get("pregnancyCategory"),
    lactationSafety: data.get("lactationSafety"),
    manufacturer: data.getAll("manufacturers"),
    dose: data.get("dose"),
    indication: data.get("indication"),
    contraindication: data.get("contraindication"),
    adverseEffects: data.get("adverseEffects"),
    interactions: data.getAll("interactions"),
  };
  console.log(authData);
  let url = import.meta.env.VITE_TEST_ENV + "drugs";

  const id = params.drugId;

  if (method === "PATCH") {
    url = import.meta.env.VITE_TEST_ENV + "drugs/" + id;
  }

  const response = await fetch(url, {
    method: method,
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify(authData),
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw json(
      { message: responseData.message },
      { status: responseData.status }
    );
  } else {
    return redirect("../../drugs/" + responseData._id);
  }
};
