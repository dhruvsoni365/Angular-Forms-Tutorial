# Personal Details Form

A complete web application for collecting and managing personal details with a responsive form and data table.

## Features

### Form Features
- **Comprehensive Personal Details Collection**
  - First Name, Last Name
  - Email Address with validation
  - Phone Number with validation
  - Date of Birth with future date validation
  - Gender selection
  - Complete address information (Street, City, State, ZIP, Country)
  - Occupation

- **Form Validation**
  - Required field validation
  - Email format validation
  - Phone number format validation
  - Date validation (prevents future dates)
  - Real-time error messaging

### Data Management
- **Table Display**
  - Clean, organized table layout
  - Responsive design for mobile devices
  - Row numbering
  - Truncated text with full text on hover

- **CRUD Operations**
  - Add new entries
  - Edit existing entries
  - Delete individual entries
  - Clear all data functionality

- **Data Persistence**
  - Local storage integration
  - Data survives browser sessions
  - Export to CSV functionality

### User Experience
- **Modern Design**
  - Gradient backgrounds
  - Smooth animations
  - Responsive layout
  - Professional styling

- **Interactive Features**
  - Form reset functionality
  - Success/error notifications
  - Loading states
  - Hover effects

## Files

- `personal-details.html` - Main HTML structure
- `personal-details-style.css` - Complete styling and responsive design
- `personal-details-script.js` - JavaScript functionality and data management

## Usage

1. Open `personal-details.html` in a web browser
2. Fill out the personal details form
3. Click "Add to Table" to submit
4. View collected data in the table below
5. Use action buttons to edit or delete entries
6. Export data to CSV or clear all data as needed

## Browser Compatibility

- Modern browsers with JavaScript enabled
- LocalStorage support required for data persistence
- Responsive design supports mobile and desktop

## Technical Implementation

- **HTML5** - Semantic structure with form validation
- **CSS3** - Modern styling with flexbox and grid
- **Vanilla JavaScript** - No dependencies, clean code
- **LocalStorage API** - Client-side data persistence
- **CSV Export** - Client-side file generation

This application demonstrates best practices in web development including form validation, responsive design, data management, and user experience.
