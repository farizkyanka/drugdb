import { json, redirect, Form } from "react-router-dom";
import { ActionFunction } from "react-router-dom";
import { FormEvent, useState } from "react";
import Cookies from 'js-cookie'

export default function FormField (
  {
  method = 'POST',
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
  const [mfrString, setMfrString] = useState("")

  const handleMfrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setMfrString(e.target.value)
  }

  const deleteMfrItem = async (index: number) => {
    const newArray = [...mfr]
    newArray.splice(index,1)
    setMfr(newArray)
  }

  const handleMfrSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (mfrString.length === 0) {
      return
    } else {
      const newArray = [...mfr, mfrString]
      setMfr(newArray)
      setMfrString("")
    }
  }

  const [interact, setInteract] = useState(interactions)
  const [interactString, setInteractString] = useState("")

  const handleInteractChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInteractString(e.target.value)
  }

  const deleteInteractItem = async (index: number) => {
    const newArray = [...interact]
    newArray.splice(index,1)
    setInteract(newArray)
  }

  const handleInteractSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (interactString.length === 0) {
      return
    } else {
      const newArray = [...interact, interactString]
      setInteract(newArray)
      setInteractString("")
    }
  }

    return (
        <>
        <section className="container max-w-screen-lg m-10 mx-auto text-gray">
        <Form method={method} className="grid sm:grid-cols-12">
          <div className="sm:col-span-3 justify-center p-1">
            <img src={img} className="w-full" />
            <input type='text' name="img" defaultValue={img} placeholder='insert valid image URL' required/>
            <input type='text' name="name" defaultValue={name} className="w-full my-3 font-bold text-lg text-center" required/>
            <h3 className="w-full">
              <span className="font-bold">Composition: </span>
              <input type='text' name='composition' defaultValue={composition} className="rounded p-1" required/>
            </h3>
            <h3 className="w-full">
              <span className="font-bold">Form: </span>
              <input type='text' name="form" defaultValue={form} className="rounded p-1" required/>
            </h3>
            <h3 className="w-full">
              <span className="font-bold">Category: </span>
              <input type="text" name="category" defaultValue={category} className="rounded p-1" required/>
            </h3>
            <h3 className="text-center">
              <span className="font-bold">Manufacturer: </span>
            </h3>
            <ul className="text-center">
              {mfr.map((manufacture, index) => (
              <input className="bg-blue-400 inline m-2 px-2 rounded text-white hover:bg-red-600 cursor-pointer"
              type="text" 
              key={index} 
              name="manufacturers" 
              value={manufacture}
              onClick={() => {deleteMfrItem(index)}}/>))}
              </ul>
          <input type="text" onChange={(e) => handleMfrChange(e)} value={mfrString} className="rounded p-1"/>
          <button onClick={(e) => handleMfrSubmit(e)}>Add</button>
          </div>
          <div className="sm:col-span-6 md:text-left p-3 sm:border-4 sm:rounded-lg">
          <div className="m-3">
              <p className="font-bold">Indications: </p>
              <input type="text" name="indication" defaultValue={indication} className="rounded p-1" required/>
            </div>
          <div className="m-3">
              <p className="font-bold">Dose: </p>
              <input type="text" name="dose" defaultValue={dose} className="rounded p-1" required/>
            </div>
            <div className="m-3">
              <p className="font-bold">Pregnancy Safety: </p>
              <input type="text" name="pregnancyCategory" defaultValue={pregnancyCategory} className="rounded p-1" required/>
            </div>
            <div className="m-3">
              <p className="font-bold">Lactation Safety:</p>
              <input type="textarea" name="lactationSafety" defaultValue={lactationSafety} className="rounded p-1" required/>
            </div>
          </div>
          <div className="sm:col-span-3 md:text-left p-3">
          <div className="w-full m-3">
              <p className="font-bold">Contraindications: </p>
              <input type="text" name="contraindication" defaultValue={contraindication} className="rounded p-1" required/>
            </div>
          <div className="w-full m-3">
              <p className="font-bold">Adverse Effects: </p>
              <input type="text" name="adverseEffects" defaultValue={adverseEffects} className="rounded p-1" required/>
            </div>
            <div className="w-full m-3">
              <p className="font-bold">Interactions: </p>
              <ul className="text-center">
              {interact.map((int, index) => (
              <input className="bg-blue-400 inline m-2 px-2 rounded text-white hover:bg-red-600 cursor-pointer"
              type="text" 
              key={index} 
              name="interactions" 
              value={int}
              onClick={() => {deleteInteractItem(index)}}/>))}
              </ul>
          <input type="text" onChange={(e) => handleInteractChange(e)} value={interactString} className="rounded p-1"/>
          <button onClick={(e) => handleInteractSubmit(e)}>Add</button>
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
  
  console.log(data.getAll('interactions'))
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
    interactions: data.getAll('interactions')
  }
  
  let url = 'http://localhost:5000/drugs'

  const id = params.drugId

  if (method === 'PATCH') {
    url = 'http://localhost:5000/drugs/' + id
  }

  console.log(authData)

  const response = await fetch(url, {
      method: method,
      headers: {'content-type': 'application/json'},
      credentials: "include",
      body: JSON.stringify(authData)
  })
  const responseData = await response.json()
  if (!response.ok) {
      throw json({message: responseData}, {status: 500})
  } else {
    return redirect('/drugs/' + responseData._id)
  }
}