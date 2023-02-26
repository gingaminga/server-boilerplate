/**
 * @description JSON parsing하기
 * @param value JSON.stringify가 적용된 문자열
 */
export const parseJSON = <T>(value: string) => {
  try {
    const realValue: T = JSON.parse(value);

    return realValue;
  } catch (error) {
    /* empty */
  }

  return null;
};
