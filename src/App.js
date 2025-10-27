import { Console, MissionUtils } from "@woowacourse/mission-utils";

export const PROGRESS_BAR = "-";

export const validateCarName = (carName) => {
  const trimmed = String(carName).trim();
  if (!trimmed) {
    throw new Error("자동차 이름을 입력해주세요.");
  }
  if (trimmed.length > 5) {
    throw new Error("자동차 이름은 5글자 이하로 입력해주세요.");
  }
  return trimmed;
};

export const checkNameDuplicate = (carNames) => {
  const nameSet = new Set();
  for (const name of carNames) {
    if (nameSet.has(name)) {
      throw new Error(`중복된 자동차 이름이 있습니다. 이름: ${name}`);
    }
    nameSet.add(name);
  }
};

export const readCarNames = async () => {
  const input = await Console.readLineAsync(
    "경주할 자동차 이름을 입력하세요. (이름은 쉼표(,) 기준으로 구분) \n"
  );
  const rawNames = input.split(",");
  const carNames = rawNames.map((name) => validateCarName(name));
  checkNameDuplicate(carNames);

  return carNames;
};

// 시도 횟수 유효성 검사
export const validateAttemptCount = (count) => {
  if (count === undefined || count === null || String(count).trim() === "") {
    throw new Error("시도할 횟수를 입력해주세요.");
  }

  const numCount = Number(count);

  if (Number.isNaN(numCount)) {
    throw new Error("시도할 횟수는 숫자로 입력해주세요.");
  } else if (!Number.isInteger(numCount)) {
    throw new Error("시도할 횟수는 정수로 입력해주세요.");
  } else if (numCount <= 0) {
    throw new Error("시도할 횟수는 1 이상의 정수로 입력해주세요.");
  } else {
    return numCount;
  }
};

export const readAttemptCount = async () => {
  const input = await Console.readLineAsync("시도할 횟수는 몇 회인가요? \n");
  const value = validateAttemptCount(input);
  return value;
};

export const randomMove = () => {
  const randomValue = MissionUtils.Random.pickNumberInRange(0, 9);
  return randomValue >= 4;
};

export const printProgress = (currentCar, movedCount) => {
  const currentMove = movedCount[currentCar] || 0;
  const currentProgress = PROGRESS_BAR.repeat(currentMove);
  Console.print(`${currentCar} : ${currentProgress}`);
};

export const startRound = (carNames, movedCount) => {
  carNames.forEach((car) => {
    if (randomMove()) {
      movedCount[car] = (movedCount[car] || 0) + 1;
    }
    printProgress(car, movedCount);
  });
  Console.print("\n");
};

export const printWinner = (movedCount) => {
  const maxMove = Math.max(...Object.values(movedCount));
  const winners = Object.keys(movedCount).filter(
    (key) => movedCount[key] === maxMove
  );
  Console.print(`최종 우승자 : ${winners.join(", ")}`);
};

export const runCarRace = async () => {
  const movedCount = {};
  const carNames = await readCarNames();
  const attemptCount = await readAttemptCount();

  carNames.forEach((name) => {
    movedCount[name] = 0;
  });

  Console.print("\n실행 결과\n");

  for (let i = 1; i <= attemptCount; i++) {
    startRound(carNames, movedCount);
  }

  printWinner(movedCount);
};

class App {
  async run() {
    try {
      await runCarRace();
    } catch (error) {
      throw new Error(`[ERROR] ${error.message}`);
    }
  }
}

export default App;
