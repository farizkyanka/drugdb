export default interface DataModel {
  id: string;
  img: string;
  name: string;
  composition: string;
  form: string;
  category: string;
  pregnancyCategory: string;
  lactationSafety: string;
  manufacturer: string[];
  dose: string;
  indication: string;
  contraindication: string;
  adverseEffects: string;
  interactions: string[];
}
