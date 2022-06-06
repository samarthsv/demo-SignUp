import SignUp from "./Screen/SignUp";
import LogIn from "./Screen/LogIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Screen/Welcome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
