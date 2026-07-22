function fibonacci(n) {
  if (n <= 1) return n;
  console.log(n)
  return fibonacci(n - 1) + fibonacci(n - 2);
}

module.exports = fibonacci

// 5
// 1,2,3,5,8

// 0 1 1 2 3

// 1 (1+1) (2+1) (3+2) (5+3)

// 1+2+3+5+8

// 45


// TC: O(2^n)

// 2^45

// complex computer intensive task