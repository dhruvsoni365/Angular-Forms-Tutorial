// DOM Elements
const fibCountInput = document.getElementById('fibCount');
const generateBtn = document.getElementById('generateBtn');
const errorMessage = document.getElementById('errorMessage');
const resultsSection = document.getElementById('resultsSection');

// Display option checkboxes
const showListCheckbox = document.getElementById('showList');
const showTableCheckbox = document.getElementById('showTable');
const showStatsCheckbox = document.getElementById('showStats');
const showVisualCheckbox = document.getElementById('showVisual');

// Result containers
const listView = document.getElementById('listView');
const tableView = document.getElementById('tableView');
const statsView = document.getElementById('statsView');
const visualView = document.getElementById('visualView');

// Display elements
const sequenceDisplay = document.getElementById('sequenceDisplay');
const tableBody = document.getElementById('tableBody');
const statsGrid = document.getElementById('statsGrid');
const visualContainer = document.getElementById('visualContainer');

// Generate Fibonacci series
function generateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const series = [0, 1];
    
    for (let i = 2; i < n; i++) {
        series.push(series[i - 1] + series[i - 2]);
    }
    
    return series;
}

// Validate input
function validateInput() {
    const value = parseInt(fibCountInput.value);
    
    if (isNaN(value) || value < 1) {
        errorMessage.textContent = 'Please enter a positive number';
        return false;
    }
    
    if (value > 100) {
        errorMessage.textContent = 'Maximum value is 100';
        return false;
    }
    
    errorMessage.textContent = '';
    return true;
}

// Display list view
function displayList(series) {
    sequenceDisplay.innerHTML = '';
    
    series.forEach((num, index) => {
        const numElement = document.createElement('div');
        numElement.className = 'fib-number';
        numElement.textContent = num;
        numElement.style.animationDelay = `${index * 0.05}s`;
        sequenceDisplay.appendChild(numElement);
    });
}

// Display table view
function displayTable(series) {
    tableBody.innerHTML = '';
    
    series.forEach((num, index) => {
        const row = document.createElement('tr');
        
        // Position
        const posCell = document.createElement('td');
        posCell.textContent = index;
        
        // Fibonacci number
        const numCell = document.createElement('td');
        numCell.textContent = num;
        
        // Type (even/odd)
        const typeCell = document.createElement('td');
        const isEven = num % 2 === 0;
        typeCell.textContent = isEven ? 'Even' : 'Odd';
        typeCell.className = isEven ? 'even-number' : 'odd-number';
        
        // Ratio to previous
        const ratioCell = document.createElement('td');
        if (index === 0 || series[index - 1] === 0) {
            ratioCell.textContent = '-';
        } else {
            const ratio = (num / series[index - 1]).toFixed(4);
            ratioCell.textContent = ratio;
        }
        
        row.appendChild(posCell);
        row.appendChild(numCell);
        row.appendChild(typeCell);
        row.appendChild(ratioCell);
        
        tableBody.appendChild(row);
    });
}

// Calculate statistics
function calculateStats(series) {
    const sum = series.reduce((acc, num) => acc + num, 0);
    const evenNumbers = series.filter(num => num % 2 === 0);
    const oddNumbers = series.filter(num => num % 2 === 0);
    const max = Math.max(...series);
    const min = Math.min(...series);
    const average = sum / series.length;
    
    // Golden ratio approximation (ratio of last two numbers)
    let goldenRatio = '-';
    if (series.length >= 2 && series[series.length - 2] !== 0) {
        goldenRatio = (series[series.length - 1] / series[series.length - 2]).toFixed(6);
    }
    
    return {
        count: series.length,
        sum: sum,
        evenCount: evenNumbers.length,
        oddCount: series.length - evenNumbers.length,
        max: max,
        min: min,
        average: average.toFixed(2),
        goldenRatio: goldenRatio
    };
}

// Display statistics
function displayStats(series) {
    const stats = calculateStats(series);
    
    statsGrid.innerHTML = '';
    
    const statsData = [
        { label: 'Total Terms', value: stats.count },
        { label: 'Sum', value: stats.sum },
        { label: 'Even Numbers', value: stats.evenCount },
        { label: 'Odd Numbers', value: stats.oddCount },
        { label: 'Maximum', value: stats.max },
        { label: 'Minimum', value: stats.min },
        { label: 'Average', value: stats.average },
        { label: 'Golden Ratio (φ)', value: stats.goldenRatio }
    ];
    
    statsData.forEach(stat => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        
        const label = document.createElement('div');
        label.className = 'stat-label';
        label.textContent = stat.label;
        
        const value = document.createElement('div');
        value.className = 'stat-value';
        value.textContent = stat.value;
        
        statItem.appendChild(label);
        statItem.appendChild(value);
        statsGrid.appendChild(statItem);
    });
}

// Display visual representation
function displayVisual(series) {
    visualContainer.innerHTML = '';
    
    // Limit to last 15 numbers for better visualization
    const displaySeries = series.length > 15 ? series.slice(-15) : series;
    const maxValue = Math.max(...displaySeries);
    
    displaySeries.forEach((num, index) => {
        const actualIndex = series.length > 15 ? series.length - 15 + index : index;
        
        const barContainer = document.createElement('div');
        barContainer.className = 'visual-bar';
        
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = `F(${actualIndex})`;
        
        const barFill = document.createElement('div');
        barFill.className = 'bar-fill';
        
        // Calculate width percentage (minimum 5% for visibility)
        const widthPercent = maxValue > 0 ? Math.max(5, (num / maxValue) * 100) : 5;
        barFill.style.width = `${widthPercent}%`;
        barFill.textContent = num;
        
        barContainer.appendChild(label);
        barContainer.appendChild(barFill);
        visualContainer.appendChild(barContainer);
    });
    
    if (series.length > 15) {
        const note = document.createElement('p');
        note.style.marginTop = '15px';
        note.style.color = '#666';
        note.style.fontStyle = 'italic';
        note.textContent = 'Showing last 15 terms for better visualization';
        visualContainer.appendChild(note);
    }
}

// Main generate function
function generate() {
    if (!validateInput()) {
        return;
    }
    
    const count = parseInt(fibCountInput.value);
    const series = generateFibonacci(count);
    
    // Show results section
    resultsSection.classList.add('active');
    
    // Display based on selected options
    if (showListCheckbox.checked) {
        listView.classList.add('active');
        displayList(series);
    } else {
        listView.classList.remove('active');
    }
    
    if (showTableCheckbox.checked) {
        tableView.classList.add('active');
        displayTable(series);
    } else {
        tableView.classList.remove('active');
    }
    
    if (showStatsCheckbox.checked) {
        statsView.classList.add('active');
        displayStats(series);
    } else {
        statsView.classList.remove('active');
    }
    
    if (showVisualCheckbox.checked) {
        visualView.classList.add('active');
        displayVisual(series);
    } else {
        visualView.classList.remove('active');
    }
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Event listeners
generateBtn.addEventListener('click', generate);

fibCountInput.addEventListener('input', () => {
    validateInput();
});

fibCountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generate();
    }
});

// Generate initial series on page load
window.addEventListener('load', () => {
    generate();
});
