const { execSync } = require('child_process');
const { readFileSync } = require('fs');
const path = require('path');

module.exports = async ({ github, context }) => {
  let testResultJson;
  try {
    execSync(
      'yarn test --silent --runInBand --reporters=default --json --outputFile=test-result.json',
      {
        encoding: 'utf-8',
        stdio: 'inherit',
      }
    );
    const testResultPath = path.join(process.env.GITHUB_WORKSPACE, 'test-result.json');
    const testResult = readFileSync(testResultPath, 'utf8');
    testResultJson = JSON.parse(testResult);
  } catch (error) {
    console.error('Error running tests:', error);
    return;
  }

  // 테스트 결과 처리 및 마크다운 변환 로직 추가
  const resultArray = testResultJson.testResults.map((resultItem) => {
    let ancestorTitle = '';
    const testCaseResult = resultItem.assertionResults.map((test) => {
      ancestorTitle = test.ancestorTitles[0];
      return { testName: test.title, status: test.status };
    });
    return { ancestorTitle, testCaseResult };
  });

  function convertToMarkdownList(data) {
    let result = '';
    data.forEach((item) => {
      result += `- ${item.ancestorTitle}\n`;
      item.testCaseResult.forEach((testCase) => {
        result += `  - ${testCase.status === 'passed' ? '✅' : '❌'} ${testCase.testName}\n`;
      });
    });
    return result;
  }

  const comment = `테스트 결과:\n\`\`\`\n${convertToMarkdownList(resultArray)}\n\`\`\``;

  // 이슈 댓글 생성 로직
  if (context.issue.number) {
    github.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
      body: comment,
    });
  } else {
    console.log('No issue number available for comment');
  }
};
