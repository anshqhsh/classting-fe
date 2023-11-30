export interface IQuizList {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface IQuizResponse {
  response_code: number;
  results: IQuizList[];
}
