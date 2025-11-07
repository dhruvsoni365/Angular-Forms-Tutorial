import React, { useState } from 'react';
import './App.css';
import TextInput from './components/TextInput';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, password, bio });
    alert(`Form submitted!\nName: ${name}\nEmail: ${email}`);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>React Text Input Component</h1>
        <p className="subtitle">A customizable and reusable text input component</p>

        <form onSubmit={handleSubmit} className="demo-form">
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            helperText="This field is required"
          />

          <TextInput
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            required
          />

          <TextInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Must be at least 8 characters"
            required
          />

          <TextInput
            label="Bio"
            placeholder="Tell us about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={100}
            helperText="Maximum 100 characters"
          />

          <TextInput
            label="Disabled Input"
            placeholder="This input is disabled"
            disabled
            value="Cannot edit this"
          />

          <button type="submit" className="submit-button">
            Submit Form
          </button>
        </form>

        <div className="info-section">
          <h2>Features</h2>
          <ul>
            <li>Controlled and uncontrolled modes</li>
            <li>Custom labels and placeholders</li>
            <li>Error and helper text support</li>
            <li>Character count for maxLength</li>
            <li>Focus states with visual feedback</li>
            <li>Disabled state</li>
            <li>Required field indicator</li>
            <li>Fully customizable styling</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
