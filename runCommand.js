const { exec } = require('child_process');

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command "${command}": ${stderr}`);
        resolve(); // Continue execution even if the command fails
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
}

(async function() {
  await runCommand('yarn daily-demo-test');
  await runCommand('yarn generate-report');
  await runCommand('yarn send-mail');
})();
