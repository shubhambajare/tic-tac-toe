import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import Constant from '../Constant'
import GridCard from './GridCard';

export default function Grid() {

    const gridElements = [];
    const [clickData, setClickData] = useState(Array.from({ length: Constant.GRID_SIZE }, () => Array.from({ length: Constant.GRID_SIZE }, () => null)));
    const [currentPlayer, setCurrentPlayer] = useState(Constant.PLAYER_1);
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);

    const onCardClick = (row, col) => {
        if (winner || clickData[row][col]) return
        let temp = [...clickData];
        temp[row][col] = currentPlayer === Constant.PLAYER_2 ? Constant.PLAYER_2 : Constant.PLAYER_1;
        setClickData(temp);
        checkWinner();
        setCurrentPlayer(currentPlayer === Constant.PLAYER_2 ? Constant.PLAYER_1 : Constant.PLAYER_2);
        console.log(clickData);
    }


    const checkWinner = () => {
        let isWinner = true;
        for (let row = 0; row < Constant.GRID_SIZE; row++) {
            isWinner = true;
            for (let col = 0; col < Constant.GRID_SIZE; col++) {
                if (clickData[row][col] != currentPlayer) {
                    isWinner = false
                    break
                }
            }
            if (isWinner) {
                setWinner(currentPlayer);
                return
            }
        }

        for (let col = 0; col < Constant.GRID_SIZE; col++) {
            isWinner = true;
            for (let row = 0; row < Constant.GRID_SIZE; row++) {
                if (clickData[row][col] != currentPlayer) {
                    isWinner = false
                    break
                }
            }
            if (isWinner) {
                setWinner(currentPlayer);
                return
            }
        }


        isWinner = true;
        for (let row = 0; row < Constant.GRID_SIZE; row++) {
            if (clickData[row][row] != currentPlayer) {
                isWinner = false
                break
            }
        }
        if (isWinner) {
            setWinner(currentPlayer);
            return
        }


        isWinner = true;
        for (let row = 0; row < Constant.GRID_SIZE; row++) {
            if (clickData[row][Constant.GRID_SIZE - 1 - row] != currentPlayer) {
                isWinner = false
                break
            }
        }
        if (isWinner) {
            setWinner(currentPlayer);
            return
        }
        checkIsDraw();
    }


    const checkIsDraw = () => {
        let isDraw = true;
        for (let row = 0; row < Constant.GRID_SIZE; row++) {
            for (let col = 0; col < Constant.GRID_SIZE; col++) {
                if (clickData[row][col] === null)
                    isDraw = false
            }
        }
        setIsDraw(isDraw)
    }
    const resetGame = () => {
        setWinner(null)
        setCurrentPlayer(Constant.PLAYER_1)
        setIsDraw(false)
        let temp = [...clickData];
        for (let row = 0; row < Constant.GRID_SIZE; row++) {
            for (let col = 0; col < Constant.GRID_SIZE; col++) {
                temp[row][col] = null;
            }
        }
        setClickData(temp)

    }


    for (let row = 0; row < Constant.GRID_SIZE; row++) {
        for (let col = 0; col < Constant.GRID_SIZE; col++) {
            gridElements.push(
                <GridCard
                    key={'' + row + col}
                    row={row}
                    col={col}
                    value={clickData[row][col]}
                    onCardClick={onCardClick}
                    currentPlayer={currentPlayer}
                />);
        }
        gridElements.push(<br key={row} />)

    }
    return <div>
        <h1>
            <span className='sb-text-primary'>
                Current Player is {currentPlayer}
            </span>
        </h1>
        <div className='sb-margin-bottom-10'>
            <Button variant="outlined" color="secondary" onClick={() => resetGame()}>
                Restart Game
            </Button>
        </div>
        {gridElements}
        <div>
            <h1>
                {winner && <span className='sb-text-secondary'>
                    Winner is {winner}
                </span>}

                {isDraw && <span className='sb-text-secondary'>
                    DRAW
                </span>}
            </h1>
        </div>

    </div>;
}
