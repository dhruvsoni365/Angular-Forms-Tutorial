/**
 * Calculates the factorial of a number
 * @param {number} n - The number to calculate factorial for
 * @returns {number} The factorial of n
 */
function factorial(n) {
  // Handle edge cases
  if (n < 0) {
    throw new Error('Factorial is not defined for negative numbers');
  }
  
  if (n === 0 || n === 1) {
    return 1;
  }
  
  // Calculate factorial iteratively
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  
  return result;
}

// Example usage
console.log('Factorial of 5:', factorial(5));   // 120
console.log('Factorial of 0:', factorial(0));   // 1
console.log('Factorial of 10:', factorial(10)); // 3628800

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = factorial;
}
