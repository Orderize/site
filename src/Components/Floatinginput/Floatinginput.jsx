import React, { useState, useEffect } from 'react';
import styles from'./Floatinginput.module.css'; 
import { toast } from 'react-toastify';

const FloatingInput = ({ label, initialValue = '', onSet, onValue, onInput, onEnterPress, disabled = false}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(initialValue);

    useEffect(() => {
      setInputValue(onValue);
    }, [onValue]);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
      if (!inputValue) {
        setIsFocused(false);
      }
    };

    const handleKeyDown = (e) => {
      console.log("Tecla pressionada:", e.key);
      
      if (onEnterPress) {
        onEnterPress(e);
      }
    };
    
    return (
      <div 
        className={`${styles['input-container']} ${isFocused || inputValue ? styles['focused'] : ''}`}
      >
        <input 
          className={`${styles.input}`}
          type="text"
          value={inputValue || ''}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {onSet(e.target.value); setInputValue(e.target.value)}}
          onInput={onInput}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder=" "
        />
        
        <label
          className={`${styles.label}`}
        >
          {label}
        </label>
      </div>
    );
};

export default FloatingInput;
