import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react'
import Constant from '../Constant'
import GridCard from './GridCard';

export default function Grid() {

    const gridElements = [];
    const [clickData, setClickData] = useState(Array.from({ length: Constant.GRID_SIZE }, () => Array.from({ length: Constant.GRID_SIZE }, () => null)));
    const [currentPlayer, setCurrentPlayer] = useState(Constant.PLAYER_1);
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);
    const [gridSize, setGridSize] = useState(Constant.GRID_SIZE);
    let randomKey = 0;

    const onCardClick = (row, col) => {
        if (winner || clickData[row][col]) return
        let temp = [...clickData];
        temp[row][col] = currentPlayer;
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
    const handleGridSizeChange = (event) => {
        setGridSize(event.target.value);
        Constant.GRID_SIZE = event.target.value;
        setClickData(Array.from({ length: Constant.GRID_SIZE }, () => Array.from({ length: Constant.GRID_SIZE }, () => null)))
        setWinner(null)
        setCurrentPlayer(Constant.PLAYER_1)
        setIsDraw(false)
        // randomKey++;
        // resetGame()
        // generateGrid()

    };

    const generateGrid = () => {
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
    }
    generateGrid();
    return <div key={randomKey}>
        <h1>
            <span className='sb-text-primary'>
                Tic Tac Toe
            </span>
        </h1>
        <h3>
            <span className='sb-text-secondary'>
                Current Player is {currentPlayer}
            </span>
        </h3>
        {/* <FormControl >
            <InputLabel shrink >
            Age
            </InputLabel>
            <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={gridSize}
                onChange={handleGridSizeChange}

            >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
            </Select>
        </FormControl> */}
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">Grid size</InputLabel>
            <Select
                style={{ width: '80px', marginBottom: '10px' }}
                native
                value={gridSize}
                onChange={handleGridSizeChange}
                label="Grid size"
                inputProps={{
                    name: 'age',
                    id: 'outlined-age-native-simple',
                }}
            >
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </Select>
        </FormControl>
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
