import "./App.css";
import { NotesView } from "./features/notes";
import { AuthView } from "./features/auth";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<div>Welcome</div>} />
        <Route path="/auth" element={<AuthView />} />
        <Route path="/notes" element={<NotesView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
