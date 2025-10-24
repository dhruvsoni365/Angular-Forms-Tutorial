# Project Collection

A collection of web applications and forms with modern styling and interactive functionality.

## Applications

### 1. Contact Information Form

A responsive HTML form for collecting user's name and mobile number with real-time validation and modern styling.

#### Features
- **Form Fields**: Full name and mobile number with validation
- **Real-time validation**: Instant feedback as user types
- **Responsive design**: Works on desktop, tablet, and mobile devices
- **Modern styling**: Gradient backgrounds, smooth animations, and hover effects

#### Files
- `contact-form.html` - Main form HTML structure
- `form-style.css` - Complete CSS styling with responsive design
- `form-script.js` - JavaScript for validation and user interactions
- `test-form.html` - Test suite for validation functions

### 2. Todo List Application

A comprehensive task management application with advanced features for organizing and tracking your daily tasks.

#### Features
- **Task Management**: Add, edit, delete, and mark tasks as complete
- **Priority Levels**: Set tasks as high, medium, or low priority
- **Due Dates**: Assign due dates to tasks with overdue indicators
- **Filtering**: View all, active, or completed tasks
- **Search**: Find tasks quickly with text search
- **Local Storage**: Automatic saving of tasks to browser storage
- **Export/Import**: Backup and restore your tasks as JSON files
- **Responsive Design**: Optimized for desktop and mobile devices
- **Accessibility**: Full keyboard navigation and screen reader support

#### Files
- `todo.html` - Main todo application HTML structure
- `todo-style.css` - Complete CSS styling with responsive design and animations
- `todo-script.js` - JavaScript application with full functionality

#### Usage
1. Open `todo.html` in a web browser
2. Add new tasks using the form at the top
3. Set priority levels and due dates as needed
4. Use filters to organize your view (All/Active/Completed)
5. Double-click tasks to edit them inline (desktop)
6. Use the search box to find specific tasks
7. Export your tasks for backup or import from previous backups

#### Advanced Features
- **Bulk Actions**: Toggle all tasks or clear completed tasks at once
- **Statistics**: Track remaining tasks and completion progress
- **Keyboard Shortcuts**: Press Escape to cancel edits
- **Mobile Editing**: Dedicated modal for editing tasks on mobile devices
- **Data Persistence**: All tasks are automatically saved to local storage
- **Animation Effects**: Smooth transitions and hover effects

## Browser Compatibility

- Chrome, Firefox, Safari, Edge (modern versions)
- Mobile browsers (iOS Safari, Android Chrome)
- Responsive design works on all screen sizes

## Development Notes

### Form Application
- Client-side validation only - add server-side validation for production
- Customizable styling and validation rules
- Full accessibility compliance

### Todo Application  
- Uses ES6 classes and modern JavaScript features
- Local storage for data persistence
- Modular code structure for easy maintenance
- Comprehensive error handling and user feedback

## Security Considerations

- Client-side validation only - always validate on the server side
- Sanitize inputs before processing
- Consider rate limiting for form submissions
- Implement CSRF protection for production use

---

**Note**: These are client-side only implementations. For production use, add server-side validation and proper data handling.
