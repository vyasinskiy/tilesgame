import html from '../assets/images/html.jpg';
import css from '../assets/images/css.jpg';
import js from '../assets/images/js.jpg';
import react from '../assets/images/react.jpg';
import redux from '../assets/images/redux.jpg';
import vue from '../assets/images/vue.jpg';
import angular from '../assets/images/angular.jpg';
import graphql from '../assets/images/graphql.jpg';

const CHANGE_OPENED_STATUS = 'CHANGE_OPENED_STATUS';
const SET_FIRST_SELECTED_NAME = 'SET_FIRST_SELECTED_NAME';
const CONFIRM_EQUAL_IMG = 'CONFIRM_EQUAL_IMG';
const CLOSE_WRONG_CHOOSED = 'CLOSE_WRONG_CHOOSED';
const BLOCK_TILES = 'BLOCK_TILES';
const WATCH_ALL_TILES = 'WATCH_ALL_TILES';
const START_GAME = 'START_GAME';
const FINISH_GAME = 'FINISH_GAME'

const changeOpenedStatus = (id) => ({ type: CHANGE_OPENED_STATUS, id })
const setFirstSelectedName = (name) => ({ type: SET_FIRST_SELECTED_NAME, name })
const confirmOpenedImgAsEqual = (name) => ({ type: CONFIRM_EQUAL_IMG, name })
const closeWrongChoosedImg = (prevName, thisName) => ({ type: CLOSE_WRONG_CHOOSED, prevName, thisName })
const blockTiles = (value) => ({ type: BLOCK_TILES, value })
const watchAllTiles = (value) => ({type: WATCH_ALL_TILES, value})
const startNewGame = () => ({type: START_GAME})
const finishGame = () => ({type: FINISH_GAME})
const initialState = {
    tiles: [
        { id: 1, name: 'html', isOpened: false, isConfirmed: false, src: html },
        { id: 2, name: 'css', isOpened: false, isConfirmed: false, src: css },
        { id: 3, name: 'js', isOpened: false, isConfirmed: false, src: js },
        { id: 4, name: 'react', isOpened: false, isConfirmed: false, src: react },
        { id: 5, name: 'redux', isOpened: false, isConfirmed: false, src: redux },
        { id: 6, name: 'vue', isOpened: false, isConfirmed: false, src: vue },
        { id: 7, name: 'angular', isOpened: false, isConfirmed: false, src: angular },
        { id: 8, name: 'graphql', isOpened: false, isConfirmed: false, src: graphql },
        { id: 9, name: 'html', isOpened: false, isConfirmed: false, src: html },
        { id: 10, name: 'css', isOpened: false, isConfirmed: false, src: css },
        { id: 11, name: 'js', isOpened: false, isConfirmed: false, src: js },
        { id: 12, name: 'react', isOpened: false, isConfirmed: false, src: react },
        { id: 13, name: 'redux', isOpened: false, isConfirmed: false, src: redux },
        { id: 14, name: 'vue', isOpened: false, isConfirmed: false, src: vue },
        { id: 15, name: 'angular', isOpened: false, isConfirmed: false, src: angular },
        { id: 16, name: 'graphql', isOpened: false, isConfirmed: false, src: graphql }
    ],
    gameStarted: false,
    gameFinished: false,
    firstSelectedName: null,
    tilesBlocked: true,
}

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_GAME: {
            return {
                ...state,
                gameStarted: true
            }
        }
        case FINISH_GAME: {
            return {
                ...state,
                gameFinished: true
            }
        }
        case CHANGE_OPENED_STATUS: {
            return {
                ...state,
                tiles: [...state.tiles.map(elem => {
                    if (elem.id === action.id) {
                        elem.isOpened = true;
                        return elem;
                    }
                    return elem;
                })]
            }
        }
        case SET_FIRST_SELECTED_NAME: {
            return {
                ...state,
                firstSelectedName: action.name
            }
        }
        case CONFIRM_EQUAL_IMG: {
            return {
                ...state,
                tiles: [...state.tiles.map(elem => {
                    if (elem.name === action.name) {
                        elem.isConfirmed = true;
                        return elem;
                    }
                    return elem;
                })],
                firstSelectedName: null
            }
        }
        case CLOSE_WRONG_CHOOSED: {
            return {
                ...state,
                tiles: [...state.tiles.map(elem => {
                    if (elem.isConfirmed) {
                        return elem
                    }
                    else if (elem.name === action.prevName || elem.name === action.thisName) {
                        elem.isOpened = false;
                        return elem;
                    }
                    return elem;
                })],
                firstSelectedName: null
            }
        }
        case BLOCK_TILES: {
            return {
                ...state,
                tilesBlocked: action.value
            }
        }
        case WATCH_ALL_TILES: {
            return {
                ...state,
                tiles: [...state.tiles.map(elem => {
                    elem.isOpened = action.value
                    return elem;
                })]
            }
        }
        default:
            return state;
    }
}

export const startGame = () => {
    return (dispatch) => {
        dispatch(watchAllTiles(true));
        setTimeout(() => {
            dispatch(blockTiles(false));
            dispatch(watchAllTiles(false));
        }, 3000);
        dispatch(startNewGame());
    }
}

export const userMove = (id, name) => {
    return (dispatch, getState) => {
        const firstSelectedName = getState().game.firstSelectedName;
        const tilesBlocked = getState().game.tilesBlocked;
        dispatch(changeOpenedStatus(id))
        dispatch(blockTiles(true));
        if (firstSelectedName === null) {
            dispatch(setFirstSelectedName(name))
            dispatch(blockTiles(false));
        }
        else if (firstSelectedName === name) {
            dispatch(confirmOpenedImgAsEqual(name));
            dispatch(blockTiles(false));
        }
        else {
            setTimeout(() => {
                dispatch(closeWrongChoosedImg(firstSelectedName, name));
                dispatch(blockTiles(false));
            }, 600)
        }
        const result = getState().game.tiles.every(elem => {
            if (elem.isConfirmed) {
                return true
            } else {
                return false
            }
        })
        if (result) {
            dispatch(finishGame())
        }
    }
}

export default gameReducer;