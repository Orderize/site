import React from 'react';
import styles from './Select.module.css';

function Select({ options, defaultValue }) {
    return (
        <>
        <select className={styles["dropdown"]} /*onChange={handleFlavorCount}*/>
            <option disabled>{defaultValue}</option>
            {
                options.length > 0 &&
                options.map((opt, idx) => {
                    <option value={`${idx+1}`}>{opt}</option>
                })
            }
        </select>
        </>
    )
}

export default Select;