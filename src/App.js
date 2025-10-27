import { Console, MissionUtils } from "@woowacourse/mission-utils";

const PROGRESS_BAR = "-";

// 중복되는 자동차 이름 검사하기
const validateCarName = (carName) => {
  const trimmed = String(carName).trim();
  if (!trimmed) {
    throw new Error("자동차 이름을 입력해주세요.");
  }
  if (trimmed.length > 5) {
    throw new Error("자동차 이름은 5글자 이하로 입력해주세요.");
  }
  return trimmed;
};

const readCarNames = async () => {
  const input = await Console.readLineAsync(
    "경주할 자동차 이름을 입력하세요. (이름은 쉼표(,) 기준으로 구분) \n"
  );
  const carNames = input.split(",").map((name) => validateCarName(name));
  return carNames;
};

const validateAttemptCount = (count) => {
  if (!count) {
    throw new Error("시도할 횟수를 입력해주세요.");
  }

  const numCount = Number(count);

  if (Number.isNaN(numCount)) {
    throw new Error("시도할 횟수는 숫자로 입력해주세요.");
  } else if (!Number.isInteger(numCount)) {
    throw new Error("시도할 횟수는 정수로 입력해주세요.");
  } else if (numCount <= 0) {
    throw new Error("시도할 횟수는 0 이상의 양의 정수로 입력해주세요.");
  } else {
    return numCount;
  }
};

const readAttemptCount = async () => {
  const input = await Console.readLineAsync("시도할 횟수는 몇 회인가요? \n");
  const value = validateAttemptCount(input);
  return value;
};

const randomMove = () => {
  const randomValue = MissionUtils.Random.pickNumberInRange(0, 9);
  if (randomValue >= 4) {
    return true;
  } else {
    return false;
  }
};

const startRound = (carNames, movedCars) => {
  carNames.forEach((car) => {
    const canMove = randomMove();
    if (canMove) {
      movedCars.push(car);
    }
  });
  Console.print("\n");
};

class App {
  async run() {
    try {
      const movedCars = [];
      const carNames = await readCarNames();
      const attemptCount = await readAttemptCount();

      Console.print("\n실행 결과\n");

      for (let i = 1; i <= attemptCount; i++) {
        startRound(carNames, movedCars);
      }
    } catch (error) {
      throw new Error(`[ERROR] ${error.message}`);
    }
  }
}

export default App;
