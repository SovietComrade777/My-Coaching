const form = document.getElementById('exam-form');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission
  const physicsTotal = Number(document.getElementById('physics-total').value);
  const physicsAttempted = Number(document.getElementById('physics-attempted').value);
  const physicsCorrect = Number(document.getElementById('physics-correct').value);

  const chemistryTotal = Number(document.getElementById('chemistry-total').value);
  const chemistryAttempted = Number(document.getElementById('chemistry-attempted').value);
  const chemistryCorrect = Number(document.getElementById('chemistry-correct').value);

  const mathsTotal = Number(document.getElementById('maths-total').value);
  const mathsAttempted = Number(document.getElementById('maths-attempted').value);
  const mathsCorrect = Number(document.getElementById('maths-correct').value);

  // Calculate results
  const physicsPercentageTotal = (physicsCorrect / physicsTotal) * 100;
  const physicsPercentageAttempted = (physicsCorrect / physicsAttempted) * 100;
  const chemistryPercentageTotal = (chemistryCorrect / chemistryTotal) * 100;
  const chemistryPercentageAttempted = (chemistryCorrect / chemistryAttempted) * 100;
  const mathsPercentageTotal = (mathsCorrect / mathsTotal) * 100;
  const mathsPercentageAttempted = (mathsCorrect / mathsAttempted) * 100;

  let results = '';
  // results +=`<h1 style="font-family:monospace;color:orange;">:Practise Test 01 PW.</h1>`
  results += `<h2>Physics Results</h2>`;
  results += `<p>Total Questions: ${physicsTotal}</p>`;
  results += `<p>Attempted Questions: ${physicsAttempted}</p>`;
  results += `<p>Correct Answers: ${physicsCorrect}</p>`;
  results += `<p>Percentage of Correct to Total Questions: ${physicsPercentageTotal.toFixed(2)}%</p>`;
  results += `<p>Percentage of Correct to Attempted Questions: ${physicsPercentageAttempted.toFixed(2)}%</p>`;

  results += `<h2>Chemistry Results</h2>`;
  results += `<p>Total Questions: ${chemistryTotal}</p>`;
  results += `<p>Attempted Questions: ${chemistryAttempted}</p>`;
  results += `<p>Correct Answers: ${chemistryCorrect}</p>`;
  results += `<p>Percentage of Correct to Total Questions: ${chemistryPercentageTotal.toFixed(2)}%</p>`;
  results += `<p>Percentage of Correct to Attempted Questions: ${chemistryPercentageAttempted.toFixed(2)}%</p>`;

  results += `<h2>Maths Results</h2>`;
  results += `<p>Total Questions: ${mathsTotal}</p>`;
  results += `<p>Attempted Questions: ${mathsAttempted}</p>`;
  results += `<p>Correct Answers: ${mathsCorrect}</p>`;
  results += `<p>Percentage of Correct to Total Questions: ${mathsPercentageTotal.toFixed(2)}%</p>`;
  results += `<p>Percentage of Correct to Attempted Questions: ${mathsPercentageAttempted.toFixed(2)}%</p>`;

  resultsDiv.innerHTML = results;
});
function getRandomNumber(min, max) {
  // Calculate the range between min and max (inclusive)
  const range = max - min + 1;

  // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // Scale the random decimal to the desired range and add the minimum value
  const randomNumber = Math.floor(randomDecimal * range) + min;

  return randomNumber;
}
// Placeholder function to fetch rank data (replace with your implementation)
function fetchRankData(score, category) {
  return new Promise((resolve, reject) => {
    // Simulate an asynchronous request
    setTimeout(() => {
      const rankData = {
        mains: {
          "<30": 1000000,
          "<40": 230145,
          "<50": 152780,
          "<60":105420,
          "<70":75096,
          "<80":55509,
          "<90":42750,
          "<100":32237,
          "<110":24937,
          "<120":19283,
          "<130":14740,
          "<140":11441,
          "<150":8856,
          "<160":6863,
          "<170":5333,
          "<180":4198,
          "<190":3276,
          "<200":2525,
          "<210":2024,
          "<220":1636,
          "<230":1355,
          "<240":1135,
          "<250":986,
          "<260":876,
          "<270":834,
          "<280":16,
          "<290":8,
          "<300":6,
          "<305":2,
          "<350":1,
          // ... other ranges and ranks for general category
        },
        advanced: {
          "<86":28965,
          "<100":18026,
          "<110":14863,
          "130":11586,
          "<140":9587,
          "<150":8652,
          "<160":7582,
          "<170": 5333,  // 155 to 169
          "<190": 3276,  // 180 to 189
          "<200": 2525,  // 190 to 199
          "<180": 4198,  // 170 to 179
          "<210": 2024,  // 200 to 209
          "<220": 1636,  // 210 to 219
          "<230": 1355,  // 220 to 229
          "<240": 1135,  // 230 to 239
          "<250":  986,  // 240 to 249
          "<260":  876,  // 250 to 259
          "<270":  834,  // 260 to 269
          "<280":   16,  // 270 to 279
          "<290":    8,  // 280 to 289
          "<300":    6,  // 290 to 299
          "<305":    2,  // 300 to 304
          "<350":    1  
        },

      };
      const categoryData = rankData[category];
      let approximateRank;

      for (const range in categoryData) {
        if (score < parseInt(range.slice(1))) {
          approximateRank = categoryData[range];
          break;
        }
      }

      if (approximateRank) {
        resolve(approximateRank);
      } else {
        resolve("Rank data unavailable for this score range."); // Handle out-of-range scores
      }
    }, 1000); // Simulate a delay for the request
  });
}

function predictRank() {
  const score = parseInt(document.getElementById("score").value);
  const category = document.getElementById("category").value;

  // Validate input
  if (isNaN(score) || score < 0) {
    alert("Please enter a valid JEE Main score (non-negative number).");
    return;
  }

  fetchRankData(score, category)
    .then(rank => {
      const predictedRankElement = document.getElementById("predicted-rank");
      predictedRankElement.textContent = typeof rank === "string" ? rank : `Rank :-: ${rank}`;
    })
    .catch(error => {
      console.error("Error fetching rank data:", error);
      alert("An error occurred while predicting your rank. Please try again later.");
    });
}
