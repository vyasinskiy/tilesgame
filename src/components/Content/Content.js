import React from 'react';
import { connect } from 'react-redux';
import TileField from './TileField/TileField';
import styles from './Content.module.css';
import { userMove, startGame } from '../../redux/gameReducer'

const mapStatoToProps = (state) => {
    return {
        tiles: state.game.tiles,
        gameStarted: state.game.gameStarted,
        gameFinished: state.game.gameFinished,
        tilesBlocked: state.game.tilesBlocked
    }
}

class Content extends React.Component {
    mixTiles = (arr) => {
        var j, temp;
        for (var i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }
    mixedTiles = this.mixTiles(this.props.tiles)
    render() {
        return (
            <div className={styles.content} >
                <div className={styles.gameFinished} >
                    {this.props.gameFinished ? 'Вы победили' : null}
                </div>
                <GameField
                    mixedTiles={this.mixedTiles}
                    userMove={this.props.userMove}
                    tilesBlocked={this.props.tilesBlocked}
                />
                <div>
                    <button
                        className={styles.startButton}
                        onClick={this.props.startGame}
                        disabled={this.props.gameStarted ? true : false}
                    >
                        Start
                    </button>
                </div>
            </div>
        )
    }
}


const GameField = (props) => {
    const tilesToRender = props.mixedTiles.map(elem => {
        return (
            <TileField
                src={elem.src}
                id={elem.id}
                name={elem.name}
                key={elem.id}
                isOpened={elem.isOpened}
                isConfirmed={elem.isConfirmed}
                userMove={() => props.userMove(elem.id, elem.name)}
                tilesBlocked={props.tilesBlocked}
            />
        )
    })
    return (
        <div className={styles.gameField} >
            {tilesToRender}
        </div>
    )
}

export default connect(mapStatoToProps, { userMove, startGame })(Content);