import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages';
import QuizPage from './pages/quiz';
import ResultPage from './pages/result';
import AnswerNotePage from './pages/answerNote';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/answer-note" element={<AnswerNotePage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;
