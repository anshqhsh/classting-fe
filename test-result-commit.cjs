/* eslint-disable */
const { execSync } = require('child_process');
const { readFileSync } = require('fs');
const path = require('path');

module.exports = async ({ github, context }) => {
  try {
    execSync(
      'yarn test --silent --runInBand --reporters="default" --json --outputFile=test-result.json',
      {
        encoding: 'utf-8',
        stdio: 'inherit',
      }
    );
  } catch (error) {
    throw error;
  } finally {
    const testResultPath = path.join(process.env.GITHUB_WORKSPACE, 'test-result.json');
    const easyResult = readFileSync(testResultPath, 'utf8');
    const easyResultJson = JSON.parse(easyResult);

    const resultArray = easyResultJson.testResults.map((resultItem) => {
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

    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const issueNumber = context.issue.number;

    github.rest.issues.createComment({
      owner,
      repo,
      issue_number: issueNumber,
      body: comment,
    });
  }
};
