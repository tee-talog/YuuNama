import { Sprite } from "pixi.js"

import Creature from "../object/Creature"

export const MapAssign = {
  none: 0,
  zero: 1,
  nourishment1: 2,
  nourishment2: 3,
  nourishment3: 4,
}

export const MapSize = {
  width: 60,
  height: 72,
}

export type TileType = {
  broken: boolean
  nourishment: number
  magicment: number
  sprite: Sprite | null
  creatures: Array<Creature>
}
const defaultTileState: TileType = {
  broken: false,
  nourishment: 0,
  magicment: 0,
  sprite: null,
  creatures: [],
}
export type MapType = Array<Array<TileType>>
const m: MapType = Array(MapSize.height)
  .fill(0)
  .map(() =>
    Array(MapSize.width)
      .fill(0)
      .map(() => ({ ...defaultTileState })),
  )

// ランダムに初期値入れる
// 対象のタイルの数
const tileCount = 1500
for (let i = 0; i < tileCount; i++) {
  // x 座標
  const x = Math.floor(Math.random() * MapSize.width)
  // y 座標
  const y = Math.floor(Math.random() * MapSize.height)

  // 足すやつ
  m[y][x].nourishment = Math.floor(Math.random() * 5) + 1
}

// TODO 設定
// 最初から開いている
m[0][Math.floor(MapSize.width / 2)].broken = true
m[1][Math.floor(MapSize.width / 2)].broken = true
m[2][Math.floor(MapSize.width / 2)].broken = true
m[2][Math.floor(MapSize.width / 2) + 1].broken = true

export const mapState = m

export const tileState2Tile = (tile: TileType): number => {
  // TODO magicment
  if (tile.broken) {
    return MapAssign.none
  }

  if (tile.nourishment === 0) {
    return MapAssign.zero
  }
  if (tile.nourishment <= 9) {
    return MapAssign.nourishment1
  }
  if (tile.nourishment <= 16) {
    return MapAssign.nourishment2
  }

  return MapAssign.nourishment3
}
