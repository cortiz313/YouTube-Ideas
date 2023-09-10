// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateIdea from "./pages/CreateIdeas.jsx";
import ShowIdea from "./pages/ShowIdea.jsx";
import EditIdea from "./pages/EditIdea.jsx";
import DeleteIdea from "./pages/DeleteIdea.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ideas/create" element={<CreateIdea />} />
      <Route path="/ideas/details/:id" element={<ShowIdea />} />
      <Route path="/ideas/edit/:id" element={<EditIdea />} />
      <Route path="/ideas/delete/:id" element={<DeleteIdea />} />
    </Routes>
  );
};

export default App;
