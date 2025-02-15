import React from 'react';
import styles from './DropdownSelect.module.css';

const DropdownSelect = ({ options, value = '0', onChange, label }) => {
  return (
      <select
        className={styles["pizza-dropdown-flavor"]}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
  );
};

export default DropdownSelect;
