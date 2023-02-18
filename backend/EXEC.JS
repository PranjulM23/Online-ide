const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "codes");
// if (!fs.existsSync(outputPath)) {
//   fs.mkdirSync(outputPath, { recursive: true });
// }
const executeCpp = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}`);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath}  &&  ${jobId} < input.txt`,
      (error, stdout, stderr) => {
        error && reject({error,stderr})
        stderr && reject(stderr);   
        resolve(stdout);
      }
    );
  });
};
const executeJava = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];

  return new Promise((resolve, reject) => {
    exec(
      `javac ${filepath} && cd ${outputPath}  && java ${jobId} < input.txt `,
      (error, stdout, stderr) => {
        error && reject({error,stderr})
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};
const executepy = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];

  return new Promise((resolve, reject) => {
    exec(
      `cd ${outputPath} && python ${jobId}.py < input.txt `,
      (error, stdout, stderr) => {
        error && reject({error,stderr})
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};
module.exports = {
  executeCpp,
  executeJava,
  executepy,
};