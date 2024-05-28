import { useLoaderData } from "react-router-dom";
import FormField from "../components/FormField";
import DataModel from "../models/DataModel";

const EditDrug = () => {
  const item = useLoaderData() as DataModel;
  return (
    <>
      <FormField
        method="patch"
        img={item.img}
        name={item.name}
        composition={item.composition}
        form={item.form}
        category={item.category}
        drugorvaccine={item.drugorvaccine}
        fornasRegistered={item.fornasRegistered}
        pregnancyCategory={item.pregnancyCategory}
        lactationSafety={item.lactationSafety}
        manufacturer={item.manufacturer}
        dose={item.dose}
        indication={item.indication}
        contraindication={item.contraindication}
        adverseEffects={item.adverseEffects}
        interactions={item.interactions}
      />
    </>
  );
};

export const editLoader = async ({ params }: { params: any }) => {
  const response = await fetch(
    import.meta.env.VITE_API_URL + "drugs/" + params.drugId,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": import.meta.env.VITE_API_URL,
      },
    }
  );
  return response;
};

export default EditDrug;
