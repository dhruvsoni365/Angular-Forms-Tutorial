# React TextInput Component

A beautiful, customizable, and reusable text input component for React applications.

## Features

- ✅ **Controlled and Uncontrolled modes** - Works both ways
- ✅ **Custom labels and placeholders** - Fully customizable text
- ✅ **Error and helper text support** - Display validation messages
- ✅ **Character count** - Shows character limit when maxLength is set
- ✅ **Focus states** - Visual feedback with smooth transitions
- ✅ **Disabled state** - Proper styling for disabled inputs
- ✅ **Required field indicator** - Shows asterisk for required fields
- ✅ **Fully customizable styling** - Easy to modify CSS
- ✅ **Accessible** - Proper HTML semantics and ARIA support

## Installation

This project was created with Create React App.

```bash
npm install
```

## Running the Application

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

### Basic Usage

```jsx
import TextInput from './components/TextInput';

function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <TextInput
      label="Name"
      placeholder="Enter your name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

### With Validation

```jsx
const [email, setEmail] = useState('');
const [error, setError] = useState('');

const handleEmailChange = (e) => {
  const value = e.target.value;
  setEmail(value);
  
  if (value && !value.includes('@')) {
    setError('Please enter a valid email');
  } else {
    setError('');
  }
};

<TextInput
  label="Email"
  type="email"
  value={email}
  onChange={handleEmailChange}
  error={error}
  required
/>
```

### With Character Limit

```jsx
<TextInput
  label="Bio"
  placeholder="Tell us about yourself"
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  maxLength={100}
  helperText="Maximum 100 characters"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | - | Label text displayed above the input |
| `placeholder` | string | `''` | Placeholder text for the input |
| `type` | string | `'text'` | Input type (text, email, password, etc.) |
| `value` | string | - | Controlled value (optional) |
| `onChange` | function | - | Change handler function |
| `error` | string | - | Error message to display |
| `helperText` | string | - | Helper text displayed below input |
| `disabled` | boolean | `false` | Whether the input is disabled |
| `required` | boolean | `false` | Whether the field is required |
| `maxLength` | number | - | Maximum character length (shows counter) |

## Customization

The component uses CSS classes that can be easily customized:

- `.text-input-container` - Main container
- `.text-input-label` - Label styling
- `.text-input-wrapper` - Input wrapper with border
- `.text-input` - The actual input element
- `.error-message` - Error text styling
- `.helper-text` - Helper text styling
- `.character-count` - Character counter styling

## Component Structure

```
text-input-app/
├── src/
│   ├── components/
│   │   ├── TextInput.js      # Main component
│   │   └── TextInput.css     # Component styles
│   ├── App.js                # Demo application
│   ├── App.css               # App styles
│   └── index.js              # Entry point
└── package.json
```

## Browser Support

Works in all modern browsers that support ES6+ and React 18.

## License

MIT
