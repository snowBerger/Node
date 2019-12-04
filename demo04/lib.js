module.exports = function (playerAction) {
  let computeAction
  const randomNum = Math.random() * 3;
  if (randomNum < 1) {
    computeAction = 'jd'
  } else if (randomNum > 2) {
    computeAction = 'bu'
  } else {
    computeAction = 'st'
  }

  console.log(`You: ${playerAction} | System: ${computeAction}`)
  if (playerAction === computeAction) {
    console.log('Draw')
    return 0
  } else {
    if (playerAction === 'st' && computeAction === 'jd'
      || playerAction === 'jd' && computeAction === 'bu'
      || playerAction === 'bu' && computeAction === 'st'
    ) {
      console.log('You Win!')
      return -1
    } else {
      console.log('You Lost!')
      return 1
    }
  }
}
