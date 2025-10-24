# Contact Form with Table Display - README

## Overview
This is a complete HTML form application that allows users to input contact information (Name and Mobile Number) and displays the data in a structured table format.

## Features

### ✅ Form Features
- **Name Input**: Text field with validation (minimum 2 characters, letters and spaces only)
- **Mobile Input**: Telephone field with format validation (10-15 digits, international format supported)
- **Real-time Validation**: Displays error messages for invalid inputs
- **Duplicate Prevention**: Prevents adding the same mobile number twice

### ✅ Table Features
- **Dynamic Display**: Shows all submitted contacts in a responsive table
- **Serial Numbers**: Auto-incrementing row numbers
- **Individual Delete**: Remove specific contacts with confirmation
- **Clear All**: Button to remove all contacts at once
- **Persistent Storage**: Uses localStorage to save data between sessions

### ✅ User Experience
- **Responsive Design**: Works well on desktop and mobile devices
- **Modern Styling**: Clean, professional appearance with hover effects
- **Form Reset**: Automatically clears form after successful submission
- **Success Feedback**: Shows confirmation when contacts are added

## Technical Implementation

### HTML Structure
- Semantic HTML5 elements
- Proper form labels and accessibility
- Table with thead/tbody structure

### CSS Styling
- Mobile-first responsive design
- CSS Grid and Flexbox layouts
- Smooth transitions and hover effects
- Professional color scheme

### JavaScript Functionality
- Form validation with regex patterns
- Dynamic DOM manipulation
- Event handling for all interactions
- LocalStorage integration for data persistence

## File Structure
```
/vercel/sandbox/
├── index.html          # Main application file
├── test_form.sh       # Test script to verify implementation
├── TODO_form_table.md # Project planning and progress tracking
└── README.md          # This documentation file
```

## Usage Instructions
1. Open `index.html` in a web browser
2. Fill in the Name and Mobile Number fields
3. Click "Add Contact" to submit the form
4. View the contact in the table below
5. Use "Delete" buttons to remove individual contacts
6. Use "Clear All Contacts" to remove all entries

## Validation Rules
- **Name**: Must be at least 2 characters, letters and spaces only
- **Mobile**: Must be 10-15 digits, supports international format (+country code)
- **Uniqueness**: Same mobile number cannot be added twice

## Browser Compatibility
- Modern browsers supporting ES6+ JavaScript
- LocalStorage support required for data persistence
- Responsive design tested on various screen sizes

## Testing
Run the test script to verify all components:
```bash
./test_form.sh
```

All tests should pass with ✓ indicators.
