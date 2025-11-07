# TextInput Component - Usage Guide

## Quick Start

The TextInput component has been successfully created and tested! Here's everything you need to know.

## Component Location

```
/vercel/sandbox/text-input-app/src/components/TextInput.js
/vercel/sandbox/text-input-app/src/components/TextInput.css
```

## Basic Import

```jsx
import TextInput from './components/TextInput';
```

## Examples

### 1. Simple Text Input

```jsx
import { useState } from 'react';
import TextInput from './components/TextInput';

function MyForm() {
  const [name, setName] = useState('');

  return (
    <TextInput
      label="Name"
      placeholder="Enter your name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

### 2. Email Input with Validation

```jsx
const [email, setEmail] = useState('');
const [error, setError] = useState('');

const handleEmailChange = (e) => {
  const value = e.target.value;
  setEmail(value);
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value && !emailRegex.test(value)) {
    setError('Please enter a valid email address');
  } else {
    setError('');
  }
};

<TextInput
  label="Email"
  type="email"
  placeholder="you@example.com"
  value={email}
  onChange={handleEmailChange}
  error={error}
  required
/>
```

### 3. Password Input

```jsx
const [password, setPassword] = useState('');

<TextInput
  label="Password"
  type="password"
  placeholder="Enter password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  helperText="Must be at least 8 characters"
  required
/>
```

### 4. Text Input with Character Limit

```jsx
const [bio, setBio] = useState('');

<TextInput
  label="Bio"
  placeholder="Tell us about yourself"
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  maxLength={100}
  helperText="Maximum 100 characters"
/>
```

### 5. Disabled Input

```jsx
<TextInput
  label="Username"
  value="john_doe"
  disabled
/>
```

### 6. Uncontrolled Input

```jsx
// No value or onChange needed - component manages its own state
<TextInput
  label="Comments"
  placeholder="Enter your comments"
/>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | - | Label text above input |
| `placeholder` | string | `''` | Placeholder text |
| `type` | string | `'text'` | HTML input type (text, email, password, etc.) |
| `value` | string | - | Controlled value (optional) |
| `onChange` | function | - | Change handler: `(event) => void` |
| `error` | string | - | Error message (shows in red) |
| `helperText` | string | - | Helper text below input |
| `disabled` | boolean | `false` | Disables the input |
| `required` | boolean | `false` | Shows asterisk (*) indicator |
| `maxLength` | number | - | Max characters (shows counter) |
| `...props` | any | - | Any other HTML input attributes |

## Features Demonstrated

✅ **Controlled Mode** - Full control over input value via props  
✅ **Uncontrolled Mode** - Component manages its own state  
✅ **Focus States** - Blue border and shadow on focus  
✅ **Error States** - Red border and error message  
✅ **Validation** - Real-time email validation example  
✅ **Character Counter** - Shows current/max characters  
✅ **Helper Text** - Additional guidance below input  
✅ **Required Indicator** - Red asterisk for required fields  
✅ **Disabled State** - Grayed out, non-editable  
✅ **Responsive Design** - Works on all screen sizes  

## Styling Customization

The component uses CSS classes that can be customized in `TextInput.css`:

- `.text-input-container` - Main wrapper
- `.text-input-label` - Label styling
- `.text-input-wrapper` - Input border container
- `.text-input` - The actual input element
- `.error-message` - Error text styling
- `.helper-text` - Helper text styling
- `.character-count` - Character counter styling

## Running the Demo

```bash
cd /vercel/sandbox/text-input-app
npm start
```

Visit http://localhost:3000 to see the live demo with all features!

## Integration into Your Project

1. Copy the component files:
   - `src/components/TextInput.js`
   - `src/components/TextInput.css`

2. Import and use in your components:
   ```jsx
   import TextInput from './components/TextInput';
   ```

3. Customize the CSS to match your design system

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Accessibility

- Proper label association
- Keyboard navigation support
- Focus indicators
- ARIA-compliant markup
- Screen reader friendly

---

**Created with React 18 and Create React App**
