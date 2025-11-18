// DOM Elements
const termsInput = document.getElementById('terms');
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const errorElement = document.getElementById('error');
const resultsSection = document.getElementById('resultsSection');

// Stats elements
const totalTermsElement = document.getElementById('totalTerms');
const seriesSumElement = document.getElementById('seriesSum');
const lastTermElement = document.getElementById('lastTerm');
const goldenRatioElement = document.getElementById('goldenRatio');

// Display elements
const seriesList = document.getElementById('seriesList');
const visualContainer = document.getElementById('visualContainer');
const tableBody = document.getElementById('tableBody');

// View tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const viewContents = document.querySelectorAll('.view-content');

// Store generated series
let fibonacciSeries = [];

// Event Listeners
generateBtn.addEventListener('click', generateSeries);
clearBtn.addEventListener('click', clearResults);
termsInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateSeries();
    }
});

termsInput.addEventListener('input', () => {
    errorElement.textContent = '';
    termsInput.classList.remove('error');
});

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const viewType = button.getAttribute('data-view');
        switchView(viewType);
    });
});

// Generate Fibonacci Series
function generateSeries() {
    const terms = parseInt(termsInput.value);
    
    // Validation
    if (!termsInput.value) {
        showError('Please enter a number');
        return;
    }
    
    if (isNaN(terms)) {
        showError('Please enter a valid number');
        return;
    }
    
    if (terms < 1) {
        showError('Number must be at least 1');
        return;
    }
    
    if (terms > 100) {
        showError('Number must not exceed 100');
        return;
    }
    
    // Generate the series
    fibonacciSeries = calculateFibonacci(terms);
    
    // Display results
    displayStats();
    displayListView();
    displayVisualView();
    displayTableView();
    
    // Show results section with animation
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Calculate Fibonacci sequence
function calculateFibonacci(n) {
    const series = [];
    
    for (let i = 0; i < n; i++) {
        if (i === 0) {
            series.push(0);
        } else if (i === 1) {
            series.push(1);
        } else {
            series.push(series[i - 1] + series[i - 2]);
        }
    }
    
    return series;
}

// Display statistics
function displayStats() {
    const sum = fibonacciSeries.reduce((acc, val) => acc + val, 0);
    const lastTerm = fibonacciSeries[fibonacciSeries.length - 1];
    
    totalTermsElement.textContent = fibonacciSeries.length;
    seriesSumElement.textContent = formatNumber(sum);
    lastTermElement.textContent = formatNumber(lastTerm);
    
    // Calculate golden ratio approximation
    if (fibonacciSeries.length >= 2) {
        const secondLast = fibonacciSeries[fibonacciSeries.length - 2];
        if (secondLast !== 0) {
            const ratio = lastTerm / secondLast;
            goldenRatioElement.textContent = ratio.toFixed(6);
        } else {
            goldenRatioElement.textContent = '-';
        }
    } else {
        goldenRatioElement.textContent = '-';
    }
}

// Display list view
function displayListView() {
    seriesList.innerHTML = '';
    
    fibonacciSeries.forEach((num, index) => {
        const item = document.createElement('div');
        item.className = 'fib-item';
        item.innerHTML = `
            <span class="position">F(${index})</span>
            ${formatNumber(num)}
        `;
        seriesList.appendChild(item);
    });
}

// Display visual view (bar chart)
function displayVisualView() {
    visualContainer.innerHTML = '';
    
    // Find max value for scaling
    const maxValue = Math.max(...fibonacciSeries);
    const maxHeight = 250;
    
    fibonacciSeries.forEach((num, index) => {
        const bar = document.createElement('div');
        bar.className = 'visual-bar';
        
        // Calculate height (minimum 30px for visibility)
        let height;
        if (maxValue === 0) {
            height = 30;
        } else {
            height = Math.max(30, (num / maxValue) * maxHeight);
        }
        
        bar.style.height = `${height}px`;
        bar.innerHTML = `
            <span class="bar-value">${formatNumber(num)}</span>
            <span class="bar-position">F(${index})</span>
        `;
        
        visualContainer.appendChild(bar);
    });
}

// Display table view
function displayTableView() {
    tableBody.innerHTML = '';
    
    fibonacciSeries.forEach((num, index) => {
        const row = document.createElement('tr');
        
        // Calculate ratio
        let ratio = '-';
        if (index > 0 && fibonacciSeries[index - 1] !== 0) {
            ratio = (num / fibonacciSeries[index - 1]).toFixed(6);
        }
        
        row.innerHTML = `
            <td>${index}</td>
            <td>${formatNumber(num)}</td>
            <td>${ratio}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Switch between views
function switchView(viewType) {
    // Update tab buttons
    tabButtons.forEach(btn => {
        if (btn.getAttribute('data-view') === viewType) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update view contents
    viewContents.forEach(content => {
        if (content.id === `${viewType}View`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

// Clear results
function clearResults() {
    termsInput.value = '';
    errorElement.textContent = '';
    termsInput.classList.remove('error');
    resultsSection.style.display = 'none';
    fibonacciSeries = [];
    termsInput.focus();
}

// Show error message
function showError(message) {
    errorElement.textContent = message;
    termsInput.classList.add('error');
    termsInput.focus();
}

// Format large numbers with commas
function formatNumber(num) {
    if (num >= 1000000000000) {
        return num.toExponential(2);
    }
    return num.toLocaleString();
}

// Initialize - focus on input
termsInput.focus();
