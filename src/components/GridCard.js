import { Box, Card } from '@material-ui/core'
import React from 'react'
import Constant from '../Constant'

const GridCard = (props) => {
    return (
        <span
            onClick={() => props.onCardClick(props.row, props.col)}>

            <Card className={'sb-grid-card ' + (props.value ? props.value === Constant.PLAYER_1 ? 'sb-player1-bg' : 'sb-player2-bg' : '')}> {props.value} </Card>
        </span>
    )
}

export default GridCard
