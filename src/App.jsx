import { Routes, Route } from "react-router-dom";
import PokemonList from "./PokemonList";
import About from "./About"; // Импортируешь About страницу!

function App() {
  return (
    <Routes>
      <Route path="/" element={<PokemonList />} />
      <Route path="/about/:name" element={<About />} />
    </Routes>
  );
}

export default App;
