# User Details Registration System

A complete user registration system with form validation, data storage, and table management built with HTML, CSS, and JavaScript.

## Features

### Form Features
- **User Input Fields:**
  - Full Name (required, 2-50 characters, letters and spaces only)
  - Email (required, valid email format)
  - Phone Number (required, 10-15 digits)
  - Age (optional, 1-120)
  - Gender (required, radio buttons: Male/Female/Other)
  - Address (optional, textarea, max 200 characters)

- **Real-time Validation:**
  - Instant feedback on input errors
  - Visual indicators (green border for valid, red for invalid)
  - Error messages below each field
  - Submit button disabled until all required fields are valid

### Data Management
- **Create:** Add new users with the form
- **Read:** View all users in a responsive table
- **Update:** Edit existing users (click Edit button)
- **Delete:** Remove users (click Delete button with confirmation)
- **Clear All:** Remove all users at once (with confirmation)

### Storage
- **localStorage:** All data persists across page refreshes
- **Auto-save:** Data is automatically saved after each operation
- **Save Indicator:** Visual feedback when data is saved

### User Experience
- **Success/Error Notifications:** Clear feedback for all actions
- **Loading States:** Visual indicators during form submission
- **Edit Mode Highlighting:** Yellow background for the row being edited
- **Responsive Design:** Works on desktop, tablet, and mobile devices
- **Keyboard Shortcuts:**
  - `Ctrl/Cmd + K`: Focus on name input
  - `Escape`: Cancel editing mode

## Files

1. **user-details.html** - Main HTML structure with form and table
2. **user-details-style.css** - Complete styling with responsive design
3. **user-details-script.js** - JavaScript for validation, CRUD operations, and storage

## How to Use

### Adding a User
1. Fill in all required fields (marked with red asterisk *)
2. Optional: Add age and address
3. Click "Add User" button
4. User appears in the table below

### Editing a User
1. Click the "Edit" button next to any user
2. Form populates with user's data
3. Modify the fields as needed
4. Click "Update User" to save changes
5. Or click "Clear Form" to cancel

### Deleting a User
1. Click the "Delete" button next to any user
2. Confirm the deletion in the popup
3. User is removed from the table

### Clearing All Data
1. Click the "Clear All Data" button (red button at top right)
2. Confirm the action in the popup
3. All users are removed

## Validation Rules

- **Name:** 2-50 characters, letters and spaces only
- **Email:** Valid email format (example@domain.com)
- **Phone:** 10-15 digits, optional + prefix
- **Age:** Between 1 and 120 (optional)
- **Gender:** Must select one option
- **Address:** Max 200 characters (optional)
- **Duplicate Email:** Cannot register the same email twice

## Technical Details

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Uses localStorage API

### Data Structure
```javascript
{
  id: timestamp,
  name: "John Smith",
  email: "john@example.com",
  phone: "1234567890",
  age: "30",
  gender: "Male",
  address: "123 Main St",
  createdAt: "ISO timestamp",
  updatedAt: "ISO timestamp" // only on updates
}
```

### Styling Features
- Gradient background (#667eea to #764ba2)
- Smooth animations and transitions
- Hover effects on buttons and table rows
- Focus states with shadow effects
- Color-coded buttons (blue for edit, red for delete)
- Responsive grid layout for form fields

## Testing

The application has been tested for:
- ✅ Form validation (all fields)
- ✅ Data submission and storage
- ✅ Table rendering with multiple users
- ✅ Edit functionality (form population and update)
- ✅ Delete functionality (with confirmation)
- ✅ Data persistence (localStorage)
- ✅ Responsive design (mobile and desktop)
- ✅ Visual appearance and styling
- ✅ User notifications and feedback

## Access

Open `user-details.html` in a web browser to use the application.

## Notes

- Data is stored locally in the browser (localStorage)
- Data is not sent to any server
- Clearing browser data will remove all stored users
- The application works offline once loaded
