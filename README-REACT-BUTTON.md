# React Button Component

A simple, reusable React button component with multiple variants and hover effects.

## Files Created

- `Button.jsx` - The main button component
- `App.jsx` - Demo application showing button usage
- `index.js` - React entry point
- `react-index.html` - HTML file for the React app
- `package.json` - Project dependencies
- `webpack.config.js` - Webpack configuration

## Features

- Multiple button variants (primary, secondary, success, danger)
- Hover effects with smooth transitions
- Disabled state support
- Customizable onClick handler
- Clean, modern styling

## Usage

```jsx
import Button from './Button';

function MyComponent() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <Button onClick={handleClick} variant="primary">
      Click Me
    </Button>
  );
}
```

## Props

- `onClick` - Function to call when button is clicked
- `children` - Button text/content
- `variant` - Button style variant ('primary', 'secondary', 'success', 'danger')
- `disabled` - Boolean to disable the button

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Open `react-index.html` in a browser to see the demo

## Component Code

The Button component is fully self-contained with inline styles and can be easily customized by modifying the `variants` object in `Button.jsx`.
