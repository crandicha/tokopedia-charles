import React from 'react'

interface PokemonMovesProps {
  name: string
  level: string
}

const PokemonMoves = ({ name, level }: PokemonMovesProps) => {
  return (
    <div className="flex flex-row gap-2 shadow-md rounded-full px-4 py-2 bg-white">
      <div className="w-[35px]"> Lv.{level}</div>
      <div>{name}</div>
    </div>
  )
}

export default PokemonMoves
