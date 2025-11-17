// Test suite for Fibonacci calculations

function generateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const series = [0, 1];
    
    for (let i = 2; i < n; i++) {
        series.push(series[i - 1] + series[i - 2]);
    }
    
    return series;
}

// Test cases
const tests = [
    { input: 1, expected: [0], description: "Single term" },
    { input: 2, expected: [0, 1], description: "Two terms" },
    { input: 5, expected: [0, 1, 1, 2, 3], description: "Five terms" },
    { input: 10, expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34], description: "Ten terms" },
    { input: 15, expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377], description: "Fifteen terms" },
    { input: 0, expected: [], description: "Zero terms (edge case)" },
    { input: -5, expected: [], description: "Negative input (edge case)" }
];

console.log("Running Fibonacci Tests...\n");

let passed = 0;
let failed = 0;

tests.forEach((test, index) => {
    const result = generateFibonacci(test.input);
    const isEqual = JSON.stringify(result) === JSON.stringify(test.expected);
    
    if (isEqual) {
        console.log(`✅ Test ${index + 1} PASSED: ${test.description}`);
        console.log(`   Input: ${test.input}, Output: [${result.join(', ')}]`);
        passed++;
    } else {
        console.log(`❌ Test ${index + 1} FAILED: ${test.description}`);
        console.log(`   Input: ${test.input}`);
        console.log(`   Expected: [${test.expected.join(', ')}]`);
        console.log(`   Got: [${result.join(', ')}]`);
        failed++;
    }
    console.log("");
});

// Test golden ratio approximation
console.log("Testing Golden Ratio Approximation...");
const largeSeries = generateFibonacci(20);
const goldenRatio = largeSeries[19] / largeSeries[18];
const expectedGoldenRatio = 1.618033988749895; // φ (phi)
const difference = Math.abs(goldenRatio - expectedGoldenRatio);

console.log(`Golden Ratio from F(19)/F(18): ${goldenRatio.toFixed(10)}`);
console.log(`Expected Golden Ratio (φ): ${expectedGoldenRatio.toFixed(10)}`);
console.log(`Difference: ${difference.toFixed(10)}`);

if (difference < 0.001) {
    console.log("✅ Golden ratio approximation is accurate\n");
    passed++;
} else {
    console.log("❌ Golden ratio approximation is not accurate enough\n");
    failed++;
}

// Summary
console.log("=".repeat(50));
console.log(`Test Summary: ${passed} passed, ${failed} failed`);
console.log("=".repeat(50));

if (failed === 0) {
    console.log("🎉 All tests passed!");
} else {
    console.log("⚠️  Some tests failed. Please review the implementation.");
}
