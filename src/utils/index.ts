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

/**
 * 초(second)를 분과 초 형식의 텍스트로 변환하는 함수.
 * @param {number} second - 변환할 시간(초 단위).
 * @returns {string} 분과 초 형식으로 변환된 시간을 나타내는 문자열.
 */
function convertSecToSecOrMinText(second: number): string {
  const minutes = Math.floor(second / 60);
  const seconds = second % 60;
  const flooredSeconds = Math.floor(seconds);

  let convertedTime = '';

  if (minutes > 0) {
    convertedTime += `${minutes}분 `;
    if (flooredSeconds !== 0) {
      convertedTime += `${flooredSeconds}초`;
    }
  } else {
    convertedTime += `${seconds}초`;
  }

  return convertedTime;
}

export { shuffleArray, convertSecToSecOrMinText };
