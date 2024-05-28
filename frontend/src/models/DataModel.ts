export default interface DataModel {
  _id: string;
  img: string;
  name: string;
  composition: string;
  form: string;
  category: string;
  drugorvaccine: string;
  fornasRegistered: boolean;
  pregnancyCategory: string;
  lactationSafety: string;
  manufacturer: [];
  dose: string;
  indication: string;
  contraindication: string;
  adverseEffects: string;
  interactions: [];
  lastUpdated: string;
}
