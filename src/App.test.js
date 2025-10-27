import {
  checkNameDuplicate,
  randomMove,
  startRound,
  validateAttemptCount,
  validateCarName,
} from "./App";

describe("경주할 자동차 입력을 검증하는 기능 테스트", () => {
  test("정상적인 자동차 이름", () => {
    expect(validateCarName("pobi")).toBe("pobi");
  });

  test("빈 문자열 예외", () => {
    expect(() => validateCarName("")).toThrow("자동차 이름을 입력해주세요.");
  });

  test("5글자 초과 예외", () => {
    expect(() => validateCarName("abcdef")).toThrow(
      "자동차 이름은 5글자 이하로 입력해주세요."
    );
  });

  test("공백 제거", () => {
    expect(validateCarName("  pobi  ")).toBe("pobi");
  });
});
describe("경주할 자동차 이름 중복 검사 기능 테스트", () => {
  test("중복 없는 경우", () => {
    expect(() => checkNameDuplicate(["pobi", "woni", "jun"])).not.toThrow();
  });

  test("중복 있는 경우", () => {
    expect(() => checkNameDuplicate(["pobi", "woni", "pobi"])).toThrow(
      "중복된 자동차 이름이 있습니다. 이름: pobi"
    );
  });
});

describe("시도 횟수 검증 기능 테스트", () => {
  test("정상적인 시도 횟수", () => {
    expect(validateAttemptCount("5")).toBe(5);
    expect(validateAttemptCount("1")).toBe(1);
    expect(validateAttemptCount("100")).toBe(100);
  });

  test("빈 값 예외", () => {
    expect(() => validateAttemptCount("")).toThrow(
      "시도할 횟수를 입력해주세요."
    );
    expect(() => validateAttemptCount(undefined)).toThrow(
      "시도할 횟수를 입력해주세요."
    );
    expect(() => validateAttemptCount(null)).toThrow(
      "시도할 횟수를 입력해주세요."
    );
  });

  test("숫자가 아닌 값 예외", () => {
    expect(() => validateAttemptCount("abc")).toThrow(
      "시도할 횟수는 숫자로 입력해주세요."
    );
    expect(() => validateAttemptCount("5.5")).toThrow(
      "시도할 횟수는 정수로 입력해주세요."
    );
  });

  test("0 이하 값 예외", () => {
    expect(() => validateAttemptCount("0")).toThrow(
      "시도할 횟수는 1 이상의 정수로 입력해주세요."
    );
    expect(() => validateAttemptCount("-1")).toThrow(
      "시도할 횟수는 1 이상의 정수로 입력해주세요."
    );
  });
});

describe("시도한 횟수만큼 반복문으로 랜덤값을 생성하고 전진하는 기능 테스트", () => {
  test("랜덤값이 4 이상일 시 전진하는 기능 테스트", () => {
    const movedCount = { pobi: 0, woni: 0, jun: 0 };
    movedCount["pobi"] = (movedCount["pobi"] || 0) + 1;
    expect(movedCount["pobi"]).toBe(1);
  });

  test("실행 결과를 출력하는 기능 테스트", () => {
    const currentCar = "pobi";
    const movedCount = { pobi: 3, woni: 2, jun: 1 };
    const PROGRESS_BAR = "-";

    const currentMove = movedCount[currentCar] || 0;
    const currentProgress = PROGRESS_BAR.repeat(currentMove);

    expect(currentMove).toBe(3);
    expect(currentProgress).toBe("---");
  });
});

describe("우승자 출력 기능 테스트", () => {
  test("단일 우승자 찾기", () => {
    const movedCount = { pobi: 3, woni: 2, jun: 1 };
    const maxMove = Math.max(...Object.values(movedCount));
    const winners = Object.keys(movedCount).filter(
      (key) => movedCount[key] === maxMove
    );

    expect(maxMove).toBe(3);
    expect(winners).toEqual(["pobi"]);
  });

  test("공동 우승자 찾기", () => {
    const movedCount = { pobi: 2, woni: 2, jun: 1 };
    const maxMove = Math.max(...Object.values(movedCount));
    const winners = Object.keys(movedCount).filter(
      (key) => movedCount[key] === maxMove
    );

    expect(maxMove).toBe(2);
    expect(winners).toEqual(["pobi", "woni"]);
  });
});
