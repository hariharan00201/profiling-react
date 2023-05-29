import './App.css';
import AllDashboards from './components/AllDashboards';
import Charts from './components/Charts';
import UploadFile from './components/UploadFile';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" index element={<AllDashboards/>} />
        <Route path="/uploadjfr" element={<UploadFile/>} />
        <Route path="/charts" element={<Charts/>} />
      </Routes>
    </Router>
    // <div className="App">
    //   <Charts/>
    // </div>
  );
}

export default App;
