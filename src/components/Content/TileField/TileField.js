import React from 'react';
import styles from './TileField.module.css'
import defaultTile from '../../../assets/images/defaultTile.png'

const TileField = (props) => {
    return (
        <button
            className={styles.tileButton}
            onClick={props.userMove}
            disabled={props.tilesBlocked ? true : false}
        >
            {props.isOpened ? <img src={props.src} /> : <img src={defaultTile} />}
        </button>
    )
}

export default TileField;