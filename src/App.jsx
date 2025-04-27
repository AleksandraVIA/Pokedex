import { Routes, Route } from "react-router-dom";
import PokemonList from "./PokemonList";
import About from "./About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PokemonList />} />
      <Route path="/about/:name" element={<About />} />
    </Routes>
  );
}

export default App;
