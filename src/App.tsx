import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages';

function App() {
  return (
    <Routes>
      <Route path="/quiz" element={<App />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;
