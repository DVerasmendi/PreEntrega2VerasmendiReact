import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavBar } from "./components/NavBar"
import { ItemListContainer } from "./components/ItemListContainer"
import { Error404 } from "./components/Error404";
import { ItemDetailContainer } from "./components/ItemDetailContainer";

import "./App.css"



function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<ItemListContainer/>} />
      <Route path="/category/:id" element={<ItemListContainer/>} />
      <Route path="/items/:id" element={<ItemDetailContainer/>} />
      <Route path="*" element={<Error404/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App
