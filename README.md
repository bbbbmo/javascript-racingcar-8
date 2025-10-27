# javascript-racingcar-precourse

**에러 처리 기능**

- try ~ catch 문으로 에러를 catch했다면 [ERROR]로 시작하는 에러 메세지를 반환

**경주할 자동차 입력을 받고 이름을 검증하는 기능**

- 입력: 입력한 자동차를 join으로 분리해 배열에 저장
  - `Console.readLineAsync()`
- 출력: “경주할 자동차 이름을 입력하세요.”
  - `Console.readLineAsync()`
- 검증: 길이 5이하의 문자열인지 확인, 아니라면 에러 throw

**시도할 횟수를 입력받고 검증하는 기능**

- 입력: 시도할 횟수를 입력받아 저장
  - `Console.readLineAsync()`
- 출력: “시도할 횟수는 몇 회인가요?”
  - `Console.readLineAsync()`
- 검증: 숫자인지 확인, 아니라면 에러 throw

**시도할 횟수만큼 반복문으로 돌며 자동차마다 랜덤값을 생성하는 기능**

- `MissionUtils.Random.pickNumberInRange(0, 9);`

**자동차를 전진하는 기능**

- 랜덤값이 4 이상일 시 1 전진
- 전진한 자동차를 배열에 push

**실행 결과를 출력하는 기능**

- 출력: 처음에는 “실행 결과”를 출력, 이후 각 자동차 이름과 전진 횟수를 -로 표시
  - `Console.print()`

**우승 결과를 출력하는 기능**

- 출력: 최종 우승자 :
  - 가장 많은 전진 횟수를 가진 자동차를 출력
  - 동일한 전진 횟수를 가진 자동차가 여러대라면 쉼표로 구분해 출력
  - `Console.print()`
