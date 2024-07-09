import { useLoaderData } from "react-router-dom";
import FormField from "../components/FormField";
import DataModel from "../models/DataModel";
import { routeProtectionCheck } from "../util/auth";

const EditDrug = () => {
  const item = useLoaderData() as DataModel;
  return (
    <>
      <FormField
        method="patch"
        img={item.img}
        name={item.name}
        composition={item.composition}
        strength={item.strength}
        form={item.form}
        category={item.category}
        classValue={item.class}
        fornasRegistered={item.fornasRegistered}
        pregnancyCategory={item.pregnancyCategory}
        lactationSafety={item.lactationSafety}
        manufacturer={item.manufacturer}
        dose={item.dose}
        indication={item.indication}
        contraindication={item.contraindication}
        adverseEffects={item.adverseEffects}
        interactions={item.interactions}
        references={item.references}
      />
    </>
  );
};

export const editLoader = async ({ params }: { params: any }) => {
  routeProtectionCheck();
  const response = await fetch(
    import.meta.env.VITE_TEST_ENV + "drugs/" + params.drugId,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status === 403) {
    localStorage.removeItem("userProfile");
  }
  return response;
};

export default EditDrug;
