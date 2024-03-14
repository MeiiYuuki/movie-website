import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import MovieDetailPage from "./pages/movie/[id]/page";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/movie/:id" element={<MovieDetailPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
