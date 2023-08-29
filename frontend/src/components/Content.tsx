import DataModel from '../models/DataModel';

const Content: React.FC<{ items: DataModel }> = (props) => {
  return (
    <>
      <section className="container max-w-screen-lg m-10 mx-auto text-gray ">
        <div className="grid sm:grid-cols-12 text-center">
          <div className="sm:col-span-3 justify-center text-center p-10">
            <img src={props.items.img} className="w-full" />
            <h2 className="w-full my-3 font-bold text-lg">
              {props.items.name}
            </h2>
            <h3 className="w-full">
              <span className="font-bold">Composition: </span>
              {props.items.composition}
            </h3>
            <h3 className="w-full">
              <span className="font-bold">Form: </span>
              {props.items.form}
            </h3>
            <h3 className="w-full">
              <span className="font-bold">Manufacturer: </span>
              <ul>
                {props.items.manufacturer.map((item) => (
                  <li className="bg-blue-400 inline m-2 px-2 rounded text-white">
                    {item}
                  </li>
                ))}
              </ul>
            </h3>
            <h3 className="w-full">
              <span className="font-bold">Category: </span>
              {props.items.category}
            </h3>
          </div>
          <div className="sm:col-span-6 md:text-left p-3 sm:border-4 sm:rounded-lg">
          <div className="m-3">
              <p className="font-bold">Indications: </p>
              {props.items.indications}
            </div>
          <div className="m-3">
              <p className="font-bold">Dose: </p>
              {props.items.dose}
            </div>
            <div className="m-3">
              <p className="font-bold">Pregnancy Safety: </p>
              {props.items.pregnancyCategory}
            </div>
            <div className="m-3">
              <p className="font-bold">Lactation Safety:</p>
              {props.items.lactationSafety}
            </div>
          </div>
          <div className="sm:col-span-3 md:text-left p-3">
          <div className="w-full m-3">
              <p className="font-bold">Contraindications: </p>
              <p>{props.items.contraIndications}</p>
            </div>
          <div className="w-full m-3">
              <p className="font-bold">Adverse Effects: </p>
              <p>{props.items.adverseEffects}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Content;
// {props.items.img}-
// {props.items.name}-
// {props.items.composition}-
// {props.items.form}-
// {props.items.category}-
// {props.items.manufacturer}-
// {props.items.indications}-
// {props.items.dose}-
// {props.items.pregnancyCategory}-
// {props.items.lactationSafety}-
// {props.items.contraIndications}-
// {props.items.adverseEffects}-
