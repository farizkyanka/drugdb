import InteractionsList from "./InteractionsList";
import ManufacturerList from "./ManufacturerList";
import { json, redirect, Form } from "react-router-dom";
import { ActionFunction } from "react-router-dom";
import { FormEvent, useState } from "react";

export default function FormField (
  {
  method = 'post',
  img = "",
  name = "",
  composition = "",
  form = "",
  category = "",
  pregnancyCategory = "",
  lactationSafety = "",
  manufacturer = [""],
  dose = "",
  indication = "",
  contraindication = "",
  adverseEffects = "",
  interactions = [""]
}
) { 

  const [mfr, setMfr] = useState(manufacturer)
  let mfrValue = ""

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    mfrValue = e.target.value
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newArray = [...mfr, mfrValue]
    setMfr(newArray)
  }
    return (
        <>
        <section className="container max-w-screen-lg m-10 mx-auto text-gray">
        <Form method={method} className="grid sm:grid-cols-12 text-center">
          <div className="sm:col-span-3 justify-center text-center p-10">
            <img src={img} className="w-full" />
            <input type='text' name="img" defaultValue={img} placeholder='insert valid image URL'/>
            <input type='text' name="name" defaultValue={name} className="w-full my-3 font-bold text-lg"/>
            <h3 className="w-full">
              <span className="font-bold">Composition: </span>
              <input type='text' name='composition' defaultValue={composition}/>
            </h3>
            <h3 className="w-full">
              <span className="font-bold">Form: </span>
              <input type='text' name="form" defaultValue={form} />
            </h3>
            <h3 className="w-full">
              <span className="font-bold">Category: </span>
              <input type="text" name="category" defaultValue={category}/>
            </h3>
            <h3 className="w-full">
              <span className="font-bold">Manufacturer: </span>
            </h3>
            <ul>
              {mfr.map((manufacture, index) => (
              <input className="bg-blue-400 inline m-2 px-2 rounded text-white" 
              key={index} 
              name="manufacturers" 
              value={manufacture} 
              readOnly/>))}
              </ul>
              <input type="text" name="manufacturer" onChange={(e) => handleChange(e)} />
              <button onClick={(e) => handleSubmit(e)}>Add</button>
          </div>
          <div className="sm:col-span-6 md:text-left p-3 sm:border-4 sm:rounded-lg">
          <div className="m-3">
              <p className="font-bold">Indications: </p>
              <input type="text" name="indication" defaultValue={indication}/>
            </div>
          <div className="m-3">
              <p className="font-bold">Dose: </p>
              <input type="text" name="dose" defaultValue={dose}/>
            </div>
            <div className="m-3">
              <p className="font-bold">Pregnancy Safety: </p>
              <input type="text" name="pregnancyCategory" defaultValue={pregnancyCategory}/>
            </div>
            <div className="m-3">
              <p className="font-bold">Lactation Safety:</p>
              <input type="text" name="lactationSafety" defaultValue={lactationSafety}/>
            </div>
          </div>
          <div className="sm:col-span-3 md:text-left p-3">
          <div className="w-full m-3">
              <p className="font-bold">Contraindications: </p>
              <input type="text" name="contraindication" defaultValue={contraindication}/>
            </div>
          <div className="w-full m-3">
              <p className="font-bold">Adverse Effects: </p>
              <input type="text" name="adverseEffects" defaultValue={adverseEffects}/>
            </div>
            <div className="w-full m-3">
              <p className="font-bold">Interactions: </p>
              <input type="text" name="interactions" defaultValue={interactions}/>
            </div>
          </div>
          <button>Submit</button>
        </Form>

       
      </section>
        </>
    )
}

export const actionForm: ActionFunction = async ({request, params}) => {
  const method = request.method
  const data = await request.formData()
  console.log(data.getAll('manufacturers'))
  const authData = {
    img: data.get('img'),
    name: data.get('name'),
    composition: data.get('composition'),
    form: data.get('form'),
    category: data.get('category'),
    pregnancyCategory: data.get('pregnancyCategory'),
    lactationSafety: data.get('lactationSafety'),
    manufacturer: data.getAll('manufacturers'),
    dose: data.get('dose'),
    indication: data.get('indication'),
    contraindication: data.get('contraindication'),
    adverseEffects: data.get('adverseEffects'),
    interactions: ["a"]
  }
  
  console.log(authData)
  let url = 'http://localhost:5000/drugs'

  const id = params.drugId

  if (method === 'PATCH') {
    url = 'http://localhost:5000/drugs/' + id
  }

  const response = await fetch(url, {
      method: method,
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(authData)
  })
  const responseData = await response.json()
  console.log(responseData)
  if (!response.ok) {
      throw json({message: response}, {status: 500})
  } else {
    return redirect('/drugs/' + responseData._id)
  }
}