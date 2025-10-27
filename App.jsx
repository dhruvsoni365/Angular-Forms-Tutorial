import React from 'react';
import Button from './Button';

const App = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React Button Component Demo</h1>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
        <Button onClick={handleClick} variant="primary">
          Primary Button
        </Button>
        
        <Button onClick={handleClick} variant="secondary">
          Secondary Button
        </Button>
        
        <Button onClick={handleClick} variant="success">
          Success Button
        </Button>
        
        <Button onClick={handleClick} variant="danger">
          Danger Button
        </Button>
        
        <Button onClick={handleClick} variant="primary" disabled>
          Disabled Button
        </Button>
      </div>
    </div>
  );
};

export default App;
