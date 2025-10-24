# Contact Information Form

A responsive HTML form for collecting user's name and mobile number with real-time validation and modern styling.

## Features

### Form Fields
- **Full Name**: Text input with validation (2-50 characters, letters and spaces only)
- **Mobile Number**: Tel input with validation (10-15 digits, optional international format)

### Validation
- **Real-time validation**: Instant feedback as user types
- **Pattern matching**: Name must contain only letters and spaces
- **Mobile format**: Accepts 10-15 digit numbers with optional + prefix
- **Auto-formatting**: Mobile number gets formatted for better readability
- **Submit prevention**: Button disabled until all fields are valid

### Design Features
- **Responsive design**: Works on desktop, tablet, and mobile devices
- **Modern styling**: Gradient backgrounds, smooth animations, and hover effects
- **Accessibility**: Proper labels, focus states, and error messages
- **User feedback**: Success messages and loading states

## Files

- `contact-form.html` - Main form HTML structure
- `form-style.css` - Complete CSS styling with responsive design
- `form-script.js` - JavaScript for validation and user interactions
- `test-form.html` - Test suite for validation functions

## Usage

1. Open `contact-form.html` in a web browser
2. Fill in your full name and mobile number
3. The form will validate inputs in real-time
4. Submit button becomes active when all fields are valid
5. Click Submit to see the success message

## Testing

Open `test-form.html` to run automated tests for the validation functions. The test suite validates:

### Name Validation Tests
- ✅ Valid names with letters and spaces
- ✅ Rejects names with numbers or special characters
- ✅ Enforces length requirements (2-50 characters)

### Mobile Validation Tests
- ✅ Accepts 10-15 digit numbers
- ✅ Supports international format with + prefix
- ✅ Handles formatted numbers with spaces
- ✅ Rejects invalid formats and lengths

## Browser Compatibility

- Chrome, Firefox, Safari, Edge (modern versions)
- Mobile browsers (iOS Safari, Android Chrome)
- Responsive design works on all screen sizes

## Customization

### Styling
Edit `form-style.css` to customize:
- Colors and gradients
- Font sizes and families
- Spacing and layout
- Animation effects

### Validation Rules
Edit `form-script.js` to modify:
- Name validation pattern
- Mobile number format requirements
- Error messages
- Form behavior

### Form Submission
The current implementation shows a success message. To integrate with a backend:

```javascript
// Replace the setTimeout in form submission with actual API call
fetch('/api/submit-contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: name,
        mobile: mobile
    })
})
.then(response => response.json())
.then(data => {
    // Handle success
})
.catch(error => {
    // Handle error
});
```

## Security Considerations

- Client-side validation only - always validate on the server side
- Sanitize inputs before processing
- Consider rate limiting for form submissions
- Implement CSRF protection for production use

## Accessibility Features

- Semantic HTML structure
- Proper form labels and associations
- Focus indicators and keyboard navigation
- Error messages linked to form fields
- High contrast colors for readability

---

**Note**: This is a client-side only implementation. For production use, add server-side validation and proper data handling.
