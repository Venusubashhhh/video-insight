import "./App.css";
import HomePage from "./pages/home/HomePage";
import Knownface from "./pages/knownface/KnownFace";

// import Loader from './components/loading/Loader'
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Test from './Test'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            {" "}
          </Route>
          <Route path="/knownface" element={<Knownface />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
