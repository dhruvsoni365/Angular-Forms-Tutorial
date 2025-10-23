# Angular User Form - Name and Email

This project demonstrates a clean, professional Angular reactive form that collects user name and email information with proper validation.

## Features

- **Reactive Forms**: Built using Angular's ReactiveFormsModule for better form control and validation
- **Form Validation**: Comprehensive validation including:
  - Required field validation for both name and email
  - Email format validation
  - Name length validation (2-50 characters)
  - Name pattern validation (letters and spaces only)
- **User Experience**: 
  - Real-time validation feedback
  - Visual error states with helpful error messages
  - Responsive design that works on all screen sizes
  - Loading and success states
  - Clean, modern UI with smooth animations
- **Accessibility**: Form labels, proper input types, and keyboard navigation support

## Files Structure

```
src/app/
├── user-form.component.ts      # Component logic and form handling
├── user-form.component.html    # Form template with validation
├── user-form.component.css     # Styling and responsive design
└── app.module.ts              # Module configuration with imports
```

## Component Details

### UserFormComponent

**Key Features:**
- Uses Angular FormBuilder for reactive form creation
- Implements comprehensive validation rules
- Provides helper methods for error checking and display
- Handles form submission with success feedback
- Includes form reset functionality

**Validation Rules:**
- **Name**: Required, 2-50 characters, letters and spaces only
- **Email**: Required, valid email format, max 100 characters

### Form Template

**UI Elements:**
- Clean, card-based layout
- Visual feedback for form states (valid/invalid/touched)
- Error messages with icons
- Submit and Reset buttons with appropriate states
- Development status display for debugging

### Styling

**Design Features:**
- Modern gradient background
- Card-based form layout with shadow effects
- Smooth hover and focus transitions
- Responsive design for mobile and desktop
- Error state styling with animations
- Professional color scheme

## Usage

1. **Import the component** in your app.module.ts:
```typescript
import { UserFormComponent } from './user-form.component';

@NgModule({
  declarations: [
    // ... other components
    UserFormComponent
  ],
  // ... rest of module config
})
```

2. **Use in templates**:
```html
<app-user-form></app-user-form>
```

## Form Behavior

- **Validation**: Real-time validation with visual feedback
- **Submission**: Form submits only when all fields are valid
- **Reset**: Users can reset the form to clear all data
- **Error Display**: Context-aware error messages guide users to correct issues

## Customization

The form can be easily customized by modifying:
- Validation rules in `user-form.component.ts`
- Styling in `user-form.component.css`
- Form layout in `user-form.component.html`

## Dependencies

- Angular (with ReactiveFormsModule)
- No external UI libraries required - uses pure CSS for styling
