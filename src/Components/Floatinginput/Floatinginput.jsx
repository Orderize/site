import React, { useState } from 'react';
import styles from'./Floatinginput.module.css'; 

const FloatingInput = ({ label, initialValue = '' }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(initialValue);
  
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
      if (!inputValue) {
        setIsFocused(false);
      }
    };
  
    const handleChange = (event) => {
      setInputValue(event.target.value);
    };
  
    return (
      <div className={`${styles['input-container']} ${isFocused || inputValue ? styles['focused'] : ''}`}>
        <input className={styles.input}
          type="text"
          value={inputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder=" "
        />
        
        <label className={styles.label}>{label}</label>
      </div>
    );
};

export default FloatingInput;
