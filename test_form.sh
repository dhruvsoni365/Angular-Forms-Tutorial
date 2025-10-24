#!/bin/bash

echo "Testing HTML form creation..."

# Check if index.html exists
if [ -f "index.html" ]; then
    echo "✓ index.html file created successfully"
    
    # Check for key HTML elements
    if grep -q "<form" index.html; then
        echo "✓ Form element found"
    else
        echo "✗ Form element missing"
    fi
    
    if grep -q 'id="name"' index.html; then
        echo "✓ Name input field found"
    else
        echo "✗ Name input field missing"
    fi
    
    if grep -q 'id="mobile"' index.html; then
        echo "✓ Mobile input field found"
    else
        echo "✗ Mobile input field missing"
    fi
    
    if grep -q "<table" index.html; then
        echo "✓ Table element found"
    else
        echo "✗ Table element missing"
    fi
    
    if grep -q "javascript\|<script" index.html; then
        echo "✓ JavaScript functionality included"
    else
        echo "✗ JavaScript functionality missing"
    fi
    
    echo ""
    echo "File size: $(wc -c < index.html) bytes"
    echo "Lines of code: $(wc -l < index.html) lines"
    
else
    echo "✗ index.html file not found"
fi
