function divisors(n) {
  let result = [];

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      result.push(i);
      if (i !== n / i) {
        result.push(n / i);
      }
    }
  }

  result.sort((a, b) => a - b);

  return result.length ? result : `${n} is prime`;
};
