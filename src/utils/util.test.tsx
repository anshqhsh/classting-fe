import { convertSecToSecOrMinText, shuffleArray } from '.';

describe('shuffleArray', () => {
  it('should shuffle the array without modifying the original array', () => {
    const array = [1, 2, 3, 4, 5];
    const originalArray = [...array];
    const shuffledArray = shuffleArray(array);

    expect(shuffledArray).not.toEqual(originalArray);
    expect(array).toEqual(originalArray);
    expect(shuffledArray.length).toBe(originalArray.length);
  });
});

describe('convertSecToSecOrMinText', () => {
  it('should convert seconds to a text format of minutes and seconds', () => {
    expect(convertSecToSecOrMinText(70)).toBe('1분 10초');
    expect(convertSecToSecOrMinText(60)).toBe('1분 ');
    expect(convertSecToSecOrMinText(50)).toBe('50초');
    expect(convertSecToSecOrMinText(0)).toBe('0초');
  });
});
