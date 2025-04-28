const MAX_SCORES = {
  combinationsTest: 25.5,
  mapIndexTest: 10.0,
  telephoneTest: 11.0,
  readingAloudTest: 24.0,
  shortStoryTestB: 10.0,
};

function getScores() {
  let scores = {
      combinationsTest: parseFloat(localStorage.getItem('combinationsTestScore') || '0'),
      mapIndexTest: parseFloat(localStorage.getItem('mapTestScore') || '0'),
      telephoneTest: parseFloat(localStorage.getItem('telephoneTestScore') || '0'),
      readingAloudTest: parseFloat(localStorage.getItem('readingAloudTestScore') || '0'),
      shortStoryTestB: parseFloat(localStorage.getItem('shortStoryTestBScore') || '0'),
  };

  let cumulative = 0;
  for (const key in scores) {
      cumulative += scores[key];
  }

  scores.cumulative = cumulative;
  return scores;
}

function updateScoresDisplay() {
  const scores = getScores();
  const totalMaxScore = Object.values(MAX_SCORES).reduce((sum, score) => sum + score, 0);

  for (const testName in scores) {
      if (testName !== 'cumulative') {
          const scoreElement = document.getElementById(`${testName}Score`);
          if (scoreElement) {
              scoreElement.textContent = `${testName.replace(/([A-Z])/g, ' $1').trim()} Score: ${scores[testName].toFixed(1)} / ${MAX_SCORES[testName].toFixed(1)}`;
          }
      }
  }

  const cumulativeScoreElement = document.getElementById('cumulativeScore');
  if (cumulativeScoreElement) {
      cumulativeScoreElement.textContent = `Cumulative Score: ${scores.cumulative.toFixed(1)} / ${totalMaxScore.toFixed(1)}`;
  }

  // Add pass/fail message
  const resultBox = document.getElementById('resultBox');
  if (resultBox) {
      if (scores.cumulative >= 0.7 * totalMaxScore) {
          resultBox.textContent = "Congratulations! You passed the test!";
          resultBox.style.backgroundColor = "#4CAF50"; // Green color
      } else {
          resultBox.textContent = "Sorry, you failed the test!";
          resultBox.style.backgroundColor = "#f44336"; // Red color
      }
      resultBox.classList.add('result-box');
  }
}

document.addEventListener('DOMContentLoaded', updateScoresDisplay);

