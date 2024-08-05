require("dotenv").config();
const { exec } = require("child_process");

const sonarToken = process.env.SONAR_TOKEN;

const command = `sonar-scanner \
  -Dsonar.projectKey=FoodOrderApp \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=${sonarToken}`;

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
