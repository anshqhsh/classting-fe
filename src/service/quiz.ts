import axiosInstance from '@/utils/axios';

/**
 * parameter 값이 없으면 default 값으로 설정됨
 * @param {number} amount - 문제 갯수.
 * @param {number} [category] - 퀴즈 카테고리.
 * @param {string} [difficulty] - 문제 난이도 ['easy', 'medium', 'hard']
 */
export default async function getQuizApi(props?: {
  amount?: number;
  category?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}) {
  const { amount, category, difficulty } = props || {};

  const params = {
    amount,
    ...(category && { category }),
    ...(difficulty && { difficulty }),
  };
  const data = await axiosInstance.get('/api.php', { params });
  return data;
}
