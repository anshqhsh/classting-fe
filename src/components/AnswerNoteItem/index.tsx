import useAnswerNoteStore, { IWrongQuizAddMemoList } from '@/store/useAnswerNoteStore';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Typography from '../Typography';
import styles from './answerNoteItem.module.scss';
import Button from '../Buttons/Button';

function AnswerNoteItem(props: IWrongQuizAddMemoList) {
  const {
    category,
    difficulty,
    correct_answer: correctAnswer,
    selectAnswer,
    question,
    solved_at: solvedAt,
    memo,
  } = props;
  const [textInput, setTextInput] = useState(memo);
  const { updateMemo, removeQuiz } = useAnswerNoteStore();

  const onClickDeleteItem = () => {
    removeQuiz(solvedAt);
    toast.success('삭제 되었습니다.');
  };

  const onClickSaveMemo = () => {
    updateMemo(solvedAt, textInput);
    toast.success('저장 되었습니다.');
  };

  return (
    <div className={styles.container}>
      <div className={styles.quizInfo}>
        <Typography className={styles.category} variant="body1">{`카테고리: ${atob(
          category
        )}`}</Typography>
        <Typography className={styles.difficulty} variant="body1">{`난이도: ${atob(
          difficulty
        )}`}</Typography>
        <button type="button" className={styles.deleteButton} onClick={onClickDeleteItem}>
          x
        </button>
      </div>
      <Typography variant="main">{`문제: ${atob(question)}`}</Typography>
      <div className={styles.answerInfo}>
        <Typography className={styles.correctAnswer} variant="body1">{`정답: ${atob(
          correctAnswer
        )}`}</Typography>
        <Typography className={styles.wrongAnswer} variant="body1">{`고른답: ${atob(
          selectAnswer
        )}`}</Typography>
      </div>
      <textarea
        value={textInput}
        onChange={(e) => {
          setTextInput(e.target.value);
        }}
        className={styles.textArea}
        placeholder="메모를 입력하세요"
      />
      <div className={styles.buttonWrapper}>
        <Button type="button" onClick={onClickSaveMemo}>
          저장
        </Button>
      </div>
    </div>
  );
}
export default AnswerNoteItem;
