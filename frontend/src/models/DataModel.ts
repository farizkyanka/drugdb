export default interface DataModel {
  id: String;
  img: string;
  name: String;
  composition: String;
  form: String;
  category: String;
  pregnancyCategory: String;
  lactationSafety: String;
  manufacturer: String[];
  dose: String;
  indications: String;
  contraIndications: String;
  adverseEffects: String;
  interactions: string[];
}
