import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages';
import QuizPage from './pages/quiz';

function App() {
  return (
    <Routes>
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;
