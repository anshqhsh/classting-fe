/**
 * Fisher-Yates shuffle 알고리즘을 사용하여 배열을 뒤섞는 함수.
 * @param {Array} array 뒤섞을 배열.
 * @return {Array} 뒤섞인 새로운 배열.
 */
function shuffleArray<T>(array: Array<T>): Array<T> {
  // 배열을 복사하여 원본 배열이 수정되지 않도록 합니다.
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    // i부터 0까지의 무작위 인덱스를 선택합니다.
    const j = Math.floor(Math.random() * (i + 1));

    // 현재 요소와 무작위로 선택한 요소의 위치를 바꿉니다.
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

// eslint-disable-next-line import/prefer-default-export
export { shuffleArray };
