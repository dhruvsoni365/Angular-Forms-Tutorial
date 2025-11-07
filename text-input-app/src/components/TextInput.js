import React, { useState } from 'react';
import './TextInput.css';

const TextInput = ({ 
  label, 
  placeholder = '', 
  type = 'text',
  value: controlledValue,
  onChange: controlledOnChange,
  error,
  helperText,
  disabled = false,
  required = false,
  maxLength,
  ...props 
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (controlledOnChange) {
      controlledOnChange(e);
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={`text-input-container ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}>
      {label && (
        <label className="text-input-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      <div className={`text-input-wrapper ${isFocused ? 'focused' : ''}`}>
        <input
          type={type}
          className="text-input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          {...props}
        />
        {maxLength && (
          <span className="character-count">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      {error && <span className="error-message">{error}</span>}
      {helperText && !error && <span className="helper-text">{helperText}</span>}
    </div>
  );
};

export default TextInput;
