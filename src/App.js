import { Routes, Route, Navigate } from "react-router-dom";
// import { useState } from "react";

import Homepage from "./components/Pages/Homepage";
import DetailPage from "./components/Pages/DetailPage";
// import NotFound from "./components/Pages/NotFound";

function App() {
  // const [details, setDetails] = useState();

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/details/:id" exact element={<DetailPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
