
import DashBoard from "./Components/DashBoard/DashBoard";
import LogSignup from "./Components/LogSignup/LogSignup";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/" element={<LogSignup/>}/>
          <Route path="/dashboard" element={<DashBoard/>}/>

        </Routes>
      </Router>

    
     
    </div>
  );
}

export default App;
