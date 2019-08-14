const ru = require('../util/read-util');

function node(text, yNode, nNode) {
  return { text, yNode, nNode };
}

const decisionTree = node(
  '열쇠를 꽂고 돌렸을 때 차가 조용한가?',
  node(
    '배터리 단자가 부식되었는가?',
    node('단자를 깨끗하게 하고 다시 시도하라'),
    node('케이블을 교체하고 다시 시도하라.')
  ),
  node(
    '차에서 달칵거리는 소리가 나는가?',
    node('배터리를 교체하고 다시 시도하라'),
    node(
      '시동이 완전히 걸리지 않는가?',
      node('점화플러그 연결 상태를 점검하라'),
      node(
        '엔진이 동작한 후 바로 꺼지는가?',
        node(
          '차에 연료 분사장치가 있는가?',
          node('초크가 제대로 여닫히는지 확인하라'),
          node('서비스 센터에 의뢰하라')
        )
      )
    )
  )
);

(async () => {
  let node = decisionTree;
  while(true) {
    let answer = await ru.question(node.text + '[Y/n] ');

    if (answer === 'y') {
      node = node.yNode;
    } else {
      node = node.nNode;
    }

    if (!node) {
      break;
    }

    // is terminal node
    if (!node.yNode && !node.nNode) {
      console.log(node.text);
      break;
    }
  }
})();


