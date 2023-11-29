import useQuizStore from '@/store/useQuizStore';

function QuizPage() {
  const { quizList } = useQuizStore();
  console.log(quizList);
  return <div>QuizPage</div>;
}
export default QuizPage;
