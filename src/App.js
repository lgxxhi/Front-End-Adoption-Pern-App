import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Pets from "./components/Pets/Pets";
import AddPet from "./components/AddPet/AddPet";
import Pet from "./components/Pet/Pet";
import EditPet from "./components/EditPet/EditPet";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/filter/:filter" element={<Pets />} />
          <Route path="/add-pet" element={<AddPet />} />
          <Route path="/pets/:id" element={<Pet />} />
          <Route path="/pets/:id/edit" element={<EditPet />} />
          <Route path="*" element={<h1>404 Not found!</h1>} />
          {/* <Route path="/404" element={<h1>404 Not found!</h1>} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
