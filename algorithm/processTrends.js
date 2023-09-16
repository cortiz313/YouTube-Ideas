const { exec } = require("child_process");

exec("python fetchTrends.py", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  const trends = JSON.parse(stdout);
  // Process the trends data in JavaScript
  console.log(trends);
});
