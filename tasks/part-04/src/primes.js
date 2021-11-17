export function findPrimes(limit) {
  const sieve = Array.from({ length: limit + 1 }, () => true);
  sieve[0] = sieve[1] = false;
  for (let i = 2; i <= Math.sqrt(limit); i++) {
    for (let j = 2; i * j <= limit; j++) {
      sieve[i * j] = false;
    }
  }
  const primes = [];
  for (const [i, isPrime] of sieve.entries()) {
    if (isPrime) {
      prime.push(i);
    }
  }
  return primes;
}
