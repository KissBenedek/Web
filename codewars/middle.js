function MiddleMe (X, Y, N) {
  const str = Y.repeat(N);
  const mid = Math.floor(str.length / 2);
  return str.length % 2 === 0 ? str.slice(0, mid) + X + str.slice(mid) : X;
}
