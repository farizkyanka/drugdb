import './App.css';
import RootLayout from './Pages/RootLayout';
import Home from './Pages/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Content from './components/Content';
import DataModel from './models/DataModel';

const dummy_content: DataModel = {
  id: "n123",
  img:"https://d2qjkwm11akmwu.cloudfront.net/products/594263_20-3-2023_14-13-0.webp",
  name: "Paracetamol",
  composition: "Paracetamol",
  form: "tablet",
  category: "Antipiretik",
  pregnancyCategory: "According to published animal studies, this drug may cause reduced fertility in both males and females described as decreased testicular weights, reduced spermatogenesis, reduced fertility; and reduced implantation sites, respectively. AU TGA pregnancy category A: Drugs which have been taken by a large number of pregnant women and women of childbearing age without any proven increase in the frequency of malformations or other direct or indirect harmful effects on the fetus having been observed.",
  lactationSafety:"Caution is recommended. Excreted into human milk: Yes. Comments; -This drug has been used without apparent harmful effects. -This drug is considered compatible with breastfeeding by the American Academy of Pediatrics. This drug is excreted into breast milk in very small amounts. Published reports reveal peak levels occur 1 to 2 hours after dosing and are undetectable after 12 hours. Reports have also shown infants ingesting 90 mL of breast milk every 3 hours would receive an average of 0.14% (range 0.04% to 0.23%) of the mother's dose; calculated to be a maximum maternal weight-adjusted dose of around 2%. Other studies have shown similar calculated maximal maternal weight adjusted doses (1.1% to 3.6%); these doses are about 0.5% of the lowest recommended infant dose of this drug. A single case of a maculopapular rash has been reported in a 2-month old nursing infant; the rash recurred on rechallenge.",
  manufacturer: ["GSK", "HJ"],
  dose: "dewasa:500mg 3-6 kali/hari, maksimal 4000mg, anak:10mg/kgBB/kali, maksimal 4000mg",
  indications:"Obat ini digunakan untuk meredakan nyeri ringan hingga sedang seperti sakit kepala, sakit gigi, nyeri otot, serta menurunkan demam. ",
  contraIndications:"Alergi terhadap paracetamol",
  adverseEffects:"Gangguan fungsi liver pada dosis tinggi",
  interactions: []
}


const router = createBrowserRouter([{
  path: '/',
  element: <RootLayout/>,
  children: [
    {index: true, element: <Home/>},
    {path: ':drugname', element: <Content items={dummy_content}/>}
  ]
}])

function App() {
  return <RouterProvider router={router}/>
};

export default App;
