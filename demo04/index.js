const playerAction = process.argv[process.argv.length - 1];

const game = require('./lib');

// const res = game(playerAction);
// console.log(res);

let count = 0;
process.stdin.on('data', e => {
  const playerAction = e.toString().trim();

  // console.log(playerAction)
  const res = game(playerAction);
  
  if (res === -1) {
    count++;
  } else {
    count = 0;
  }
  if (count === 3) {
    console.log('你太厉害了，我不玩了！！！')
    process.exit()
  }
})