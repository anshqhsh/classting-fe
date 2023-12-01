## DEPLOY

## 구현 사항

- [x] 사용자는 '퀴즈 풀기 버튼을 클릭하여 퀴즈 풀기를 시작할 수 있다.
  - api에서 가져온 값은 zustand를 활용해서 값으로 저장한뒤 redirect 하도록 구현 하였습니다.
  - api param는 composition 패턴을 활용하여 보다 유연하고 확장가능한 형태로 구조를 가진 Select 컴포넌트를 구현 하여 사용 하였습니다.
- [x] 사용자는 문항에 대한 답안을 4개 보기 중에 선택할 수 있다.

  - shuffleArray 유틸 함수를 구현해 맞는 답안과 틀린 답안을 섞어서 화면에 렌더링 하였습니다.

- [x] 사용자는 답안을 선택하면 다음 문항을 볼 수 있다.

  - store에서 list 값을 저장하고 quizProgress값을 통해서 현재 풀고있는 index값과 이전 답들을 저장하는 방식으로 구현 하였습니다.

- [x] 답안 선택 후 다음 문항 버튼을 볼 수 있다.
- [x] 답안이 맞았는지 틀렸는지 바로 알 수 있다.
  - toast message로 정오답 여부 보여주도록 구현 하였습니다.
- [x] 다음 문항 버튼을 클릭하여 다음 문항으로 이동할 수 있다.
- [x] 모든 문항을 다 풀면 사용자는 다음과 같은 결과 정보를 볼 수 있다.
  - [x] 퀴즈를 마칠 때까지 소요된 시간
    - 타이머 컴포넌트를 추가하여 구현
    - setInterval함수를 활용하여 구현 하였습니다.
    - zustand store 타이머 값을 관리
    - timer는 1초에 한번씩 값이 업데이트 되기 때문에 기존 store에서 값을 가져오는 방식은 매초마다 렌더링 이슈가 있어 값을 불러올때 구독한 값만 불러 오도록 셀렉터 방식으로 store값을 가져오도록 변경 했습니다.
    - timer를 따로 store로 관리 하는 것보단 관련된 값을 한 곳에서 관리하는게 좀 더 목적에 맞아서 한 곳에서 값들을 관리 하였습니다.
  - [x] 정답 개수
  - [x] 오답 수
  - [x] 정 오답에 대한 비율을 차트로 표기
    - chart.js를 사용하여 도넛 차트를 구현 하였습니다.
- [x] 오답 노트 기능
  - zustand persist를 활용해서 Localstorage에 구현 하였습니다.
  - 각 문제에 메모 기능을 추가 하였습니다.
  - 문제 삭제 버튼을 통해 오답 노트 값을 삭제 할 수 있습니다.

- 이외의 구현 사항은 해당 PR에 추가적인 코멘트가 있습니다. 참고해주시면 감사하겠습니다!

## 테스트 관련

- ci를 구현 하여 main branch PR 시에 테스트 자동화를 구현 하였습니다.
- util 함수 테스트를 진행 하였습니다.
- 각 페이지 테스트를 진행 하고 싶었으나 테스트 코드 작성 미숙과 시간 부족을 완료하지 못하였습니다.
  추후에 기회가 있다면 더 공부 한뒤 작성 하겠습니다.
