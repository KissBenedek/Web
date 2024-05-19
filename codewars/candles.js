function blowCandles(str) {
  let candleArray = str.split('').map(Number);
  let moves = 0;
  
  while (true) {
    let startIndex = candleArray.findIndex(candle => candle > 0);
    if (startIndex === -1) break;
    for (let i = startIndex; i < startIndex + 3 && i < candleArray.length; i++) {
      if (candleArray[i] > 0) {
        candleArray[i]--;
      }
    }
    moves++;
  }
  return moves;
