import { utils, Application, loader, Sprite, Container } from "pixi.js"

import { MapAssign, MapchipFiles, MapSize, TileType } from "./map-const"
import tileState2Tile from "./tile-state-to-tile"

const defaultTileState: TileType = {
  broken: false,
  nourishment: 0,
  magicment: 0,
  creatures: [],
}
export type MapType = Array<Array<TileType>>
const state: MapType = Array(MapSize.height)
  .fill(0)
  .map(() =>
    Array(MapSize.width)
      .fill(0)
      .map(() => ({ ...defaultTileState })),
  )

export const creaturesReferences: Array<{ x: number; y: number }> = []

export const initializeMapSprite = (): void => {
  // ランダムに初期値入れる
  // 対象のタイルの数
  const tileCount = 1500
  for (let i = 0; i < tileCount; i++) {
    // x 座標
    const x = Math.floor(Math.random() * MapSize.width)
    // y 座標
    const y = Math.floor(Math.random() * MapSize.height)

    // 足すやつ
    state[y][x].nourishment = Math.floor(Math.random() * 5) + 1
  }

  // 最初から開いている
  state[0][Math.floor(MapSize.width / 2)].broken = true
  state[1][Math.floor(MapSize.width / 2)].broken = true
  state[2][Math.floor(MapSize.width / 2)].broken = true
  state[2][Math.floor(MapSize.width / 2) + 1].broken = true

  for (let rowIndex = 0; rowIndex < state.length; rowIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < state[rowIndex].length;
      columnIndex++
    ) {
      const assign = tileState2Tile(state[rowIndex][columnIndex])
      if (assign === MapAssign.none) {
        return
      }
    }
  }
}

export const getMapState = (): MapType => state

export const updateMapState = (delta: number): void => {
  // TODO
}
