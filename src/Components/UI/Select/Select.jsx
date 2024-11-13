import React from 'react';
import styles from './Select.modules.css';

function Select({ options, defaultValue }) {
    return (
        <>
        <select className={styles["dropdown"]} defaultValue='0' onChange={handleFlavorCount}>
            {
                options.length > 0 &&
                
            }
            <option value='0' disabled>Quantidade</option>
            <option value='1'>1 Sabor</option>
            <option value='2'>2 Sabores</option>
            <option value='3'>3 Sabores</option>
            <option value='4'>4 Sabores</option>
        </select>
        </>
    )
}

export default Select;