import { IGame } from '@/models/IGame'
import React, {FC} from 'react'

interface GameItemProps {
    game: IGame
}
const GameItem: FC<GameItemProps> = ({game}) => {
  return (
    <div>
        {game._id}.
        {game.title}
        <button>Delete</button>
    </div>
  )
}

export default GameItem
