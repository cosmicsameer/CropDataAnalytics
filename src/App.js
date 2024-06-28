import CropWiseYieldTable from './Components/CropWiseYieldTable';
import YearWiseBestAndWorstProdTable from './Components/YearWiseBestAndWorstProdTable';
// this data below usually comes from the backend through and API, but because the API for this was not found this part is hard-coded 
import { AgroData } from './Data/AgroDataSet';
function App() {
  return (
    <div className="App" >
      <YearWiseBestAndWorstProdTable data={AgroData} />
      <CropWiseYieldTable data={AgroData} />
    </div>
  );
}

export default App;
