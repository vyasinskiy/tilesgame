import React from 'react';
import styles from './TileField.module.css'
import defaultTile from '../../../assets/images/defaultTile.png'

const TileField = (props) => {
    return (
        <div 
        onClick={props.userMove} >
            {props.isOpened ? <img src={props.src} /> : <img src={defaultTile} />}
        </div>
    )
}

export default TileField;