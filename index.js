const readline = require('readline');
const functions = require("./util");

const waitingStr = '>>';
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log(waitingStr);
rl.on('line', (input) => {
  const [commad, key, value] = input.split(' ');
  if (!commad) {
    return;
  }

  const commadFunction = functions[commad];
  if (!commadFunction) {
    console.error('erro commad!');
    return;
  }

  const result = commadFunction(key, value);
  if (result !== undefined) {
    console.log(result);
  }
  
  console.log(waitingStr);  
});
