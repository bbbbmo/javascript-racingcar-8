import { Console } from "@woowacourse/mission-utils";

const readCarNames = async () => {
  const cars = await Console.readLineAsync(
    "경주할 자동차 이름을 입력하세요. (이름은 쉼표(,) 기준으로 구분) \n"
  );

  const carNames = cars.split(",");
  carNames.map((car) => {
    const trimmedCar = car.trim();
    validateCarName(trimmedCar);
    return trimmedCar;
  });

  return carNames;
};

const validateCarName = (carName) => {
  if (carName.length > 5) {
    throw new Error("자동차 이름은 5글자 이하로 입력해주세요.");
  }
};

class App {
  async run() {
    try {
      const carsNames = await readCarNames();
      Console.print(carsNames);
    } catch (error) {
      throw new Error(`[ERROR] ${error.message}`);
    }
  }
}

export default App;
