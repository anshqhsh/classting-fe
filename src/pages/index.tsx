import Button from '@/components/Buttons/Button';
import Stack from '@/components/Stack';
import Select from '@/components/Select';
import Typography from '@/components/Typography';
import { useState } from 'react';
import {
  SELECT_CATEGORY_VALUE,
  SELECT_DIFFICULTY_VALUE,
  SELECT_QUESTIONS_NUM_VALUE,
} from '@/constants/quiz';
import { useNavigate } from 'react-router-dom';
import getQuizApi from '@/service/quiz';
import LoadingUI from '@/components/LoadingUI';
import useQuizStore from '@/store/useQuizStore';
import styles from './mainPage.module.scss';

function MainPage() {
  const [category, setCategory] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const { setQuizList } = useQuizStore();

  const navigate = useNavigate();

  const onClickGetQuestions = async () => {
    setIsLoading(true);
    const data = await getQuizApi({ amount, category, difficulty });
    setIsLoading(false);

    setQuizList(data.results);
    navigate('/quiz');
  };

  const categoryText =
    SELECT_CATEGORY_VALUE.find((value) => value.value === category)?.text || '카테고리 선택';
  const difficultyText =
    SELECT_DIFFICULTY_VALUE.find((value) => value.value === difficulty)?.text || '난이도 선택';
  const questionNumText =
    SELECT_QUESTIONS_NUM_VALUE.find((value) => value.value === amount)?.text || '문제 갯수';

  return (
    <div>
      {isLoading ? (
        <LoadingUI type="center" />
      ) : (
        <div className={styles.mainWrapper}>
          <Stack gap={24}>
            <Select setValue={setCategory}>
              <Select.Trigger>
                <Typography className={styles.label} variant="button">
                  {categoryText}
                </Typography>
              </Select.Trigger>
              <Select.ItemUl>
                {SELECT_CATEGORY_VALUE.map((v, idx) => (
                  <Select.Item key={v.value} value={v.value} text={v.text} index={idx} />
                ))}
              </Select.ItemUl>
            </Select>
            <Select setValue={setDifficulty}>
              <Select.Trigger>
                <Typography className={styles.label} variant="button">
                  {difficultyText}
                </Typography>
              </Select.Trigger>
              <Select.ItemUl>
                {SELECT_DIFFICULTY_VALUE.map((v, idx) => (
                  <Select.Item key={v.value} value={v.value} text={v.text} index={idx} />
                ))}
              </Select.ItemUl>
            </Select>
            <Select setValue={setAmount}>
              <Select.Trigger>
                <Typography className={styles.label} variant="button">
                  {questionNumText}
                </Typography>
              </Select.Trigger>
              <Select.ItemUl>
                {SELECT_QUESTIONS_NUM_VALUE.map((v, idx) => (
                  <Select.Item key={v.value} value={v.value} text={v.text} index={idx} />
                ))}
              </Select.ItemUl>
            </Select>

            <Button onClick={onClickGetQuestions}>퀴즈 풀기</Button>
          </Stack>
        </div>
      )}
    </div>
  );
}

export default MainPage;
