import React from 'react';
import PropTypes from 'prop-types';

export const SizeSelection = ({ handlePizzaSize, value = 0, name = "size", className = "" }) => {
  return (
    <select 
        id={name}
        name={name}
        onChange={handlePizzaSize} 
        value={value}
        className="size-selection-dropdown"
    >
      <option value={0} disabled>SELECT</option>
      <option value={1}>SMALL</option>
      <option value={2}>MEDIUM</option>
      <option value={3}>LARGE</option>
    </select>
  );
};

SizeSelection.propTypes = {
    handlePizzaSize: PropTypes.func.isRequired,
    value: PropTypes.number,
    name: PropTypes.string,
    className : PropTypes.string
}
