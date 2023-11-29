import axiosInstance from '@/utils/axios';

/**
 * parameter 값이 없으면 default 값으로 설정됨
 * @param {number} amount - 문제 갯수. 값이 없으면 api result return이 안됨 10개로 초기값 설정
 * @param {number} [category] - 퀴즈 카테고리.
 * @param {string} [difficulty] - 문제 난이도 ['easy', 'medium', 'hard']
 */
export default async function getQuizApi(props?: {
  amount?: string;
  category?: string;
  difficulty?: string;
}) {
  const { amount, category, difficulty } = props || {};

  const params: {
    amount: string;
    category?: string;
    difficulty?: string;
  } = { amount: '10' };

  if (amount && amount !== 'default') params.amount = amount;
  if (category && amount !== 'default') params.category = category;
  if (difficulty && amount !== 'default') params.difficulty = difficulty;

  const { data } = await axiosInstance.get('/api.php', { params });
  return data;
}
