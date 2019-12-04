module.exports = function (playerAction) {
  let computeAction
  const randomNum = Math.random() * 3;
  if (randomNum < 1) {
    computeAction = 'scissor'
  } else if (randomNum > 2) {
    computeAction = 'paper'
  } else {
    computeAction = 'rock'
  }

  // console.log(`You: ${playerAction} | System: ${computeAction}`)
  if (playerAction === computeAction) {
    // console.log('Draw')
    return 0
  } else {
    if (playerAction === 'rock' && computeAction === 'scissor'
      || playerAction === 'scissor' && computeAction === 'paper'
      || playerAction === 'paper' && computeAction === 'rock'
    ) {
      // console.log('You Win!')
      return -1
    } else {
      // console.log('You Lost!')
      return 1
    }
  }
}
