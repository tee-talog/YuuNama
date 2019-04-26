import { MapSize } from "./map-const"

const cursorPoint = {
  x: Math.floor(MapSize.width / 2),
  y: 0,
}

const state = {
  cursorPoint,
  horiPower: 100,
  isOpenInfo: false,
  // 表示倍率
  magnification: 2,
}
export type UiStateType = typeof state

export const getUiState = (): typeof state => state

export const updateUiState = (): void => {
  // TODO
}
