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
import styles from './mainPage.module.scss';

function MainPage() {
  const [category, setCategory] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('');
  const [qustionsNum, setQustionsNum] = useState<string>('');
  const navigate = useNavigate();
  return (
    <div className={styles.mainWrapper}>
      <Stack gap={24}>
        <Select setValue={setCategory}>
          <Select.Trigger>
            <Typography className={styles.label} variant="button">
              {category || '카테고리 선택'}
            </Typography>
          </Select.Trigger>
          <Select.ItemUl>
            {SELECT_CATEGORY_VALUE.map((v, idx) => (
              <Select.Item key={v.value} value={v.text} index={idx} />
            ))}
          </Select.ItemUl>
        </Select>
        <Select setValue={setDifficulty}>
          <Select.Trigger>
            <Typography className={styles.label} variant="button">
              {difficulty || '난이도 선택'}
            </Typography>
          </Select.Trigger>
          <Select.ItemUl>
            {SELECT_DIFFICULTY_VALUE.map((v, idx) => (
              <Select.Item key={v.value} value={v.text} index={idx} />
            ))}
          </Select.ItemUl>
        </Select>
        <Select setValue={setQustionsNum}>
          <Select.Trigger>
            <Typography className={styles.label} variant="button">
              {qustionsNum || '문제 갯수'}
            </Typography>
          </Select.Trigger>
          <Select.ItemUl>
            {SELECT_QUESTIONS_NUM_VALUE.map((v, idx) => (
              <Select.Item key={v.value} value={v.text} index={idx} />
            ))}
          </Select.ItemUl>
        </Select>

        <Button
          onClick={() => {
            navigate('/quiz');
          }}
        >
          퀴즈 풀기
        </Button>
      </Stack>
    </div>
  );
}

export default MainPage;
