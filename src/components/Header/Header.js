import React from 'react';
import styles from './Header.module.css'

const Header = (props) => {
    return(
        <div className={styles.header} >
            <span>train hard your memory</span> - developed by Yasinsky V.
        </div>
    )
}

export default Header;