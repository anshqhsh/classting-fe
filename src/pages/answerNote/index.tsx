import useAnswerNoteStore from '@/store/useAnswerNoteStore';
import Stack from '@/components/Stack';
import AnswerNoteItem from '@/components/AnswerNoteItem';

function AnswerNotePage() {
  const wrongQuizList = useAnswerNoteStore((state) => state.wrongQuizList);

  return (
    <Stack>
      {wrongQuizList.map((v) => (
        <AnswerNoteItem
          key={v.solved_at}
          selectAnswer={v.selectAnswer}
          created_at={v.created_at}
          solved_at={v.solved_at}
          type={v.type}
          difficulty={v.difficulty}
          category={v.category}
          question={v.question}
          correct_answer={v.correct_answer}
          incorrect_answers={v.incorrect_answers}
          memo={v.memo}
        />
      ))}
    </Stack>
  );
}

export default AnswerNotePage;
